import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconsax_plus/iconsax_plus.dart';

class SettingTile extends StatelessWidget {
  const SettingTile({
    super.key,
    required this.name,
    this.child,
    this.onTap,
    this.textColor = const Color(0xFF19202D),
  });

  final String name;
  final Widget? child;
  final VoidCallback? onTap;
  final Color textColor;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.symmetric(
          horizontal: 9.w,
          vertical: child == null ? 10.h : 5.h,
        ).copyWith(right: 6.42.w),
        decoration: BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: const Color(0xFFF9F9FF),
              width: 1.21.h,
            ),
          ),
        ),
        child: Row(
          children: [
            Expanded(
              child: Wrap(
                alignment: WrapAlignment.spaceBetween,
                crossAxisAlignment: WrapCrossAlignment.center,
                spacing: 10.w,
                runSpacing: 5.h,
                runAlignment: WrapAlignment.spaceBetween,
                children: [
                  Text(
                    name,
                    style: TextStyle(
                      color: textColor,
                      fontSize: 16.sp,
                      fontWeight: FontWeight.w600,
                      letterSpacing: 0.32,
                    ),
                  ),
                  if (child == null)
                    Icon(
                      IconsaxPlusLinear.arrow_right_3,
                      size: 28.93.sp,
                      color: const Color(0xFF808089),
                    )
                  else
                    child!,
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
