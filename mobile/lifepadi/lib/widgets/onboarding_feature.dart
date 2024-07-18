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
    required this.total,
    required this.pageController,
  });

  final OnboardingInfo feature;
  final int currentPage, total;
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
          padding: const EdgeInsets.symmetric(horizontal: 24),
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
        const SizedBox(height: 16),
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
        // const SizedBox(height: 16),
        const Spacer(),
        PaginationDots(
          currentPage: currentPage,
          length: total,
        ),
        const Spacer(),
      ],
    );
  }
}
