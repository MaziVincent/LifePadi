import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/helpers.dart';

class LocationCard extends StatelessWidget {
  const LocationCard({
    super.key,
    required this.onTap,
    required this.place,
    required this.phoneNumber,
  });

  final VoidCallback onTap;
  final String place;
  final String phoneNumber;

  @override
  Widget build(BuildContext context) {
    final ShapeBorder roundedRectangleBorder = RoundedRectangleBorder(
      side: const BorderSide(color: Color(0xFFEBEBF0)),
      borderRadius: BorderRadius.circular(8.r),
    );

    return InkWell(
      onTap: onTap,
      customBorder: roundedRectangleBorder,
      child: Ink(
        width: double.infinity,
        padding: const EdgeInsets.all(12).r,
        decoration: ShapeDecoration(
          shape: roundedRectangleBorder,
        ),
        child: Row(
          children: [
            Expanded(
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Assets.icons.location.svg(width: 24.r, height: 24.r),
                  8.horizontalSpace,
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Door Delivery',
                          style: context.textTheme.titleMedium?.copyWith(
                            fontSize: 12.sp,
                            fontWeight: FontWeight.w400,
                            color: const Color(0xFF7F7F89),
                          ),
                        ),
                        Text(
                          place,
                          style: context.textTheme.titleMedium?.copyWith(
                            fontSize: 14.sp,
                            fontWeight: FontWeight.w700,
                            color: const Color(0xFF27272A),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        Text(
                          'Phone • $phoneNumber',
                          style: context.textTheme.titleMedium?.copyWith(
                            fontSize: 14.sp,
                            fontWeight: FontWeight.w400,
                            color: const Color(0xFF27272A),
                          ),
                        ),
                      ].separatedBy(4.verticalSpace),
                    ),
                  ),
                ],
              ),
            ),
            Assets.icons.arrowRight.svg(width: 24.sp, height: 24.sp),
          ],
        ),
      ),
    );
  }
}
