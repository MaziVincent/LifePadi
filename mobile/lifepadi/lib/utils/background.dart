import 'dart:async';

import 'package:dio/dio.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/secure_storage_service.dart';
import 'package:location/location.dart';
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

/// Check if a user is stored in secure storage and if the user is a rider
/// If so, get the rider's location and send it to the server
/// If not, do nothing
Future<void> pingRiderLocation() async {
  // Check if user is a rider
  final secureStorage = SecureStorageService();
  final credentials = await secureStorage.get(kCredentialsKey);
  if (credentials == null) return;

  final user = UserMapper.fromJson(credentials);
  if (user is! Rider) return;

  // Get rider's location and send location to server
  final location = Location();

  bool serviceEnabled;
  PermissionStatus permissionGranted;

  // Check location services
  serviceEnabled = await location.serviceEnabled();
  if (!serviceEnabled) {
    serviceEnabled = await location.requestService();
    if (!serviceEnabled) return;
  }

  // Check permissions
  permissionGranted = await location.hasPermission();
  if (permissionGranted == PermissionStatus.denied) {
    permissionGranted = await location.requestPermission();
    if (permissionGranted != PermissionStatus.granted) return;
  }

  // Send rider's location via a post request to /location/rider
  final locationData = await location.getLocation();
  final client = Dio()
    ..options.headers.addAll({
      'Content-Type': 'application/json',
    });
  final requestData = {
    'RiderId': user.id,
    'Latitude': locationData.latitude,
    'Longitude': locationData.longitude,
  };
  logger
    ..d('Sending rider location')
    ..d(requestData);
  await client.post<String>(
    '$kRemoteApiUrl/location/rider',
    data: requestData,
  );
}
