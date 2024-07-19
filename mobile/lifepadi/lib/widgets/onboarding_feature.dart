import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
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
    final textTheme = Theme.of(context).textTheme;
    final (:info, :description, :image) = feature;

    return Column(
      children: [
        ClipPath(
          clipper: InvertedSemiCircleClipper(
            controlPointYFactor: 5,
          ),
          child: Container(
            height: 0.6.sh,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage(image),
                fit: BoxFit.fill,
              ),
            ),
          ),
        ),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 36.5.w),
          child: Column(
            children: [
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 9.w),
                child: Text(
                  info,
                  textAlign: TextAlign.center,
                  style: textTheme.headlineSmall?.copyWith(
                    fontSize: 24.sp,
                    fontWeight: FontWeight.w600,
                    letterSpacing: -0.80,
                  ),
                ),
              ),
              10.verticalSpace,
              Text(
                description,
                textAlign: TextAlign.center,
                style: textTheme.bodyLarge?.copyWith(
                  color: kLightTextColor,
                ),
              ),
            ],
          ),
        ),
        24.verticalSpace,
        PaginationDots(
          currentPage: currentPage,
          length: total,
        ),
      ],
    );
  }
}
