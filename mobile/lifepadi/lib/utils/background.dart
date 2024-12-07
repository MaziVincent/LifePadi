import 'dart:async';

import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/notification_utils.dart';
import 'package:lifepadi/utils/secure_storage_service.dart';
import 'package:location/location.dart';
import 'package:signalr_netcore/hub_connection.dart';
import 'package:signalr_netcore/hub_connection_builder.dart';
import 'package:workmanager/workmanager.dart';

Future<void> initializeBackgroundJobs() async {
  final workmanager = Workmanager();

  // Initialize Workmanager
  await workmanager.initialize(
    bgCallbackDispatcher,
    isInDebugMode: true,
  );

  await workmanager.registerPeriodicTask(
    kPingRider,
    kPingRider,
    frequency: const Duration(minutes: 15),
    constraints: Constraints(
      networkType: NetworkType.connected,
    ),
    existingWorkPolicy: ExistingWorkPolicy.replace,
    backoffPolicy: BackoffPolicy.exponential,
  );

  await workmanager.registerPeriodicTask(
    kCustomerNotification,
    kCustomerNotification,
    frequency: const Duration(minutes: 15),
    constraints: Constraints(
      networkType: NetworkType.connected,
    ),
    existingWorkPolicy: ExistingWorkPolicy.replace,
    backoffPolicy: BackoffPolicy.exponential,
  );
}

@pragma('vm:entry-point')
void bgCallbackDispatcher() {
  Workmanager().executeTask((task, inputData) async {
    try {
      switch (task) {
        case kPingRider:
          await pingRiderLocation();
          break;
        case kCustomerNotification:
          await signalRCustomerNotification();
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
  StreamSubscription<LocationData>? locationSubscription;
  HubConnection? hubConnection;
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

  // Setup SignalR
  hubConnection = HubConnectionBuilder()
      .withUrl(kSignalRLocation)
      .withAutomaticReconnect()
      .build();

  try {
    await hubConnection.start();
    logger.d('[Rider] Connected to SignalR');

    // Start location tracking
    locationSubscription =
        location.onLocationChanged.listen((locationData) async {
      if (locationData.latitude == null || locationData.longitude == null) {
        return;
      }
      logger.d(
        '[Rider] Locationchanged: ${locationData.latitude}, ${locationData.longitude}',
      );
      await hubConnection?.invoke(
        'UpdateLocation',
        args: [
          user.id.toString(),
          locationData.latitude! as Object,
          locationData.longitude! as Object,
        ],
      ).catchError((dynamic error) {
        logger.e('Error sending location update', error: error);
        return error;
      });
    });
  } catch (e) {
    logger.e('[Rider] SignalR connection error', error: e);
    await locationSubscription?.cancel();
    await hubConnection.stop();
  }
}

/// Check for customer notification
/// And show a notification if there is any
Future<void> signalRCustomerNotification() async {
  // Check if user is a customer
  final secureStorage = SecureStorageService();
  final credentials = await secureStorage.get(kCredentialsKey);
  if (credentials == null) return;

  final user = UserMapper.fromJson(credentials);
  if (user is! Customer) return;

  // Setup SignalR with reconnection and keep-alive
  HubConnection? hubConnection;
  hubConnection = HubConnectionBuilder()
      .withUrl(kSignalRNotification)
      .withAutomaticReconnect(
    retryDelays: [
      2000,
      5000,
      10000,
      20000,
      30000,
    ], // Retry delays in milliseconds
  ).build();

  try {
    // Configure connection lifetime
    // hubConnection.serverTimeout = const Duration(minutes: 2);
    // hubConnection.keepAliveInterval = const Duration(seconds: 15);

    await hubConnection.start();
    logger.d('[Customer] Connected to SignalR');

    Future<void> onHubClose({Exception? error}) async {
      if (error != null) {
        logger.e('[Customer] Connection closed with error: $error');
        await hubConnection?.start();
      }
    }

    hubConnection
      ..onclose(onHubClose)
      ..onreconnecting(({Exception? error}) {
        logger.d('[Customer] Attempting to reconnect...');
      })
      ..onreconnected(({String? connectionId}) {
        logger.d('[Customer] Reconnected. ConnectionId: $connectionId');
      })

      // Listen for notifications
      ..on('RecieveNotification', (List<Object?>? args) async {
        if (args != null && args.isNotEmpty) {
          final title = args[0]! as String;
          final message = args[1]! as String;

          await NotificationUtils.showNotification(
            id: DateTime.now().millisecondsSinceEpoch,
            title: title,
            body: message,
            payload: {
              'route': NotificationRoute().location,
            },
          );
        }
      });

    // Keep connection alive
    Timer.periodic(const Duration(minutes: 1), (timer) async {
      if (hubConnection?.state == HubConnectionState.Connected) {
        await hubConnection?.invoke('KeepAlive');
      } else {
        await hubConnection?.start();
      }
    });
  } catch (e) {
    logger.e('[Customer] SignalR connection error', error: e);
    await hubConnection.stop();
  }
}
