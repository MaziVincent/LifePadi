import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';

class PrimaryOutlineButton extends StatelessWidget {
  const PrimaryOutlineButton({
    super.key,
    this.onPressed,
    required this.text,
    this.iconColor = kDarkPrimaryColor,
    this.icon,
    this.textStyle,
    this.height,
  });

  final VoidCallback? onPressed;
  final String text;
  final Color iconColor;
  final IconData? icon;
  final TextStyle? textStyle;
  final double? height;

  @override
  Widget build(BuildContext context) {
    final roundedRectangleBorder = RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(40.r),
    );

    return Material(
      color: Colors.transparent,
      shape: roundedRectangleBorder,
      child: InkWell(
        onTap: onPressed,
        customBorder: roundedRectangleBorder,
        child: Ink(
          width: double.infinity,
          height: height,
          padding: EdgeInsets.symmetric(
            vertical: 16.h,
          ),
          decoration: ShapeDecoration(
            color: Colors.white,
            shape: roundedRectangleBorder.copyWith(
              side: BorderSide(
                color: const Color(0xFFF0F5FA),
                width: 2.r,
              ),
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              if (icon != null)
                Icon(
                  icon,
                  size: 24.r,
                  color: iconColor,
                ),
              if (icon != null) 6.horizontalSpace,
              Text(
                text,
                style: textStyle ??
                    context.textTheme.bodyLarge?.copyWith(
                      color: kDarkPrimaryColor,
                      fontWeight: FontWeight.w600,
                      fontSize: 16.sp,
                      letterSpacing: -0.88.r,
                      height: 0.07.r,
                    ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
