import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';

class PrimaryRectangleButton extends StatelessWidget {
  const PrimaryRectangleButton({
    super.key,
    this.onTap,
    required this.text,
  });

  final VoidCallback? onTap;
  final String text;

  @override
  Widget build(BuildContext context) {
    final roundedRectangleBorder = RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(4.17.r),
    );

    return Material(
      child: InkWell(
        onTap: onTap,
        customBorder: roundedRectangleBorder,
        child: Ink(
          height: 29.17.h,
          padding: EdgeInsets.symmetric(
            horizontal: 12.50.w,
            vertical: 4.17.h,
          ),
          decoration: ShapeDecoration(
            color: kDarkPrimaryColor,
            shape: roundedRectangleBorder,
          ),
          child: Center(
            child: Text(
              text,
              style: context.textTheme.bodyMedium?.copyWith(
                color: Colors.white,
                fontSize: 12.50.sp,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
