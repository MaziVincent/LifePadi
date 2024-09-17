import 'package:dio/dio.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/constants.dart' show kRemoteApiUrl;
import 'package:lifepadi/utils/helpers.dart' show JsonMap, logger;
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'client.g.dart';

/// HTTP client
@riverpod
Dio dio(
  DioRef ref, {
  bool secured = true,
  bool logRequestBody = false,
}) {
  return Dio(
    BaseOptions(baseUrl: kRemoteApiUrl),
  )..interceptors.addAll([
      if (secured) ...[
        ref.read(authInterceptorProvider),
        ref.read(refreshInterceptorProvider),
      ],
      ref.read(loggingInterceptorProvider(logRequestBody: logRequestBody)),
    ]);
}

/// Adds the Authorization header to the request if the user is signed in.
@riverpod
Interceptor authInterceptor(AuthInterceptorRef ref) {
  return InterceptorsWrapper(
    onRequest: (options, handler) async {
      final auth = ref.read(authControllerProvider);
      final token = auth.maybeWhen(
        data: (auth) => auth.maybeMap(
          signedIn: (signedIn) => signedIn.accessToken,
          orElse: () => null,
        ),
        orElse: () => null,
      );

      if (token != null) {
        options.headers['Authorization'] = 'Bearer $token';
      }

      return handler.next(options);
    },
  );
}

/// Logs the request and response of the HTTP client
@riverpod
Interceptor loggingInterceptor(
  LoggingInterceptorRef ref, {
  bool logRequestBody = false,
}) {
  return LogInterceptor(
    logPrint: logger.i,
    responseBody: true,
    requestBody: logRequestBody,
  );
}

/// Refresh interceptor
///
/// On error 401 or 403, it tries to refresh the token with the saved refresh token,
///
/// if it succeeds, it updates the access token and then retries the request with the new token.
/// if it fails, it logs out the user.
@riverpod
Interceptor refreshInterceptor(RefreshInterceptorRef ref) {
  return InterceptorsWrapper(
    onError: (error, handler) async {
      if (error.response?.statusCode == 401 ||
          error.response?.statusCode == 403) {
        final auth = ref.read(authControllerProvider);
        final token = auth.maybeWhen(
          data: (auth) => auth.maybeMap(
            signedIn: (signedIn) => signedIn.refreshToken,
            orElse: () => null,
          ),
          orElse: () => null,
        );

        if (token != null) {
          try {
            final newToken =
                await ref.read(authControllerProvider.notifier).refreshToken();
            error.requestOptions.headers['Authorization'] = 'Bearer $newToken';
            final response = await ref
                .read(dioProvider(secured: false))
                .fetch<JsonMap>(error.requestOptions);
            return handler.resolve(response);
          } catch (_, __) {
            await ref.read(authControllerProvider.notifier).logout();
          }
        }
      }

      return handler.next(error);
    },
  );
}
