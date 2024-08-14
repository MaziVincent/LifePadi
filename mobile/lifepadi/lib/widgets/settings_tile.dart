import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/constants.dart';

class SettingsTile extends StatelessWidget {
  const SettingsTile({
    super.key,
    required this.title,
    required this.onTap,
  });

  final String title;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Ink(
        padding: EdgeInsets.only(
          top: 9.53.h,
          left: 9.w,
          right: 10.w,
          bottom: 8.53.h,
        ),
        decoration: const BoxDecoration(
          border: Border(
            bottom: BorderSide(color: kStrokeColor),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              title,
              style: Theme.of(context).textTheme.bodyLarge!.copyWith(
                    fontWeight: FontWeight.w600,
                    fontSize: 16.sp,
                    color: const Color(0xFF19202D),
                    letterSpacing: 0.32,
                  ),
            ),
            Icon(
              IconsaxPlusLinear.arrow_right_3,
              size: 28.r,
              color: const Color(0xFF808089),
            ),
          ],
        ),
      ),
    );
  }
}
