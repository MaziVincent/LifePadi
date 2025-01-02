import 'dart:async';

import 'package:go_router/go_router.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/category.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/models/receipt.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/pages/pages.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

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
        TypedGoRoute<CategoriesRoute>(path: 'categories'),
        TypedGoRoute<VendorsRoute>(path: 'vendors'),
        TypedGoRoute<ReceiptRoute>(path: 'receipts/:orderId'),
      ],
    ),
    TypedGoRoute<OrdersRoute>(
      path: '/orders',
      routes: [
        TypedGoRoute<OrderDetailsRoute>(path: ':id'),
        TypedGoRoute<TrackOrderRoute>(path: ':orderId/track'),
        TypedGoRoute<TrackOrderMapRoute>(path: ':orderId/track/:riderId/map'),
      ],
    ),
    TypedGoRoute<ErrandsRoute>(
      path: '/errands',
      routes: [
        TypedGoRoute<SingleServiceRoute>(path: ':id'),
      ],
    ),
    TypedGoRoute<LogisticsRoute>(path: '/logistics'),
    TypedGoRoute<ProfileRoute>(
      path: '/profile',
      routes: [
        TypedGoRoute<EditProfileRoute>(path: 'edit'),
      ],
    ),
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
    final user = await ProviderScope.containerOf(context).read(
      authControllerProvider.future,
    );

    return switch (user) {
      Rider() => const RiderRoute().location,
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
    return const NoTransitionPage(child: ServicesPage());
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
    TypedGoRoute<RegisterRoute>(path: 'register'),
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

@TypedGoRoute<RiderRoute>(
  path: '/rider',
  routes: [
    TypedGoRoute<RiderOrderDetailsRoute>(path: 'orders/:id'),
  ],
)
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

class RiderOrderDetailsRoute extends GoRouteData {
  const RiderOrderDetailsRoute({required this.id});

  final int id;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return OrderDetailsPage(id: id);
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

class TrackOrderRoute extends GoRouteData {
  const TrackOrderRoute({required this.orderId});

  final int orderId;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    final order = state.extra! as Order;
    return TrackOrderPage(
      order: order,
    );
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
  CategoriesRoute({required this.type});

  final CategoryType type;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return CategoriesPage(type: type);
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

class VendorsRoute extends GoRouteData {
  VendorsRoute({
    this.categoryId,
    this.name,
  });

  final int? categoryId;
  final String? name;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    logger.d('categoryId: $categoryId, name: $name');
    return VendorsPage(categoryId: categoryId, name: name);
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

@TypedGoRoute<CheckoutRoute>(path: '/checkout')
class CheckoutRoute extends GoRouteData {
  CheckoutRoute({
    this.type = CheckoutType.cart,
  });

  final CheckoutType type;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    final order = state.extra as Order?;
    return CheckoutPage(type: type, existingOrder: order);
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

class ReceiptRoute extends GoRouteData {
  ReceiptRoute({required this.orderId, this.goBack = false});

  final int orderId;
  final bool goBack;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return ReceiptPage(
      orderId: orderId,
      receipt: state.extra as Receipt?,
      goBack: goBack,
    );
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
  const ProductsRoute({
    this.categoryId,
    this.categoryName,
    this.vendorId,
    this.vendorName,
  }) : assert(
          !(categoryId != null && vendorId != null) &&
                  (categoryId != null && categoryName != null) ||
              (vendorId != null && vendorName != null),
          'categoryId and categoryName or vendorId and vendorName must not be null, but not both',
        );

  final int? categoryId;
  final String? categoryName;
  final int? vendorId;
  final String? vendorName;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return categoryId != null
        ? ProductsPage(
            categoryId: categoryId,
            categoryName: categoryName,
          )
        : ProductsPage(
            vendorId: vendorId,
            vendorName: vendorName,
          );
  }
}

class SingleServiceRoute extends GoRouteData {
  const SingleServiceRoute({
    required this.id,
    required this.name,
  });

  final int id;
  final String name;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return VendorsPage(
      serviceId: id,
      name: name,
    );
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

@TypedGoRoute<SupportRoute>(path: '/support')
class SupportRoute extends GoRouteData {
  const SupportRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const SupportPage();
  }
}

@TypedGoRoute<SettingsRoute>(path: '/settings')
class SettingsRoute extends GoRouteData {
  const SettingsRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const SettingsPage();
  }
}

class EditProfileRoute extends GoRouteData {
  const EditProfileRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const EditProfilePage();
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

@TypedGoRoute<LocationsRoute>(
  path: '/locations',
  routes: [
    TypedGoRoute<NewLocationRoute>(path: 'new'),
    TypedGoRoute<EditLocationRoute>(path: ':id/edit'),
  ],
)
class LocationsRoute extends GoRouteData {
  const LocationsRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const LocationsPage();
  }
}

class EditLocationRoute extends GoRouteData {
  EditLocationRoute({required this.id});

  final int id;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return EditLocationPage(id: id);
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

@TypedGoRoute<WalletRoute>(path: '/wallet')
class WalletRoute extends GoRouteData {
  const WalletRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const WalletPage();
  }
}

class TrackOrderMapRoute extends GoRouteData {
  const TrackOrderMapRoute({
    required this.orderId,
    required this.riderId,
  });

  final int orderId;
  final int riderId;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    final order = state.extra! as Order;
    return TrackOrderMapPage(
      riderId: riderId,
      orderId: orderId,
      order: order,
    );
  }

  static final GlobalKey<NavigatorState> $parentNavigatorKey = rootNavigatorKey;
}

/// Payment route
@TypedGoRoute<PaymentRoute>(path: '/payment')
class PaymentRoute extends GoRouteData {
  const PaymentRoute({
    required this.link,
    this.type = CheckoutType.cart,
    this.isExistingOrder = false,
  });

  final String link;
  final CheckoutType type;
  final bool isExistingOrder;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return PaymentPage(
      transactionLink: link,
      type: type,
      isExistingOrder: isExistingOrder,
    );
  }
}

/// Transaction history route
///
/// This route shows all the transactions made by the user
/// on his/her wallet.
@TypedGoRoute<TransactionHistoryRoute>(path: '/transactions')
class TransactionHistoryRoute extends GoRouteData {
  const TransactionHistoryRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return const TransactionHistoryPage();
  }
}

@TypedGoRoute<SearchRoute>(path: '/search')
class SearchRoute extends GoRouteData {
  const SearchRoute({this.query});

  final String? query;

  @override
  Widget build(BuildContext context, GoRouterState state) {
    return SearchPage(query: query);
  }
}
