import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

/// A [CustomTransitionPage] that doesn't animate transitions.
class NoTransitionPage<T> extends CustomTransitionPage<T> {
  NoTransitionPage({
    required super.child,
    super.key,
    super.name,
    super.arguments,
    super.restorationId,
  }) : super(
          transitionsBuilder: (_, __, ___, child) => child,
          transitionDuration: Duration.zero,
        );
}

/// A [PageTransitionsBuilder] that doesn't animate transitions.
class NoTransitionPageTransitionsBuilder extends PageTransitionsBuilder {
  const NoTransitionPageTransitionsBuilder();

  @override
  Widget buildTransitions<T>(
    PageRoute<T> route,
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child,
  ) {
    return child;
  }
}
