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

  /// Top-level route segments the app is willing to accept from external
  /// deep links. Anything outside this set is dropped.
  static const _allowedRouteSegments = {
    'home',
    'cart',
    'notifications',
    'categories',
    'vendors',
    'receipts',
    'orders',
    'errands',
    'logistics',
    'profile',
    'splash',
    'onboarding',
    'get-started',
    'login',
    'register',
    'details',
    'products',
    'my-reviews',
    'checkout',
    'payment',
    'wishlist',
    'support',
    'live-chat',
    'settings',
    'wallet',
    'transactions',
    'search',
  };

  /// Hosts we trust to deliver deep links to this app.
  static const _allowedHosts = {
    'app',
    'app.lifepadi.com',
    'lifepadi.com',
  };

  /// Returns true when [route] points at a known top-level segment.
  bool _isAllowedRoute(String route) {
    final cleaned = route.startsWith('/') ? route.substring(1) : route;
    final firstSegment = cleaned.split(RegExp('[/?#]')).first;
    if (firstSegment.isEmpty) return false;
    return _allowedRouteSegments.contains(firstSegment);
  }

  /// Parse URI to get the appropriate GoRouter route
  String? getRouteFromUri(Uri uri) {
    logger.i('Processing deep link: $uri');

    // Reject unknown hosts to prevent navigation to attacker-controlled paths.
    if (uri.host.isNotEmpty && !_allowedHosts.contains(uri.host)) {
      logger.w('Rejecting deep link from untrusted host: ${uri.host}');
      return null;
    }

    // Prepare query string if it exists
    final queryParams = uri.queryParameters;
    final queryString = queryParams.isNotEmpty
        ? '?${queryParams.entries.map((e) => '${e.key}=${e.value}').join('&')}'
        : '';

    String? candidate;

    // Check if URI has a fragment (anything after #)
    final uriString = uri.toString();
    if (uriString.contains('#')) {
      logger.i('Found fragment-based route: ${uri.fragment}');
      candidate =
          uri.fragment.startsWith('/') ? uri.fragment : '/${uri.fragment}';
    } else {
      // For URIs like lifepadi://app/profile or https://app.lifepadi.com/profile
      final path = uri.path;
      candidate = path.startsWith('/') ? path : '/$path';
    }

    if (!_isAllowedRoute(candidate)) {
      logger.w('Rejecting deep link with unknown route: $candidate');
      return null;
    }

    return candidate + queryString;
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
