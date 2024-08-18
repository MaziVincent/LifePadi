import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:salomon_bottom_bar/salomon_bottom_bar.dart';

/// Builds the "shell" for the app by building a Scaffold with a
/// BottomNavigationBar, where [child] is placed in the body of the Scaffold.
class ScaffoldWithNavBar extends StatelessWidget {
  /// Constructs a [ScaffoldWithNavBar].
  const ScaffoldWithNavBar({
    required this.child,
    super.key,
  });

  /// The widget to display in the body of the Scaffold.
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar: SalomonBottomBar(
        itemPadding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
        margin: EdgeInsets.symmetric(horizontal: 8.w, vertical: 10.h),
        currentIndex: _calculateSelectedIndex(context),
        onTap: (int idx) => _onItemTapped(idx, context),
        items: [
          /// Home
          SalomonBottomBarItem(
            icon: const Icon(IconsaxPlusLinear.home_2),
            activeIcon: const Icon(IconsaxPlusBold.home_2),
            title: const Text('Home'),
          ),

          /// Orders
          SalomonBottomBarItem(
            icon: const Icon(IconsaxPlusLinear.shopping_bag),
            activeIcon: const Icon(IconsaxPlusBold.shopping_bag),
            title: const Text('Orders'),
          ),

          /// Errands
          SalomonBottomBarItem(
            icon: Assets.icons.errandBoy.svg(),
            activeIcon: Assets.icons.errandBoy.svg(
              colorFilter: ColorFilter.mode(
                Theme.of(context).primaryColor,
                BlendMode.srcIn,
              ),
            ),
            title: const Text('Errands'),
          ),

          /// Logistics
          SalomonBottomBarItem(
            icon: const Icon(IconsaxPlusLinear.truck_fast),
            activeIcon: const Icon(IconsaxPlusBold.truck_fast),
            title: const Text('Logistics'),
          ),

          /// Profile
          SalomonBottomBarItem(
            icon: const Icon(IconsaxPlusLinear.user),
            activeIcon: const Icon(IconsaxPlusBold.user),
            title: const Text('Profile'),
          ),
        ],
      ),
    );
  }

  static int _calculateSelectedIndex(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;

    return switch (location) {
      final String l when l == const HomeRoute().location => 0,
      final String l when l == const OrdersRoute().location => 1,
      final String l when l == const ErrandsRoute().location => 2,
      final String l when l == const LogisticsRoute().location => 3,
      final String l when l == const ProfileRoute().location => 4,
      _ => 0,
    };
  }

  void _onItemTapped(int index, BuildContext context) {
    switch (index) {
      case 0:
        context.go(const HomeRoute().location);
        break;
      case 1:
        context.go(const OrdersRoute().location);
        break;
      case 2:
        context.go(const ErrandsRoute().location);
        break;
      case 3:
        context.go(const LogisticsRoute().location);
        break;
      case 4:
        context.go(const ProfileRoute().location);
        break;
      default:
        context.go(const HomeRoute().location);
    }
  }
}
