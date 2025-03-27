import 'dart:async';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/pages/connection_failed_page.dart';
import 'package:lifepadi/theme/theme.dart';
import 'package:lifepadi/utils/connectivity_service.dart';
import 'package:lifepadi/utils/notification_utils.dart';
import 'package:lifepadi/utils/preferences_helper.dart';

import 'router/router.dart';
import 'utils/state_logger.dart';

@pragma('vm:entry-point')
Future<void> _handleFcmBackgroundMessage(RemoteMessage message) async {
  // If you're going to use other Firebase services in the background, such as Firestore,
  // make sure you call `initializeApp` before using other Firebase services.
  await Firebase.initializeApp();
  if (message.notification == null) return;
  final route = message.data['route'] as String?;
  await PreferencesHelper.saveNotification(
    title: message.notification?.title ?? '',
    body: message.notification?.body ?? '',
    route: route,
  );
}

// Create a global key that will be used to access the navigator state for app restart
final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>();

// Global flag to indicate if we're in offline mode
bool isOfflineMode = false;

// Create a provider to expose app state, so we can rebuild just what's needed
final appStateProvider = StateProvider<bool>((ref) => isOfflineMode);

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // Lock app to portrait orientation
  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);

  // First check connectivity to determine if we're in offline mode
  final connectivityResult = await Connectivity().checkConnectivity();
  final hasConnection = !connectivityResult.contains(ConnectivityResult.none);

  // Initialize awesome notifications, which doesn't require internet
  await NotificationUtils.initialize();

  // Load shared preferences, which is a local operation
  await PreferencesHelper.load();

  if (hasConnection) {
    // Only initialize Firebase if we have connectivity
    try {
      // Set a timeout for Firebase initialization to avoid hanging indefinitely
      await Firebase.initializeApp().timeout(
        const Duration(seconds: 5),
        onTimeout: () {
          throw TimeoutException('Firebase initialization timed out');
        },
      );

      // Listen for FCM notifications
      // Terminated
      await FirebaseMessaging.instance.getInitialMessage().timeout(
        const Duration(seconds: 3),
        onTimeout: () {
          // Simply continue if FCM initial message times out
          return null;
        },
      ).then((message) async {
        if (message != null) {
          if (message.notification == null) return;
          final route = message.data['route'] as String?;
          await PreferencesHelper.saveNotification(
            title: message.notification?.title ?? '',
            body: message.notification?.body ?? '',
            route: route,
          );
        }
      });

      // Background
      FirebaseMessaging.onBackgroundMessage(_handleFcmBackgroundMessage);

      // Foreground
      FirebaseMessaging.onMessage.listen((message) async {
        if (message.notification == null) return;
        final route = message.data['route'] as String?;
        await PreferencesHelper.saveNotification(
          title: message.notification?.title ?? '',
          body: message.notification?.body ?? '',
          route: route,
        );
      });

      final notificationsEnabled = PreferencesHelper.getNotificationsEnabled();
      if (notificationsEnabled) {
        await FirebaseMessaging.instance.subscribeToTopic('general');
      }
    } catch (e) {
      // If Firebase initialization fails, we'll run in offline mode
      isOfflineMode = true;
      debugPrint('Firebase initialization failed: $e');
    }
  } else {
    // No connectivity, run in offline mode
    isOfflineMode = true;
  }

  runApp(
    ProviderScope(
      observers: const [StateLogger()],
      overrides: [
        appStateProvider.overrideWith((ref) => isOfflineMode),
      ],
      child: const LifepadiApp(),
    ),
  );
}

// This function properly initializes Firebase services when connectivity is restored
Future<void> initializeFirebaseServices() async {
  if (isOfflineMode) {
    try {
      await Firebase.initializeApp().timeout(const Duration(seconds: 5));

      // Set up FCM
      await FirebaseMessaging.instance.getInitialMessage();
      FirebaseMessaging.onBackgroundMessage(_handleFcmBackgroundMessage);
      FirebaseMessaging.onMessage.listen((message) async {
        if (message.notification == null) return;
        final route = message.data['route'] as String?;
        await PreferencesHelper.saveNotification(
          title: message.notification?.title ?? '',
          body: message.notification?.body ?? '',
          route: route,
        );
      });

      // By default, subscribe to the general topic
      await FirebaseMessaging.instance.subscribeToTopic('general');

      // Successfully initialized Firebase
      // Offline mode can be turned off now
      isOfflineMode = false;
      return;
    } catch (e) {
      debugPrint('Failed to initialize Firebase: $e');
      // Keep offline mode enabled
      return;
    }
  }
}

class LifepadiApp extends ConsumerWidget {
  const LifepadiApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isOffline = ref.watch(appStateProvider);

    return ScreenUtilInit(
      designSize: const Size(375, 812),
      minTextAdapt: true,
      builder: (_, __) {
        // Check if we're in offline mode
        if (isOffline) {
          return MaterialApp(
            navigatorKey: navigatorKey,
            title: 'Lifepadi',
            theme: lightTheme(),
            debugShowCheckedModeBanner: false,
            home: ConnectionFailedPage(
              onRetry: () async {
                // Check connectivity again
                final connectivityService =
                    ref.read(connectivityServiceProvider);
                final hasConnection = await connectivityService.isConnected();

                if (hasConnection) {
                  // Try to initialize Firebase services
                  await initializeFirebaseServices();

                  // Update app state to trigger a rebuild
                  ref.read(appStateProvider.notifier).state = isOfflineMode;
                }
              },
            ),
          );
        }
        // Online mode - use router as usual
        final router = ref.watch(routerProvider);
        return MaterialApp.router(
          routerConfig: router,
          title: 'Lifepadi',
          theme: lightTheme(),
          debugShowCheckedModeBanner: false,
        );
      },
    );
  }
}
