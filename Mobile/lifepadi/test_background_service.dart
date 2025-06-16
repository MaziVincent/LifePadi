import 'package:flutter/material.dart';
import 'package:lifepadi/services/background_location_service.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';

/// Simple test script to verify background location service
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Initialize preferences
  await PreferencesHelper.load();
  
  final service = BackgroundLocationService();
  
  logger.i('Testing Background Location Service');
  logger.i('Current tracking status: ${service.isBackgroundTrackingEnabled}');
  logger.i('Last update: ${service.lastLocationUpdate}');
  
  // Test initialization
  try {
    await service.initializeFromAuthState();
    logger.i('Service initialization completed');
  } catch (e) {
    logger.e('Service initialization failed', error: e);
  }
  
  // Test location permissions
  try {
    final location = await service.getCurrentLocation();
    if (location != null) {
      logger.i('Current location: ${location.latitude}, ${location.longitude}');
    } else {
      logger.w('Could not get current location');
    }
  } catch (e) {
    logger.e('Location test failed', error: e);
  }
  
  logger.i('Background service test completed');
}
