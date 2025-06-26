import 'dart:async';

import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:lifepadi/utils/secure_storage_service.dart';
import 'package:location/location.dart';
import 'package:workmanager/workmanager.dart';

/// Service to manage background location tracking for riders
class BackgroundLocationService {
  factory BackgroundLocationService() => _instance;
  BackgroundLocationService._internal();
  static final BackgroundLocationService _instance =
      BackgroundLocationService._internal();

  final SecureStorageService _secureStorage = SecureStorageService();
  final Location _location = Location();

  static const String _backgroundTrackingKey = 'background_tracking_enabled';
  static const String _lastLocationUpdateKey = 'last_location_update';

  /// Check if background location tracking is enabled
  bool get isBackgroundTrackingEnabled =>
      PreferencesHelper.getBool(_backgroundTrackingKey) ?? false;

  /// Enable background location tracking for the current rider
  Future<bool> enableBackgroundTracking() async {
    try {
      // Check if user is authenticated and is a rider
      final credentials = await _secureStorage.get(kCredentialsKey);
      if (credentials == null) {
        logger.w('No credentials found, cannot enable background tracking');
        return false;
      }

      final user = UserMapper.fromJson(credentials);
      if (user is! Rider) {
        logger.w('User is not a rider, cannot enable background tracking');
        return false;
      }

      // Check location permissions
      final hasPermissions = await _checkLocationPermissions();
      if (!hasPermissions) {
        logger.w('Location permissions not granted');
        return false;
      }

      try {
        // Register the periodic background task
        await Workmanager().registerPeriodicTask(
          kPingRider,
          kPingRider,
          frequency: const Duration(minutes: 15), // Minimum allowed frequency
          constraints: Constraints(
            networkType: NetworkType.connected,
            requiresBatteryNotLow: false,
            requiresCharging: false,
            requiresDeviceIdle: false,
            requiresStorageNotLow: false,
          ),
          backoffPolicy: BackoffPolicy.exponential,
          backoffPolicyDelay: const Duration(minutes: 1),
        );

        logger
            .i('Background task registered successfully for rider ${user.id}');

        // Save the tracking state
        await PreferencesHelper.setBool(
          key: _backgroundTrackingKey,
          value: true,
        );

        logger.i('Background location tracking enabled for rider ${user.id}');
        return true;
      } catch (workManagerError) {
        logger.e('WorkManager registration failed', error: workManagerError);

        // Still mark as enabled in preferences so the service can retry later
        await PreferencesHelper.setBool(
          key: _backgroundTrackingKey,
          value: true,
        );

        // Return false to indicate the immediate registration failed
        return false;
      }
    } catch (e) {
      logger.e('Failed to enable background tracking', error: e);
      return false;
    }
  }

  /// Disable background location tracking
  Future<void> disableBackgroundTracking() async {
    try {
      // Cancel the background task
      await Workmanager().cancelByUniqueName(kPingRider);

      // Update the tracking state
      await PreferencesHelper.setBool(
        key: _backgroundTrackingKey,
        value: false,
      );

      logger.i('Background location tracking disabled');
    } catch (e) {
      logger.e('Failed to disable background tracking', error: e);
    }
  }

  /// Check and request location permissions
  Future<bool> _checkLocationPermissions() async {
    bool serviceEnabled;
    PermissionStatus permissionGranted;

    // Check if location services are enabled
    serviceEnabled = await _location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await _location.requestService();
      if (!serviceEnabled) {
        return false;
      }
    }

    // Check location permissions
    permissionGranted = await _location.hasPermission();
    if (permissionGranted == PermissionStatus.denied) {
      permissionGranted = await _location.requestPermission();
      if (permissionGranted != PermissionStatus.granted) {
        return false;
      }
    }

    return true;
  }

  /// Get the last location update timestamp
  DateTime? get lastLocationUpdate {
    final timestamp = PreferencesHelper.getString(_lastLocationUpdateKey);
    if (timestamp != null) {
      return DateTime.tryParse(timestamp);
    }
    return null;
  }

  /// Update the last location update timestamp
  // ignore: unused_element
  Future<void> _updateLastLocationTimestamp() async {
    await PreferencesHelper.setString(
      key: _lastLocationUpdateKey,
      value: DateTime.now().toIso8601String(),
    );
  }

  /// Start background tracking when rider logs in
  Future<void> onRiderLogin(Rider rider) async {
    logger.i(
      'Rider ${rider.id} logged in, starting background location tracking',
    );
    await enableBackgroundTracking();
  }

  /// Stop background tracking when rider logs out
  Future<void> onRiderLogout() async {
    logger.i('Rider logged out, stopping background location tracking');
    await disableBackgroundTracking();
  }

  /// Check if the current user is a rider and should have background tracking
  Future<bool> shouldEnableBackgroundTracking() async {
    try {
      final credentials = await _secureStorage.get(kCredentialsKey);
      if (credentials == null) return false;

      final user = UserMapper.fromJson(credentials);
      return user is Rider;
    } catch (e) {
      logger.e('Error checking if should enable background tracking', error: e);
      return false;
    }
  }

  /// Initialize background tracking based on current auth state
  Future<void> initializeFromAuthState() async {
    final shouldEnable = await shouldEnableBackgroundTracking();

    if (shouldEnable && !isBackgroundTrackingEnabled) {
      await enableBackgroundTracking();
    } else if (!shouldEnable && isBackgroundTrackingEnabled) {
      await disableBackgroundTracking();
    }
  }

  /// Get current location for immediate use
  Future<LocationData?> getCurrentLocation() async {
    try {
      final hasPermissions = await _checkLocationPermissions();
      if (!hasPermissions) return null;

      return await _location.getLocation();
    } catch (e) {
      logger.e('Failed to get current location', error: e);
      return null;
    }
  }

  /// Force a location update (useful for testing or immediate updates)
  Future<void> forceLocationUpdate() async {
    try {
      await Workmanager().registerOneOffTask(
        '${kPingRider}_immediate',
        kPingRider,
        constraints: Constraints(
          networkType: NetworkType.connected,
        ),
      );
      logger.i('Forced immediate location update');
    } catch (e) {
      logger.e('Failed to force location update', error: e);
    }
  }
}
