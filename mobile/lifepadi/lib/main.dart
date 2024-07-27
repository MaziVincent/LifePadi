import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/theme/theme.dart';

import 'router/router.dart';
import 'utils/state_logger.dart';

void main() {
  // Lock app to portraint orientation
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);

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
