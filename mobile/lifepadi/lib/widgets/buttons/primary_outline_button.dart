import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';

class PrimaryOutlineButton extends StatelessWidget {
  const PrimaryOutlineButton({
    super.key,
    required this.onPressed,
    required this.text,
    this.iconColor = kDarkPrimaryColor,
    this.icon,
    this.textStyle,
    this.iconWidget,
  });

  final VoidCallback? onPressed;
  final String text;
  final Color iconColor;
  final IconData? icon;
  final TextStyle? textStyle;
  final Widget? iconWidget;

  @override
  Widget build(BuildContext context) {
    final roundedRectangleBorder = RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(40.r),
    );
    final hasIcon = icon != null || iconWidget != null;

    return Material(
      color: Colors.transparent,
      shape: roundedRectangleBorder,
      child: InkWell(
        onTap: onPressed,
        customBorder: roundedRectangleBorder,
        child: Ink(
          width: double.infinity,
          height: 52.h,
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
              if (hasIcon) ...[
                iconWidget ??
                    Icon(
                      icon,
                      size: 24.r,
                      color: Colors.white,
                    ),
                if (text != '') 6.horizontalSpace,
              ],
              if (text != '')
                Text(
                  text,
                  style: textStyle ??
                      context.textTheme.bodyLarge?.copyWith(
                        color: kDarkPrimaryColor,
                        fontWeight: FontWeight.w600,
                        fontSize: 16.sp,
                        letterSpacing: -0.88.r,
                      ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
