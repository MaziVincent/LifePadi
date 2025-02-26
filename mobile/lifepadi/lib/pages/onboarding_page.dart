import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class OnboardingPage extends HookWidget {
  const OnboardingPage({super.key});

  @override
  Widget build(BuildContext context) {
    // List of [FeatureInfo] instances.
    final features = useMemoized(
      () => <OnboardingInfo>[
        (
          info: 'Doorstep Delivery',
          description:
              'Get your groceries and essentials delivered right to your doorstep.',
          image: Assets.images.manWithGroceries.path,
        ),
        (
          info: 'Easy Shopping',
          description:
              'Browse products and shop securely with just a few taps.',
          image: Assets.images.manWithCart.path,
        ),
        (
          info: 'Real-time Tracking',
          description:
              'Track your orders and get instant updates on delivery status.',
          image: Assets.images.signDeliverPkg.path,
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
              height: 0.8.sh,
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
            const Spacer(),
            OnboardingNavigation(
              currentPage: currentPage,
              pageController: pageController,
              features: features,
            ),
            const Spacer(flex: 4),
          ],
        ),
      ),
    );
  }
}
