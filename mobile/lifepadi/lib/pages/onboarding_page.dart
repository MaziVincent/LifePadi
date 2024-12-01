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
          info: 'We deliver right at your\n door step',
          description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          image: Assets.images.manWithGroceries.path,
        ),
        (
          info: 'Lorem Ipsum is simply dummy text.',
          description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
          image: Assets.images.manWithCart.path,
        ),
        (
          info: 'Lorem Ipsum is simply dummy text.',
          description:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
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
