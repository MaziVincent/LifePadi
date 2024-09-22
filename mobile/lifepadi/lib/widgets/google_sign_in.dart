import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class GoogleSignIn extends StatelessWidget {
  const GoogleSignIn({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20).w,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Expanded(
                child: MyDivider(
                  color: Color(0xFFC2C8D0),
                ),
              ),
              13.01.horizontalSpace,
              Text(
                'OR',
                style: GoogleFonts.roboto(
                  color: const Color(0xFF2D333A),
                  fontSize: 9.76.sp,
                  fontWeight: FontWeight.w400,
                  letterSpacing: 0.33.r,
                ),
              ),
              13.01.horizontalSpace,
              const Expanded(
                child: MyDivider(
                  color: Color(0xFFC2C8D0),
                ),
              ),
            ],
          ),
        ),
        16.verticalSpace,
        Container(
          width: double.infinity,
          height: 41.15.h,
          margin: const EdgeInsets.symmetric(horizontal: 28).w,
          padding: const EdgeInsets.symmetric(vertical: 10.57).h,
          decoration: ShapeDecoration(
            color: Colors.white,
            shape: RoundedRectangleBorder(
              side: const BorderSide(
                width: 0.81,
                color: Color(0xFFC2C8D0),
              ),
              borderRadius: BorderRadius.circular(44),
            ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Assets.icons.google.svg(
                width: 16.27.r,
                height: 16.27.r,
              ),
              9.76.horizontalSpace,
              Text(
                'Continue with Google',
                style: context.textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF2D333A),
                  fontSize: 13.01.sp,
                  fontWeight: FontWeight.w500,
                  letterSpacing: 0.12.r,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
