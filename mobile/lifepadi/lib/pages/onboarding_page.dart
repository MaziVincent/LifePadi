import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';

import '../widgets/onboarding_feature.dart';

class OnboardingPage extends HookWidget {
  const OnboardingPage({super.key});

  @override
  Widget build(BuildContext context) {
    // List of [FeatureInfo] instances.
    final features = useMemoized(
      () => <OnboardingInfo>[
        (
          info: 'We deliver right at your\n door step',
          description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          image: 'assets/images/man-with-groceries.png',
        ),
        (
          info: 'Lorem Ipsum is simply dummy text.',
          description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          image: 'assets/images/man-with-cart.png',
        ),
        (
          info: 'Lorem Ipsum is simply dummy text.',
          description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          image: 'assets/images/sign-deliver-pkg.png',
        ),
      ],
    );
    final currentPage = useState(0);
    final pageController = usePageController();

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            SizedBox(
              height: MediaQuery.of(context).size.height * 0.85,
              child: PageView.builder(
                itemCount: features.length,
                onPageChanged: (index) => currentPage.value = index,
                controller: pageController,
                itemBuilder: (context, index) {
                  return OnboardingFeature(
                    feature: features[index],
                    currentPage: currentPage.value,
                    total: features.length,
                    pageController: pageController,
                  );
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  GestureDetector(
                    onTap: () {
                      if (currentPage.value != 0) {
                        pageController.animateToPage(
                          currentPage.value - 1,
                          duration: kAnimationDuration,
                          curve: Curves.easeInOut,
                        );
                      }
                    },
                    child: Container(
                      width: 60,
                      height: 60,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(
                          color: currentPage.value != 0
                              ? kDarkPrimaryColor
                              : const Color(0xFFC7C7C7),
                        ),
                      ),
                      padding: const EdgeInsets.only(left: 4),
                      child: Icon(
                        Icons.arrow_back_ios,
                        color: currentPage.value != 0
                            ? kDarkPrimaryColor
                            : const Color(0xFFC7C7C7),
                        size: 18,
                      ),
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      GestureDetector(
                        onTap: () {
                          context.go(const GetStartedRoute().location);
                        },
                        child: Text(
                          'Skip',
                          style:
                              Theme.of(context).textTheme.bodyLarge?.copyWith(
                                    fontWeight: FontWeight.w600,
                                    color: kDarkPrimaryColor,
                                  ),
                        ),
                      ),
                      const SizedBox(width: 10),
                      GestureDetector(
                        onTap: () {
                          if (currentPage.value == features.length - 1) {
                            context.go(const GetStartedRoute().location);
                          } else {
                            pageController.animateToPage(
                              currentPage.value + 1,
                              duration: kAnimationDuration,
                              curve: Curves.easeInOut,
                            );
                          }
                        },
                        child: Container(
                          width: 60,
                          height: 60,
                          decoration: const BoxDecoration(
                            shape: BoxShape.circle,
                            gradient: LinearGradient(
                              colors: [kDarkPrimaryColor, kLightPrimaryColor],
                            ),
                          ),
                          child: const Icon(
                            Icons.arrow_forward_ios,
                            color: Colors.white,
                            size: 18,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
