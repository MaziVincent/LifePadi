import 'dart:async';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';

/// A mixin that provides authentication check functionality for routes
/// that require users to be logged in.
mixin AuthRequiredMixin on GoRouteData {
  /// Redirects unauthenticated users to the login page
  @override
  FutureOr<String?> redirect(BuildContext context, GoRouterState state) {
    final authController =
        ProviderScope.containerOf(context).read(authControllerProvider);

    // If user is not authenticated, redirect to home page
    if (authController.valueOrNull?.isAuth != true) {
      return const HomeRoute().location;
    }

    return null;
  }
}
