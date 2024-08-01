import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

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
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_cart),
            label: 'Orders',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.run_circle),
            label: 'Errands',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.local_shipping),
            label: 'Logistics',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
        currentIndex: _calculateSelectedIndex(context),
        onTap: (int idx) => _onItemTapped(idx, context),
        type: BottomNavigationBarType.fixed,
      ),
    );
  }

  static int _calculateSelectedIndex(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;

    return switch (location) {
      final String l when l.startsWith('/home') => 0,
      final String l when l.startsWith('/orders') => 1,
      final String l when l.startsWith('/errands') => 2,
      final String l when l.startsWith('/logistics') => 3,
      final String l when l.startsWith('/profile') => 4,
      _ => 0,
    };
  }

  void _onItemTapped(int index, BuildContext context) {
    switch (index) {
      case 0:
        context.go('/home');
        break;
      case 1:
        context.go('/orders');
        break;
      case 2:
        context.go('/errands');
        break;
      case 3:
        context.go('/logistics');
        break;
      case 4:
        context.go('/profile');
        break;
      default:
        context.go('/home');
    }
  }
}
