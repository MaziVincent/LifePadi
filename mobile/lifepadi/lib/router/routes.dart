import 'dart:async';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/pages/pages.dart';

import '../entities/user_role.dart';
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
        TypedGoRoute<CartRoute>(
          path: 'cart',
          routes: [
            TypedGoRoute<CheckoutRoute>(path: 'checkout'),
          ],
        ),
        TypedGoRoute<NotificationRoute>(path: 'notifications'),
        TypedGoRoute<NewLocationRoute>(
          // FIXME: Should be /locations/new, for now, this is just a placeholder
          path: 'new-location',
        ),
        TypedGoRoute<CategoriesRoute>(path: 'categories'),
        TypedGoRoute<VendorsRoute>(path: 'vendors'),
        TypedGoRoute<ReceiptRoute>(path: 'receipts/:id'),
      ],
    ),
    TypedGoRoute<OrdersRoute>(
      path: '/orders',
      routes: [
        TypedGoRoute<OrderDetailsRoute>(path: ':id'),
        TypedGoRoute<TrackOrderRoute>(path: 'track/:id'),
      ],
    ),
    TypedGoRoute<ErrandsRoute>(
      path: '/errands',
      routes: [
        TypedGoRoute<SingleErrandRoute>(path: ':id'),
      ],
    ),
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

class OrderDetailsRoute extends GoRouteData {
  const OrderDetailsRoute({required this.id});

  final int id;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return OrderDetailsPage(id: id);
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

class TrackOrderRoute extends GoRouteData {
  const TrackOrderRoute({required this.id});

  final int id;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return TrackOrderPage(id: id);
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
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

class CategoriesRoute extends GoRouteData {
  CategoriesRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const CategoriesPage();
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

class VendorsRoute extends GoRouteData {
  VendorsRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const VendorsPage();
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

class CheckoutRoute extends GoRouteData {
  CheckoutRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const CheckoutPage();
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

class ReceiptRoute extends GoRouteData {
  ReceiptRoute({required this.id});

  final int id;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return ReceiptPage(id: id);
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

@TypedGoRoute<ChatsRoute>(
  path: '/chats',
  routes: [
    TypedGoRoute<SingleChatRoute>(path: ':id'),
  ],
)
class ChatsRoute extends GoRouteData {
  const ChatsRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const ChatsPage();
  }
}

class SingleChatRoute extends GoRouteData {
  const SingleChatRoute({required this.id});

  final int id;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return SingleChatPage(id: id);
  }
}

@TypedGoRoute<ProductsRoute>(path: '/products')
class ProductsRoute extends GoRouteData {
  /// Accepts query parameter category which is the id of
  /// the category to display products for.
  const ProductsRoute({this.categoryId});

  final int? categoryId;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return ProductsPage(categoryId: categoryId);
  }
}

class SingleErrandRoute extends GoRouteData {
  const SingleErrandRoute({required this.id});

  final int id;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return SingleErrandPage(id: id);
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

@TypedGoRoute<WishlistRoute>(path: '/wishlist')
class WishlistRoute extends GoRouteData {
  const WishlistRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const WishlistPage();
  }
}
