import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';

class PrimaryOutlineButton extends StatelessWidget {
  const PrimaryOutlineButton({
    super.key,
    this.onTap,
    required this.text,
  });

  final VoidCallback? onTap;
  final String text;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        height: 52.h,
        padding: EdgeInsets.symmetric(
          vertical: 16.h,
        ),
        decoration: ShapeDecoration(
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(40.r),
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
            Text(
              'Login',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                    color: kDarkPrimaryColor,
                    fontWeight: FontWeight.w600,
                    height: 0.07.r,
                    fontSize: 16.sp,
                    letterSpacing: -0.88.r,
                  ),
            ),
          ],
        ),
      ),
    );
  }
}
