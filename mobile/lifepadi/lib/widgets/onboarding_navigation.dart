import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:lifepadi/widgets/section_title.dart';

/// Navigation buttons for the onboarding page.
class OnboardingNavigation extends StatelessWidget {
  const OnboardingNavigation({
    super.key,
    required this.currentPage,
    required this.pageController,
    required this.features,
  });

  final ValueNotifier<int> currentPage;
  final PageController pageController;
  final List<OnboardingInfo> features;

  void _completeOnboarding(BuildContext context) {
    // Set flag indicating user has seen onboarding
    PreferencesHelper.setBool(key: 'hasSeenOnboarding', value: true);
    // Navigate directly to home instead of get-started
    context.go(const HomeRoute().location);
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: kHorizontalPadding,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          GestureDetector(
            onTap: () {
              if (currentPage.value != 0) {
                pageController.animateToPage(
                  currentPage.value - 1,
                  duration: 300.milliseconds,
                  curve: Curves.easeInOut,
                );
              }
            },
            child: AnimatedContainer(
              duration: 300.milliseconds,
              width: 60.r,
              height: 60.r,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: currentPage.value != 0
                      ? kDarkPrimaryColor
                      : const Color(0xFFC7C7C7),
                ),
              ),
              child: Icon(
                IconsaxPlusLinear.arrow_left_1,
                color: currentPage.value != 0
                    ? kDarkPrimaryColor
                    : const Color(0xFFC7C7C7),
                size: 18.r,
              ),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              GestureDetector(
                onTap: () {
                  _completeOnboarding(context);
                },
                child: const SectionTitle(
                  'Skip',
                  color: kDarkPrimaryColor,
                ),
              ),
              10.horizontalSpace,
              GestureDetector(
                onTap: () {
                  if (currentPage.value == features.length - 1) {
                    _completeOnboarding(context);
                  } else {
                    pageController.animateToPage(
                      currentPage.value + 1,
                      duration: 300.milliseconds,
                      curve: Curves.easeInOut,
                    );
                  }
                },
                child: Container(
                  width: 60.r,
                  height: 60.r,
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    gradient: LinearGradient(
                      colors: [kDarkPrimaryColor, kLightPrimaryColor],
                    ),
                  ),
                  child: Icon(
                    IconsaxPlusLinear.arrow_right_3,
                    color: Colors.white,
                    size: 18.r,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
