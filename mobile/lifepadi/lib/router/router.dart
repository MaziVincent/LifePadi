import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
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
GoRouter router(RouterRef ref) {
  final isAuth = ValueNotifier<AsyncValue<bool>>(const AsyncLoading());
  ref
    ..onDispose(isAuth.dispose) // don't forget to clean after yourselves (:
    // update the listenable, when some provider value changes
    // here, we are just interested in wheter the user's logged in
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
      if (isAuth.value.unwrapPrevious().hasError) {
        // TODO: Find logic for this redirect case
        // if user has ever logged in before, go to get started
        // If not, go to onboarding
        return const OnboardingRoute().location;
      }
      if (isAuth.value.isLoading || !isAuth.value.hasValue) {
        return const SplashRoute().location;
      }

      final auth = isAuth.value.requireValue;

      final isSplash = state.uri.path == const SplashRoute().location;
      if (isSplash) {
        // awaiting the loading animation on the splash screen
        return Future.delayed(
          const Duration(seconds: 4),
          () => auth
              ? const HomeRoute().location
              : const OnboardingRoute().location,
        );
      }

      final guestRoutes = [
        const OnboardingRoute().location,
        const LoginRoute().location,
        const GetStartedRoute().location,
        const RegisterRoute().location,
        const VerificationRoute().location,
        const ForgotPasswordRoute().location,
        const ResetPasswordRoute().location,
      ];

      // Check if path is in guestRoutes
      final isLoggingIn = guestRoutes.contains(state.uri.path);
      if (isLoggingIn) return auth ? const HomeRoute().location : null;

      // TODO: If user is not logged in, use the same logic as line 46, maybe extract it into a function
      return auth ? null : const OnboardingRoute().location;
    },
  );
  ref.onDispose(router.dispose); // always clean up after yourselves (:

  return router;
}
