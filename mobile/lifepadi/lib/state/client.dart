import 'dart:async';

import 'package:dio/dio.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/constants.dart' show kRemoteApiUrl;
import 'package:lifepadi/utils/helpers.dart' show JsonMap, logger;
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'client.g.dart';

/// HTTP client
@riverpod
Dio dio(
  Ref ref, {
  bool secured = true,
  bool logRequest = false,
  bool logRequestHeader = false,
  bool logRequestBody = false,
  bool logResponseHeader = false,
  bool logResponseBody = false,
  bool logError = true,
}) {
  return Dio(
    BaseOptions(
      baseUrl: kRemoteApiUrl,
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      sendTimeout: const Duration(seconds: 30),
    ),
  )..interceptors.addAll([
      if (secured) ...[
        ref.read(authInterceptorProvider),
        ref.read(refreshInterceptorProvider),
      ],
      ref.read(
        loggingInterceptorProvider(
          request: logRequest,
          requestHeader: logRequestHeader,
          requestBody: logRequestBody,
          responseHeader: logResponseHeader,
          responseBody: logResponseBody,
          error: logError,
        ),
      ),
    ]);
}

/// Adds the Authorization header to the request if the user is signed in.
@riverpod
Interceptor authInterceptor(Ref ref) {
  return InterceptorsWrapper(
    onRequest: (options, handler) async {
      final user = ref.read(authControllerProvider);
      final token = user.maybeWhen(
        data: (user) => user.accessToken,
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
  Ref ref, {
  bool request = false,
  bool requestHeader = false,
  bool requestBody = false,
  bool responseHeader = false,
  bool responseBody = false,
  bool error = true,
}) {
  return LogInterceptor(
    logPrint: logger.i,
    request: request,
    requestHeader: requestHeader,
    requestBody: requestBody,
    responseHeader: responseHeader,
    responseBody: responseBody,
    error: error,
  );
}

/// Refresh interceptor
///
/// On error 401 or 403, it tries to refresh the token with the saved refresh token,
///
/// if it succeeds, it updates the access token and then retries the request with the new token.
/// if it fails, it logs out the user.
///
/// A single in-flight refresh is shared between concurrent 401/403 responses
/// so we never fire duplicate refresh calls or stomp tokens.
Completer<String?>? _pendingRefresh;

@riverpod
Interceptor refreshInterceptor(Ref ref) {
  return InterceptorsWrapper(
    onError: (error, handler) async {
      if (error.response?.statusCode == 401 ||
          error.response?.statusCode == 403) {
        final user = ref.read(authControllerProvider);
        final token = user.maybeWhen(
          data: (user) => user.refreshToken,
          orElse: () => null,
        );

        if (token != null) {
          try {
            final pending = _pendingRefresh;
            String? newToken;
            if (pending != null && !pending.isCompleted) {
              newToken = await pending.future;
            } else {
              final completer = Completer<String?>();
              _pendingRefresh = completer;
              try {
                newToken = await ref
                    .read(authControllerProvider.notifier)
                    .refreshToken();
                completer.complete(newToken);
              } catch (e, st) {
                completer.completeError(e, st);
                rethrow;
              } finally {
                if (identical(_pendingRefresh, completer)) {
                  _pendingRefresh = null;
                }
              }
            }

            if (newToken == null) {
              await ref.read(authControllerProvider.notifier).logout();
              return handler.next(error);
            }

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
