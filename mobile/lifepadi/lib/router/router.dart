import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../state/auth_controller.dart';
import 'routes.dart';

part 'router.g.dart';

/// Exposes a [GoRouter] that uses a [Listenable] to refresh its internal state.
///
/// With Riverpod, we can't register a dependency via an Inherited Widget,
/// thus making this implementation the "leanest" possible
///
/// To sync our app state with this our router, we simply update our listenable via `ref.listen`,
/// and pass it to GoRouter's `refreshListenable`.
/// In this example, this will trigger redirects on any authentication change.
///
/// Obviously, more logic could be implemented here, but again, this is meant to be a simple example.
/// You can always build more listenables and even merge more than one into a more complex `ChangeNotifier`,
/// but that's up to your case and out of this scope.
@riverpod
GoRouter router(Ref ref) {
  final isAuth = ValueNotifier<AsyncValue<bool>>(const AsyncLoading());

  ref
    ..onDispose(isAuth.dispose)
    ..listen(
      authControllerProvider
          .select((value) => value.whenData((value) => value.isAuth)),
      (_, next) {
        isAuth.value = next;
      },
    );

  final router = GoRouter(
    navigatorKey: rootNavigatorKey,
    refreshListenable: isAuth,
    initialLocation: const SplashRoute().location,
    debugLogDiagnostics: true,
    routes: $appRoutes,
    redirect: (context, state) async {
      final guestRoutes = [
        const OnboardingRoute().location,
        const LoginRoute().location,
        const GetStartedRoute().location,
        const RegisterRoute().location,
        const ForgotPasswordRoute().location,
        const ResetPasswordRoute().location,
      ];
      final isLoggingIn = guestRoutes.contains(state.uri.path);
      final isSplash = state.uri.path == const SplashRoute().location;

      if (isSplash) return null; // Let splash page handle its own navigation

      if (isAuth.value.isLoading || !isAuth.value.hasValue) {
        return const SplashRoute().location;
      }
      if (isAuth.value.unwrapPrevious().hasError) {
        return isLoggingIn ? null : const GetStartedRoute().location;
      }

      final auth = isAuth.value.requireValue;
      if (isLoggingIn) return auth ? const HomeRoute().location : null;

      return auth ? null : const GetStartedRoute().location;
    },
  );
  ref.onDispose(router.dispose);

  return router;
}
