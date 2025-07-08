import 'package:flutter/material.dart';
import 'package:upgrader/upgrader.dart';

/// Configuration class for the app upgrader functionality
class AppUpgrader {
  /// Creates a configured Upgrader instance for the LifePadi app
  static Upgrader createUpgrader({
    bool debugMode = false,
    Duration? alertDuration,
  }) {
    return Upgrader(
      // Set to true for testing, false for production
      debugDisplayAlways: debugMode,

      // Duration until showing the alert again after user taps "Later"
      durationUntilAlertAgain: alertDuration ?? const Duration(days: 3),

      // Show debug logging (useful for development)
      debugLogging: debugMode,

      // Optional: Set minimum app version if needed
      // minAppVersion: '1.0.0',
    );
  }

  /// Creates an UpgradeAlert widget with LifePadi-specific configuration
  static UpgradeAlert createUpgradeAlert({
    required Widget child,
    bool debugMode = false,
    Duration? alertDuration,
    bool? showIgnore,
    bool? showLater,
    bool? showReleaseNotes,
  }) {
    return UpgradeAlert(
      upgrader: createUpgrader(
        debugMode: debugMode,
        alertDuration: alertDuration,
      ),
      showIgnore: showIgnore ?? true,
      showLater: showLater ?? true,
      showReleaseNotes: showReleaseNotes ?? true,
      child: child,
    );
  }
}
