import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';

class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    super.key,
    required this.onPressed,
    required this.text,
    this.icon,
    this.iconWidget,
    this.radius,
    this.fontSize,
    this.textStyle,
  });

  final VoidCallback? onPressed;
  final String text;
  final IconData? icon;
  final Widget? iconWidget;
  final double? radius, fontSize;
  final TextStyle? textStyle;

  @override
  Widget build(BuildContext context) {
    final textTheme = context.textTheme;
    final ShapeBorder roundedRectangleBorder = RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(radius ?? 40.r),
    );
    final hasIcon = icon != null || iconWidget != null;

    return Material(
      color: Colors.transparent,
      shape: roundedRectangleBorder,
      child: Opacity(
        opacity: onPressed == null ? 0.5 : 1.0,
        child: InkWell(
          onTap: onPressed,
          customBorder: roundedRectangleBorder,
          child: Ink(
            width: double.infinity,
            height: 52.h,
            decoration: ShapeDecoration(
              gradient: const LinearGradient(
                colors: [kDarkPrimaryColor, kLightPrimaryColor],
                stops: [0.125, 1.0],
              ),
              shape: roundedRectangleBorder,
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
                        textTheme.bodyLarge?.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                          fontSize: fontSize ?? 16.sp,
                          letterSpacing: -0.88.r,
                        ),
                  ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
