import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';

class PriceFilterTab extends StatelessWidget {
  const PriceFilterTab({
    super.key,
    required this.selectedPrice,
    required this.price,
  });

  final ValueNotifier<String> selectedPrice;
  final String price;

  @override
  Widget build(BuildContext context) {
    final isSelected = selectedPrice.value == price;

    return Expanded(
      child: GestureDetector(
        onTap: () => selectedPrice.value = price,
        child: AnimatedContainer(
          duration: 300.milliseconds,
          decoration: ShapeDecoration(
            color: Colors.white,
            shape: RoundedRectangleBorder(
              side: BorderSide(
                width: 0.81,
                color: isSelected ? kBrightGreen : const Color(0xFFC2C8D0),
              ),
              borderRadius: BorderRadius.circular(3.25.r),
            ),
          ),
          padding: EdgeInsets.symmetric(vertical: 15.h),
          child: Text(
            '${price.capitalize()}. price',
            textAlign: TextAlign.center,
            style: context.textTheme.bodyMedium?.copyWith(
              color: isSelected ? kBrightGreen : const Color(0xFF858585),
              fontSize: 14.sp,
              fontWeight: FontWeight.w400,
              letterSpacing: 0.25,
            ),
          ),
        ),
      ),
    );
  }
}
