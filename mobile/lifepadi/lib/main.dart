import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/theme/theme.dart';
import 'package:lifepadi/utils/notification_utils.dart';
import 'package:lifepadi/utils/preferences_helper.dart';

import 'router/router.dart';
import 'utils/state_logger.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Lock app to portrait orientation
  await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);

  // Initialize awesome notifications
  await NotificationUtils.initialize();

  // Load shared preferences
  await PreferencesHelper.load();

  await Firebase.initializeApp();

  await NotificationUtils.listenForFcmNotifications();

  await NotificationUtils.susbcribeToTopic('general');

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
