import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/helpers.dart';

class CategoryTab extends StatelessWidget {
  const CategoryTab({
    super.key,
    this.isActive = false,
    required this.name,
    required this.onTap,
  });

  final bool isActive;
  final String name;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 42.41.h,
        decoration: ShapeDecoration(
          color: isActive ? const Color(0x0F8662FF) : Colors.white,
          shape: RoundedRectangleBorder(
            side: BorderSide(
              width: 0.69.r,
              color: const Color(0xFFBAC2D6),
            ),
            borderRadius: BorderRadius.circular(4.16.r),
          ),
        ),
        padding: EdgeInsets.symmetric(horizontal: 20.8.w),
        child: Center(
          child: Text(
            name.toUpperCase(),
            style: context.textTheme.bodySmall?.copyWith(
              color:
                  isActive ? const Color(0xFFFDAA06) : const Color(0xFF19202D),
              fontSize: 12.sp,
              fontWeight: FontWeight.w500,
              letterSpacing: -0.24,
            ),
          ),
        ),
      ),
    );
  }
}
