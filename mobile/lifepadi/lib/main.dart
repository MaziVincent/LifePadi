import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/theme/theme.dart';
import 'package:lifepadi/utils/background.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/notification_utils.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:workmanager/workmanager.dart';

import 'router/router.dart';
import 'utils/state_logger.dart';

@pragma('vm:entry-point')
Future<void> _handleFcmBackgroundMessage(RemoteMessage message) async {
  if (message.notification == null) return;
  final route = message.data['route'] as String?;

  await PreferencesHelper.saveNotification(
    title: message.notification?.title ?? '',
    body: message.notification?.body ?? '',
    route: route,
  );
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Lock app to portrait orientation
  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);

  // Initialize awesome notifications
  await NotificationUtils.initialize();

  // Load shared preferences
  await PreferencesHelper.load();

  await Firebase.initializeApp();

  /// Listen for FCM notifications
  /// // Terminated
  await FirebaseMessaging.instance.getInitialMessage().then((message) async {
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

  await FirebaseMessaging.instance.subscribeToTopic('general');

  final workmanager = Workmanager();

  // Initialize Workmanager
  await workmanager.initialize(
    bgCallbackDispatcher,
    isInDebugMode: true,
  );

  await workmanager.registerPeriodicTask(
    kPingRider,
    kPingRider,
    frequency: const Duration(minutes: 1),
    constraints: Constraints(
      networkType: NetworkType.connected,
    ),
    existingWorkPolicy: ExistingWorkPolicy.replace,
    backoffPolicy: BackoffPolicy.exponential,
  );

  runApp(
    const ProviderScope(
      observers: [StateLogger()],
      child: LifepadiApp(),
    ),
  );
}

class LifepadiApp extends ConsumerWidget {
  const LifepadiApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);

    return ScreenUtilInit(
      designSize: const Size(375, 812),
      minTextAdapt: true,
      builder: (_, __) {
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
