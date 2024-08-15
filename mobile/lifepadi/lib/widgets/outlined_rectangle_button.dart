import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/helpers.dart';

class OutlinedRectangleButton extends StatelessWidget {
  const OutlinedRectangleButton({
    super.key,
    this.onTap,
    required this.text,
  });

  final VoidCallback? onTap;
  final String text;

  @override
  Widget build(BuildContext context) {
    final roundedRectangleBorder = RoundedRectangleBorder(
      side: const BorderSide(width: 1.04, color: Color(0xFFD0D5DD)),
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
            color: Colors.white,
            shape: roundedRectangleBorder,
          ),
          child: Center(
            child: Text(
              text,
              style: context.textTheme.bodyMedium?.copyWith(
                color: const Color(0xFF475569),
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
