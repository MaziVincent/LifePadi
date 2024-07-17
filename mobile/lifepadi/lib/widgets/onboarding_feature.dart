import 'package:flutter/material.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/inverted_semi_circle_clipper.dart';
import 'package:lifepadi/widgets/pagination_dots.dart';

class OnboardingFeature extends StatelessWidget {
  const OnboardingFeature({
    super.key,
    required this.feature,
    required this.currentPage,
    required this.index,
    required this.total,
    required this.pageController,
  });

  final OnboardingInfo feature;
  final int currentPage, index, total;
  final PageController pageController;

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final textTheme = Theme.of(context).textTheme;
    final (:info, :description, :image) = feature;

    return Column(
      children: [
        ClipPath(
          clipper: InvertedSemiCircleClipper(
            controlPointYFactor: 5,
          ),
          child: Container(
            height: size.height * .6,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage(image),
                fit: BoxFit.fill,
              ),
            ),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            info,
            textAlign: TextAlign.center,
            style: textTheme.headlineSmall?.copyWith(
              fontSize: 24,
              fontWeight: FontWeight.w600,
              letterSpacing: -0.80,
            ),
          ),
        ),
        const Spacer(),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            description,
            textAlign: TextAlign.center,
            style: textTheme.bodyLarge?.copyWith(
              color: kLightTextColor,
            ),
          ),
        ),
        const Spacer(flex: 2),
        PaginationDots(
          currentPage: currentPage,
          length: total,
        ),
        const Spacer(flex: 3),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              GestureDetector(
                onTap: () {
                  if (index != 0) {
                    pageController.animateToPage(
                      index - 1,
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
                      color:
                          index != 0 ? kDarkPrimary : const Color(0xFFC7C7C7),
                    ),
                  ),
                  padding: const EdgeInsets.only(left: 4),
                  child: Icon(
                    Icons.arrow_back_ios,
                    color: index != 0 ? kDarkPrimary : const Color(0xFFC7C7C7),
                    size: 18,
                  ),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  GestureDetector(
                    onTap: () {
                      // TODO: Navigate to the get started page.
                    },
                    child: Text(
                      'Skip',
                      style: textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.w600,
                        color: kDarkPrimary,
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  GestureDetector(
                    onTap: () {
                      if (index == total - 1) {
                        // TODO: Navigate to the get started page.
                      } else {
                        pageController.animateToPage(
                          index + 1,
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
                          colors: [kDarkPrimary, kLightPrimary],
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
        const Spacer(),
      ],
    );
  }
}
