import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:internet_connection_checker/internet_connection_checker.dart';

class NetworkConnectivity {
  factory NetworkConnectivity() {
    return _singleton;
  }

  NetworkConnectivity._internal();
  static final NetworkConnectivity _singleton = NetworkConnectivity._internal();

  static final _internetChecker = InternetConnectionChecker.instance;

  static Future<bool> get isConnected async {
    try {
      return await _internetChecker.hasConnection;
    } catch (e) {
      debugPrint('Error checking connectivity: $e');
      return false;
    }
  }

  // Stream that emits connection status changes
  static Stream<InternetConnectionStatus> get onConnectionChange {
    return _internetChecker.onStatusChange;
  }

  // Make sure to dispose the instance when not needed
  static void dispose() {
    _internetChecker.dispose();
  }
}
