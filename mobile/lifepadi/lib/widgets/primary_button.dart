import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';

class PrimaryButton extends StatelessWidget {
  const PrimaryButton({
    super.key,
    this.onPressed,
    required this.text,
  });

  final VoidCallback? onPressed;
  final String text;

  @override
  Widget build(BuildContext context) {
    final textTheme = context.textTheme;

    final ShapeBorder roundedRectangleBorder = RoundedRectangleBorder(
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
          height: 52.h,
          padding: EdgeInsets.symmetric(
            vertical: 16.h,
          ),
          decoration: ShapeDecoration(
            gradient: const LinearGradient(
              begin: Alignment.centerRight,
              end: Alignment.centerLeft,
              colors: [kDarkPrimaryColor, kLightPrimaryColor],
            ),
            shape: roundedRectangleBorder,
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                text,
                style: textTheme.bodyLarge?.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                  height: 0.07.r,
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
