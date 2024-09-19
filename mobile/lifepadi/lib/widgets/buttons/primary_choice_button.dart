import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';

class PrimaryChoiceButton extends StatelessWidget {
  const PrimaryChoiceButton({
    super.key,
    required this.onPressed,
    required this.text,
  });

  final VoidCallback? onPressed;
  final String text;

  @override
  Widget build(BuildContext context) {
    final textTheme = context.textTheme;
    final ShapeBorder roundedRectangleBorder = RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(8.r),
    );

    return Material(
      color: Colors.transparent,
      shape: roundedRectangleBorder,
      child: InkWell(
        onTap: onPressed,
        customBorder: roundedRectangleBorder,
        child: Ink(
          width: double.infinity,
          height: 42.h,
          decoration: ShapeDecoration(
            color: kDarkPrimaryColor,
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
                  fontWeight: FontWeight.w500,
                  fontSize: 14.sp,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
