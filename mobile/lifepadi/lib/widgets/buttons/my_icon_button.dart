import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class MyIconButton extends StatelessWidget {
  const MyIconButton({
    super.key,
    required this.onPressed,
    this.backgroundColor,
    this.iconColor,
    this.icon,
    this.iconWidget,
  }) : assert(
          icon != null || iconWidget != null,
          'Icon Widget or IconData must be provided',
        );

  final IconData? icon;
  final VoidCallback onPressed;
  final Color? backgroundColor;
  final Color? iconColor;
  final Widget? iconWidget;

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: onPressed,
      icon: iconWidget ??
          Icon(
            icon,
            color: iconColor,
          ),
      padding: const EdgeInsets.all(8).r,
      style: IconButton.styleFrom(
        backgroundColor: backgroundColor ?? const Color(0xFFF5F5F5),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4.r),
        ),
        fixedSize: Size.square(34.h),
      ),
      iconSize: 20.sp,
    );
  }
}
