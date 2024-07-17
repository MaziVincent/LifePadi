import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
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
        child: PageView.builder(
          itemCount: features.length,
          onPageChanged: (index) => currentPage.value = index,
          controller: pageController,
          itemBuilder: (context, index) {
            return OnboardingFeature(
              feature: features[index],
              currentPage: currentPage.value,
              index: index,
              total: features.length,
              pageController: pageController,
            );
          },
        ),
      ),
    );
  }
}
