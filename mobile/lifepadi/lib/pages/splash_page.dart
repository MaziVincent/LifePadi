import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:lifepadi/widgets/widgets.dart';

bool hasLoggedInBefore() {
  final hasLoggedIn = PreferencesHelper.getBool(kHasEverLoggedIn);
  return hasLoggedIn ?? false;
}

bool hasSeenOnboarding() {
  final hasSeenOnboarding = PreferencesHelper.getBool('hasSeenOnboarding');
  return hasSeenOnboarding ?? false;
}

class SplashPage extends HookConsumerWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = useAnimationController(duration: 4.seconds);

    useEffect(
      () {
        controller
          ..addStatusListener((status) async {
            if (status == AnimationStatus.completed) {
              final auth = ref.read(authControllerProvider);
              String nextRoute;

              // If user is authenticated, go to home
              if (auth.value?.isAuth ?? false) {
                nextRoute = const HomeRoute().location;
              } else {
                // If user has not seen onboarding, show it first
                if (!hasSeenOnboarding()) {
                  nextRoute = const OnboardingRoute().location;
                } else {
                  // User has seen onboarding, go directly to home
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
