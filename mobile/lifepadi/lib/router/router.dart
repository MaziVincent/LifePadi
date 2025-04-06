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
      final authRestrictedRoutes = [
        CartRoute().location,
        CheckoutRoute().location,
        const OrdersRoute().location,
        const EditProfileRoute().location,
        const WalletRoute().location,
        const LocationsRoute().location,
        const TransactionHistoryRoute().location,
      ];

      final guestRoutes = [
        const OnboardingRoute().location,
        const LoginRoute().location,
        const GetStartedRoute().location,
        const RegisterRoute().location,
        const ForgotPasswordRoute().location,
        const ResetPasswordRoute().location,
        const BiometricAuthRoute()
            .location, // Add biometric auth to guest routes
      ];

      // Get current path to potentially save it
      final currentPath = state.uri.path;

      final isLoggingIn = guestRoutes.contains(currentPath);
      final isSplash = currentPath == const SplashRoute().location;
      final isAuthRestricted = authRestrictedRoutes.any(
        (route) => currentPath == route || currentPath.startsWith(route),
      );

      if (isSplash) return null; // Let splash page handle its own navigation

      if (isAuth.value.isLoading || !isAuth.value.hasValue) {
        return const SplashRoute().location;
      }

      if (isAuth.value.unwrapPrevious().hasError) {
        return isLoggingIn ? null : const HomeRoute().location;
      }

      final auth = isAuth.value.requireValue;

      // Check for biometric authentication scenario
      // If user is not authenticated but has saved credentials and biometric enabled
      if (!auth && currentPath != const BiometricAuthRoute().location) {
        final isBiometricEnabled =
            PreferencesHelper.getBool(kBiometricsKey) ?? false;
        final canRestoreAuth =
            await ref.read(authControllerProvider.notifier).canRestoreAuth();

        // If biometric is enabled and auth can be restored, and we're not already on login page or any of the guest routes
        if (isBiometricEnabled &&
            canRestoreAuth &&
            !guestRoutes.contains(currentPath)) {
          // Store the current path so we can return to it after authentication
          // Don't save system routes or the biometric page itself
          if (!currentPath.startsWith('/system/') &&
              currentPath != const BiometricAuthRoute().location &&
              currentPath != const SplashRoute().location) {
            await PreferencesHelper.setString(
              key: kLastRouteKey,
              value: currentPath,
            );
          }

          return const BiometricAuthRoute().location;
        }
      }

      // If trying to access auth-restricted route but not logged in
      if (isAuthRestricted && !auth) {
        return const LoginRoute().location;
      }

      // If trying to log in but already authenticated
      if (isLoggingIn && auth) {
        return const HomeRoute().location;
      }

      // Allow non-auth-restricted routes regardless of auth status
      return null;
    },
  );

  ref.onDispose(router.dispose);
  return router;
}
