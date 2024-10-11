import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:remixicon/remixicon.dart';

class ProfileImageAndLocation extends StatelessWidget {
  const ProfileImageAndLocation({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        16.verticalSpace,
        SizedBox(
          height: 130.h,
          width: 125.w,
          child: Stack(
            alignment: Alignment.center,
            children: [
              Container(
                height: 120.h,
                width: 120.h,
                decoration: BoxDecoration(
                  // ?color: Necessary because the image could be NetworkImage.
                  color: const Color(0xFFB9B9B9),
                  shape: BoxShape.circle,
                  image: DecorationImage(
                    image: Assets.images.profileAvatar.provider(),
                    fit: BoxFit.fill,
                  ),
                ),
              ),
              Align(
                alignment: Alignment.bottomRight,
                child: Container(
                  height: 46.h,
                  width: 46.h,
                  decoration: const ShapeDecoration(
                    color: Color(0xFFF5F5F5),
                    shape: CircleBorder(
                      side: BorderSide(
                        color: Colors.white,
                        width: 5,
                      ),
                    ),
                  ),
                  child: Icon(
                    IconsaxPlusLinear.gallery_edit,
                    size: 24.r,
                    color: const Color(0xFF464646),
                  ),
                ),
              ),
            ],
          ),
        ),
        12.verticalSpace,
        Text(
          'Tobechi Jacobs',
          style: context.textTheme.bodyLarge?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.w600,
            fontSize: 20.sp,
            letterSpacing: -0.24,
          ),
        ),
        4.verticalSpace,
        Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Remix.map_pin_5_line,
              size: 18.r,
              color: kStrokeColor,
            ),
            4.horizontalSpace,
            GestureDetector(
              onTap: () {
                // TODO: Open location update bottom sheet.
              },
              child: Text(
                'Soja, Lekki, Lagos',
                style: context.textTheme.bodySmall?.copyWith(
                  color: kStrokeColor,
                  fontWeight: FontWeight.w400,
                  fontSize: 12.sp,
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }
}
