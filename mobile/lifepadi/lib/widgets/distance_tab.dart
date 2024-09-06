import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';

class DistanceTab extends StatelessWidget {
  const DistanceTab({
    super.key,
    required this.distance,
    required this.selectedDistance,
  });

  final int distance;
  final ValueNotifier<int> selectedDistance;

  @override
  Widget build(BuildContext context) {
    final isSelected = distance == selectedDistance.value;

    return Expanded(
      child: GestureDetector(
        onTap: () => selectedDistance.value = distance,
        child: Container(
          padding: EdgeInsets.symmetric(horizontal: 4.w, vertical: 10.h),
          clipBehavior: Clip.antiAlias,
          decoration: ShapeDecoration(
            color: isSelected ? const Color(0xFFF1F1FD) : null,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(6.r),
            ),
          ),
          child: Text(
            '${distance}km',
            textAlign: TextAlign.center,
            style: context.textTheme.bodyLarge?.copyWith(
              color: isSelected ? kBrightGreen : const Color(0xFFBDBDBD),
              fontSize: 16.sp,
              fontWeight: FontWeight.w500,
              letterSpacing: -0.10,
            ),
          ),
        ),
      ),
    );
  }
}
