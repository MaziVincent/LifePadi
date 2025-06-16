import 'package:flutter_test/flutter_test.dart';
import 'package:lifepadi/services/background_location_service.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  group('BackgroundLocationService', () {
    late BackgroundLocationService service;

    setUp(() async {
      // Initialize SharedPreferences for testing
      SharedPreferences.setMockInitialValues({});
      await PreferencesHelper.load();
      service = BackgroundLocationService();
    });

    test('should initialize as singleton', () {
      final service1 = BackgroundLocationService();
      final service2 = BackgroundLocationService();
      expect(service1, equals(service2));
    });

    test('should start with background tracking disabled', () {
      expect(service.isBackgroundTrackingEnabled, false);
    });

    test('should return null for last location update initially', () {
      expect(service.lastLocationUpdate, null);
    });

    test('should be able to get current location permissions status', () async {
      // This test would require mocking location services
      // For now, we just test that the method exists and doesn't throw
      expect(() => service.getCurrentLocation(), returnsNormally);
    });
  });
}
