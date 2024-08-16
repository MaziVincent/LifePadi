import 'dart:async';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/pages/product_details_page.dart';

import '../entities/user_role.dart';
import '../pages/admin_page.dart';
import '../pages/cart_page.dart';
import '../pages/details_page.dart';
import '../pages/errands_page.dart';
import '../pages/forgot_password_page.dart';
import '../pages/get_started_page.dart';
import '../pages/home_page.dart';
import '../pages/login_page.dart';
import '../pages/logistics_page.dart';
import '../pages/new_location_page.dart';
import '../pages/notification_page.dart';
import '../pages/onboarding_page.dart';
import '../pages/orders_page.dart';
import '../pages/profile_page.dart';
import '../pages/register_page.dart';
import '../pages/reset_password_page.dart';
import '../pages/rider_page.dart';
import '../pages/splash_page.dart';
import '../pages/verification_page.dart';
import '../state/permissions.dart';
import '../widgets/scaffold_with_nav_bar.dart';

part 'routes.g.dart';

final GlobalKey<NavigatorState> rootNavigatorKey =
    GlobalKey<NavigatorState>(debugLabel: 'root');
final GlobalKey<NavigatorState> shellNavigatorKey =
    GlobalKey<NavigatorState>(debugLabel: 'shell');

@TypedShellRoute<HomeShellRoute>(
  routes: [
    TypedGoRoute<HomeRoute>(
      path: '/',
      routes: [
        TypedGoRoute<CartRoute>(path: 'cart'),
        TypedGoRoute<NotificationRoute>(path: 'notifications'),
        TypedGoRoute<NewLocationRoute>(
          // FIXME: Should be /locations/new, for now, this is just a placeholder
          path: 'new-location',
        ),
      ],
    ),
    TypedGoRoute<OrdersRoute>(path: '/orders'),
    TypedGoRoute<ErrandsRoute>(path: '/errands'),
    TypedGoRoute<LogisticsRoute>(path: '/logistics'),
    TypedGoRoute<ProfileRoute>(path: '/profile'),
  ],
)
class HomeShellRoute extends ShellRouteData {
  const HomeShellRoute();

  @override
  Widget builder(BuildContext context, GoRouterState state, Widget navigator) {
    return ScaffoldWithNavBar(child: navigator);
  }

  static final GlobalKey<NavigatorState> $navigatorKey = shellNavigatorKey;
}

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

    return switch (userRole) {
      Admin() => const AdminRoute().location,
      Rider() => const RiderRoute().location,
      Guest() => const GetStartedRoute().location,
      _ => null,
    };
  }

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return const NoTransitionPage(child: HomePage());
  }
}

class OrdersRoute extends GoRouteData {
  const OrdersRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return const NoTransitionPage(child: OrdersPage());
  }
}

class ErrandsRoute extends GoRouteData {
  const ErrandsRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return const NoTransitionPage(child: ErrandsPage());
  }
}

class LogisticsRoute extends GoRouteData {
  const LogisticsRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return const NoTransitionPage(child: LogisticsPage());
  }
}

class ProfileRoute extends GoRouteData {
  const ProfileRoute();

  @override
  Page<void> buildPage(BuildContext context, GoRouterState state) {
    return const NoTransitionPage(child: ProfilePage());
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

@TypedGoRoute<OnboardingRoute>(path: '/onboarding')
class OnboardingRoute extends GoRouteData {
  const OnboardingRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const OnboardingPage();
  }
}

@TypedGoRoute<GetStartedRoute>(
  path: '/get-started',
  routes: [
    TypedGoRoute<LoginRoute>(
      path: 'login',
      routes: [
        TypedGoRoute<ForgotPasswordRoute>(path: 'forgot-password'),
        TypedGoRoute<ResetPasswordRoute>(path: 'reset-password'),
      ],
    ),
    TypedGoRoute<RegisterRoute>(
      path: 'register',
      routes: [
        TypedGoRoute<VerificationRoute>(path: 'verification'),
      ],
    ),
  ],
)
class GetStartedRoute extends GoRouteData {
  const GetStartedRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const GetStartedPage();
  }
}

class LoginRoute extends GoRouteData {
  const LoginRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const LoginPage();
  }
}

class ForgotPasswordRoute extends GoRouteData {
  const ForgotPasswordRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const ForgotPasswordPage();
  }
}

class ResetPasswordRoute extends GoRouteData {
  const ResetPasswordRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const ResetPasswordPage();
  }
}

class RegisterRoute extends GoRouteData {
  const RegisterRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const RegisterPage();
  }
}

class VerificationRoute extends GoRouteData {
  const VerificationRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const VerificationPage();
  }
}

@TypedGoRoute<AdminRoute>(path: '/admin')
class AdminRoute extends GoRouteData {
  const AdminRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const AdminPage();
  }
}

@TypedGoRoute<RiderRoute>(path: '/rider')
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

@TypedGoRoute<ProductDetailsRoute>(path: '/products/:id')
class ProductDetailsRoute extends GoRouteData {
  const ProductDetailsRoute(this.id);
  final int id;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return ProductDetailsPage(id: id);
  }
}

class CartRoute extends GoRouteData {
  CartRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const CartPage();
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

class NotificationRoute extends GoRouteData {
  NotificationRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const NotificationPage();
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

class NewLocationRoute extends GoRouteData {
  NewLocationRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const NewLocationPage();
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}
