import 'dart:async';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/pages/details_page.dart';

import '../pages/admin_page.dart';
import '../pages/home_page.dart';
import '../pages/login_page.dart';
import '../pages/rider_page.dart';
import '../pages/splash_page.dart';
import '../pages/user_page.dart';
import '../state/permissions.dart';

part 'routes.g.dart';

@TypedGoRoute<HomeRoute>(
  path: '/',
  routes: [
    TypedGoRoute<AdminRoute>(path: 'admin'),
    TypedGoRoute<UserRoute>(path: 'user'),
    TypedGoRoute<RiderRoute>(path: 'rider'),
  ],
)
class HomeRoute extends GoRouteData {
  const HomeRoute();

  /// Important note on this redirect function: this isn't reactive.
  /// No redirect will be triggered on a user role change.
  ///
  /// This is currently unsupported.
  @override
  FutureOr<String?> redirect(BuildContext context, GoRouterState state) async {
    final userRole = await ProviderScope.containerOf(context).read(
      permissionsProvider.future,
    );

    return userRole.map(
      admin: (_) => const AdminRoute().location,
      user: (_) => const UserRoute().location,
      rider: (_) => const RiderRoute().location,
      none: (_) => null,
    );
  }

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const HomePage();
  }
}

@TypedGoRoute<SplashRoute>(path: '/splash')
class SplashRoute extends GoRouteData {
  const SplashRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return CustomTransitionPage(
      key: state.pageKey,
      child: const SplashPage(),
      transitionsBuilder: (context, animation, secondaryAnimation, child) {
        return FadeTransition(
          // Applying the transition only when leaving the page
          opacity: Tween<double>(begin: 1, end: 0).animate(secondaryAnimation),
          child: child,
        );
      },
    );
  }
}

@TypedGoRoute<LoginRoute>(path: '/login')
class LoginRoute extends GoRouteData {
  const LoginRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const LoginPage();
  }
}

class AdminRoute extends GoRouteData {
  const AdminRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const AdminPage();
  }
}

class UserRoute extends GoRouteData {
  const UserRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const UserPage();
  }
}

class RiderRoute extends GoRouteData {
  const RiderRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const RiderPage();
  }
}

/// This route shows how to parametrize a simple page and how to pass a simple query parameter.
@TypedGoRoute<DetailsRoute>(path: '/details/:id')
class DetailsRoute extends GoRouteData {
  const DetailsRoute(this.id, {this.isNuke = false});
  final int id;
  final bool isNuke;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return DetailsPage(
      id,
      isNuclearCode: isNuke,
    );
  }
}
