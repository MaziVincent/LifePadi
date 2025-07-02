import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class MyOutlineIconButton extends StatelessWidget {
  const MyOutlineIconButton({
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
      padding: EdgeInsets.all(6.53.h),
      style: IconButton.styleFrom(
        backgroundColor: backgroundColor ?? Colors.white,
        shape: RoundedRectangleBorder(
          side: const BorderSide(
            width: 1.63,
            color: Color(0xFFD0D0D0),
          ),
          borderRadius: BorderRadius.circular(6.53.r),
        ),
        fixedSize: Size.square(39.20.h),
      ),
      iconSize: 26.13.sp,
    );
  }
}
