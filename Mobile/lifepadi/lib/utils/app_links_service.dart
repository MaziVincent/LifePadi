import 'dart:async';

import 'package:app_links/app_links.dart';
import 'package:flutter/foundation.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/helpers.dart';

/// A service that handles deep linking functionality for the app
class AppLinksService {
  factory AppLinksService() => _instance;

  AppLinksService._internal();

  /// Singleton instance
  static final AppLinksService _instance = AppLinksService._internal();

  /// App links plugin instance
  final _appLinks = AppLinks();

  GoRouter? router;

  /// Initialize deep linking
  Future<void> init() async {
    // Get the initial link that opened the app (if any)
    try {
      final appLink = await _appLinks.getInitialLink();
      if (appLink != null) {
        _handleDeepLink(appLink);
      }
    } catch (e) {
      debugPrint('Error getting initial app link: $e');
    }

    // Listen for app links while the app is running
    _appLinks.uriLinkStream.listen(_handleDeepLink);
  }

  /// Handle incoming deep link
  void _handleDeepLink(Uri uri) {
    logger
      ..d('Deep link received: $uri')
      ..d('URI scheme: ${uri.scheme}')
      ..d('URI host: ${uri.host}')
      ..d('URI path: ${uri.path}')
      ..d('URI fragment: ${uri.fragment}');

    navigateToRoute(uri);
  }

  /// Parse URI to get the appropriate GoRouter route
  String? getRouteFromUri(Uri uri) {
    logger.i('Processing deep link: $uri');

    // Check if URI has a fragment (anything after #)
    final uriString = uri.toString();
    if (uriString.contains('#')) {
      logger.i('Found fragment-based route: ${uri.fragment}');
      // For URIs like lifepadi://app/#/profile, return the fragment
      return uri.fragment.startsWith('/') ? uri.fragment : '/${uri.fragment}';
    }

    // For URIs like lifepadi://app/profile
    // or https://app.lifepadi.com/profile
    // Extract everything after host/domain
    final path = uri.path;

    if (uri.host == 'app') {
      logger.i('Found app-based route: $path');
      // For URIs like lifepadi://app/profile
      return path.startsWith('/') ? path : '/$path';
    }

    // For URIs like https://app.lifepadi.com/profile
    if (uri.host == 'app.lifepadi.com') {
      logger.i('Found subdomain-based route: $path');
      return path.startsWith('/') ? path : '/$path';
    }

    // For any other host
    logger.i('Found web-based route: $path');
    return path.startsWith('/') ? path : '/$path';
  }

  /// Navigate to the route specified by the URI using GoRouter
  void navigateToRoute(Uri uri) {
    final route = getRouteFromUri(uri);
    if (route != null) {
      logger.d('Navigating to route: $route');
      if (router != null) {
        // Use the router to navigate
        router!.push(route);
      } else if (rootNavigatorKey.currentContext != null) {
        // Fallback to root navigator if router is not set
        GoRouter.of(rootNavigatorKey.currentContext!).push(route);
      } else {
        logger
          ..f('No router or context available for navigation')
          ..f('Unable to navigate: $route');
      }
    }
  }
}
