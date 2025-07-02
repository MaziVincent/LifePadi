import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/constants.dart';

class AccountManagementTile extends StatelessWidget {
  const AccountManagementTile({
    super.key,
    required this.name,
    this.child,
    this.onTap,
  });

  final String name;
  final Widget? child;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: EdgeInsets.symmetric(
          horizontal: 20.w,
          vertical: child == null ? 10.64.h : 5.h,
        ),
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
                      color: const Color(0xFF1A202E),
                      fontSize: 16.sp,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  if (child == null)
                    Icon(
                      IconsaxPlusLinear.arrow_right_3,
                      size: 18.sp,
                      color: kLightPrimaryColor,
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
