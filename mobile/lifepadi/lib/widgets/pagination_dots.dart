import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';

class PaginationDots extends StatelessWidget {
  const PaginationDots({
    super.key,
    required this.length,
    required this.currentPage,
  });

  final int length, currentPage;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(
        length,
        (i) => PageDot(
          isActive: currentPage == i,
          isLast: i == length - 1,
        ),
      ),
    );
  }
}

class PageDot extends StatelessWidget {
  const PageDot({
    super.key,
    required this.isActive,
    required this.isLast,
  });

  final bool isActive, isLast;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: 300.milliseconds,
      width: isActive ? 24.h : 8.h,
      height: 8.h,
      decoration: ShapeDecoration(
        color: isActive ? kLightPrimaryColor : const Color(0xFFD9D9D9),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4.r),
        ),
      ),
      margin: isLast ? null : const EdgeInsets.only(right: 8).w,
    );
  }
}
