import 'dart:async';

import 'package:dio/dio.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:lifepadi/utils/secure_storage_service.dart';
import 'package:location/location.dart';
import 'package:signalr_netcore/signalr_client.dart';
import 'package:workmanager/workmanager.dart';

@pragma('vm:entry-point')
void bgCallbackDispatcher() {
  Workmanager().executeTask((task, inputData) async {
    try {
      switch (task) {
        case kPingRider:
          await pingRiderLocation();
          break;
        default:
          break;
      }
    } catch (e) {
      logger.e('$task task execution error', error: e);
    }
    return Future.value(true);
  });
}

/// Enhanced background location ping with authentication and SignalR support
/// Checks if user is a rider, gets location, and sends to both HTTP API and SignalR
Future<void> pingRiderLocation() async {
  try {
    logger.d('Background location ping started');

    // Check if user is a rider
    final secureStorage = SecureStorageService();
    final credentials = await secureStorage.get(kCredentialsKey);
    if (credentials == null) {
      logger.w('No credentials found in background task');
      return;
    }

    final user = UserMapper.fromJson(credentials);
    if (user is! Rider) {
      logger.w('User is not a rider, skipping location update');
      return;
    }

    // Check if background tracking is enabled
    final isTrackingEnabled =
        PreferencesHelper.getBool('background_tracking_enabled') ?? false;
    if (!isTrackingEnabled) {
      logger.d('Background tracking is disabled');
      return;
    }

    // Get rider's location
    final location = Location();

    // Check location services and permissions
    final serviceEnabled = await location.serviceEnabled();
    if (!serviceEnabled) {
      logger.w('Location services not enabled');
      return;
    }

    final permissionGranted = await location.hasPermission();
    if (permissionGranted != PermissionStatus.granted) {
      logger.w('Location permission not granted');
      return;
    }

    // Get current location
    final locationData = await location.getLocation();
    if (locationData.latitude == null || locationData.longitude == null) {
      logger.w('Invalid location data received');
      return;
    }

    logger.d(
      'Background location: (${locationData.latitude}, ${locationData.longitude})',
    );

    // Prepare request data
    final requestData = {
      'RiderId': user.id,
      'Latitude': locationData.latitude,
      'Longitude': locationData.longitude,
    };

    // Send location via HTTP API with authentication
    await _sendLocationViaHttp(user, requestData);

    // Send location via SignalR (best effort)
    await _sendLocationViaSignalR(user, locationData);

    // Update last location update timestamp
    await PreferencesHelper.setString(
      key: 'last_location_update',
      value: DateTime.now().toIso8601String(),
    );

    logger.d('Background location update completed successfully');
  } catch (e) {
    logger.e('Error in background location ping', error: e);
  }
}

/// Send location update via HTTP API with proper authentication
Future<void> _sendLocationViaHttp(
  Rider rider,
  Map<String, dynamic> requestData,
) async {
  try {
    final client = Dio();

    // Add authentication headers if available
    if (rider.accessToken.isNotEmpty) {
      client.options.headers['Authorization'] = 'Bearer ${rider.accessToken}';
    }

    client.options.headers['Content-Type'] = 'application/json';

    await client.put<dynamic>(
      '$kRemoteApiUrl/rider/updateLocation/${rider.id}',
      data: requestData,
    );

    logger.d('HTTP location update sent successfully');
  } catch (e) {
    logger.e('Failed to send location via HTTP', error: e);

    // Fallback to the original endpoint if the new one fails
    try {
      final fallbackClient = Dio();
      fallbackClient.options.headers['Content-Type'] = 'application/json';

      await fallbackClient.post<String>(
        '$kRemoteApiUrl/location/rider',
        data: requestData,
      );

      logger.d('Fallback HTTP location update sent successfully');
    } catch (fallbackError) {
      logger.e(
        'Fallback HTTP location update also failed',
        error: fallbackError,
      );
    }
  }
}

/// Send location update via SignalR (best effort, may fail silently)
Future<void> _sendLocationViaSignalR(
  Rider rider,
  LocationData locationData,
) async {
  HubConnection? hubConnection;

  try {
    // Create SignalR connection
    hubConnection = HubConnectionBuilder()
        .withUrl(kSignalRLocationUrl)
        .withAutomaticReconnect()
        .build();

    // Start connection with timeout
    await hubConnection.start()?.timeout(const Duration(seconds: 10));

    // Send location update
    await hubConnection.invoke(
      'UpdateLocation',
      args: [
        rider.id.toString(),
        locationData.latitude! as Object,
        locationData.longitude! as Object,
      ],
    ).timeout(const Duration(seconds: 5));

    logger.d('SignalR location update sent successfully');
  } catch (e) {
    logger.w(
      'SignalR location update failed (this is expected in background)',
      error: e,
    );
  } finally {
    // Clean up connection
    try {
      await hubConnection?.stop();
    } catch (e) {
      logger.w('Error stopping SignalR connection', error: e);
    }
  }
}
