import 'dart:async';

import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:internet_connection_checker/internet_connection_checker.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/biometric_service.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/network_connectivity.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:lifepadi/widgets/widgets.dart';

import '../utils/helpers.dart';

bool hasSeenOnboarding() {
  final hasSeenOnboarding = PreferencesHelper.getBool(kHasSeenOnboarding);
  return hasSeenOnboarding ?? false;
}

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

class SplashPage extends HookConsumerWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = useAnimationController(duration: 4.seconds);
    final isCheckingConnectivity = useState(false);
    final isInitializingFirebase = useState(false);
    final isFirebaseInitialized = useState(false);
    final connectionListener =
        useState<StreamSubscription<InternetConnectionStatus>?>(null);

    // Set up a listener for internet connectivity changes
    useEffect(
      () {
        connectionListener.value =
            NetworkConnectivity.onConnectionChange.listen(
          (InternetConnectionStatus status) {
            // If internet becomes disconnected while on splash screen, show the connection failed page
            if (status == InternetConnectionStatus.disconnected &&
                context.mounted) {
              context.go(const ConnectionFailedRoute().location);
            }
          },
        );

        return () {
          // Cancel the subscription when disposing to prevent memory leaks
          connectionListener.value?.cancel();
        };
      },
      const [],
    );

    // Function to initialize Firebase
    Future<void> initializeFirebase() async {
      if (isInitializingFirebase.value || isFirebaseInitialized.value) return;

      isInitializingFirebase.value = true;

      try {
        // Initialize Firebase
        await Firebase.initializeApp();
        isFirebaseInitialized.value = true;

        // Listen for FCM notifications
        // Terminated
        await FirebaseMessaging.instance
            .getInitialMessage()
            .then((message) async {
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

        // Subscribe to topics if notifications are enabled
        final notificationsEnabled =
            PreferencesHelper.getNotificationsEnabled();
        if (notificationsEnabled) {
          await FirebaseMessaging.instance.subscribeToTopic('general');
        }
      } catch (e) {
        logger.e('Failed to initialize Firebase:', error: e);
        // If Firebase initialization fails, we'll continue with the app
        // but functionality requiring Firebase might not work correctly
      } finally {
        isInitializingFirebase.value = false;
      }
    }

    useEffect(
      () {
        controller
          ..addStatusListener((status) async {
            // When animation is starting, check for connectivity early
            if (status == AnimationStatus.forward &&
                controller.value > 0.1 &&
                !isCheckingConnectivity.value) {
              isCheckingConnectivity.value = true;

              // Check for internet connectivity
              final hasConnection = await NetworkConnectivity.isConnected;

              // If no connection, navigate to connection failed page
              if (!hasConnection && context.mounted) {
                context.go(const ConnectionFailedRoute().location);
                return;
              }

              // Start Firebase initialization early (around 10% of animation)
              await initializeFirebase();

              isCheckingConnectivity.value = false;
            }

            if (status == AnimationStatus.completed) {
              // Make sure Firebase initialization is complete
              if (!isFirebaseInitialized.value &&
                  !isInitializingFirebase.value) {
                // Final connectivity check before proceeding
                final hasConnection = await NetworkConnectivity.isConnected;
                if (!hasConnection && context.mounted) {
                  context.go(const ConnectionFailedRoute().location);
                  return;
                }

                await initializeFirebase();
              }

              String nextRoute;

              // First check: Has the user seen onboarding?
              if (!hasSeenOnboarding()) {
                // User has never seen onboarding, show it first
                nextRoute = const OnboardingRoute().location;
              } else {
                // Check for biometric authentication need
                final isBiometricEnabled =
                    PreferencesHelper.getBool(kBiometricsKey) ?? false;
                final canRestoreAuth = await ref
                    .read(authControllerProvider.notifier)
                    .canRestoreAuth();

                if (isBiometricEnabled &&
                    canRestoreAuth &&
                    await BiometricService().isSupported()) {
                  // Go to biometric auth page if biometrics is enabled and auth can be restored
                  nextRoute = const BiometricAuthRoute().location;
                } else {
                  // Otherwise go to home page
                  nextRoute = const HomeRoute().location;
                }
              }

              if (context.mounted) {
                context.go(nextRoute);
              }
            }
          })
          ..forward();

        return null;
      },
      [controller],
    );

    return Scaffold(
      body: Stack(
        children: [
          Align(
            child: Assets.animations.logo.lottie(
              repeat: false,
              controller: controller,
            ),
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              const GreenyLoadingWheel(),
              16.verticalSpace,
              Align(
                alignment: Alignment.bottomCenter,
                child: Text(
                  'Easy Life with padi',
                  style: context.textTheme.titleSmall?.copyWith(
                    color: const Color(0xFFC7C7C7),
                    fontWeight: FontWeight.w400,
                    fontSize: 8.98.sp,
                    letterSpacing: 2.64.r,
                    height: 0.25.r,
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              29.verticalSpace,
            ],
          ),
        ],
      ),
    );
  }
}
