import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';

class Logo extends StatelessWidget {
  const Logo({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Assets.images.logoDark.image(
          width: 32.w,
          height: 39.96.h,
        ),
        8.horizontalSpace,
        Text.rich(
          TextSpan(
            children: [
              TextSpan(
                text: 'Life',
                style: GoogleFonts.montserrat(
                  color: const Color(0xFF263238),
                  fontSize: 36.sp,
                  fontWeight: FontWeight.w900,
                  letterSpacing: -0.36.r,
                ),
              ),
              TextSpan(
                text: 'padi',
                style: GoogleFonts.montserrat(
                  color: kLightPrimaryColor,
                  fontSize: 36.sp,
                  fontWeight: FontWeight.w900,
                  letterSpacing: -0.36.r,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
