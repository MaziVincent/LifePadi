import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';

class LocationCard extends StatelessWidget {
  const LocationCard({
    super.key,
    required this.onTap,
    required this.place,
    required this.phoneNumber,
    this.isDefault = false,
    this.child,
    this.padding,
  });

  final VoidCallback onTap;
  final String place;
  final String phoneNumber;
  final bool isDefault;
  final Widget? child;
  final EdgeInsetsGeometry? padding;

  @override
  Widget build(BuildContext context) {
    final ShapeBorder roundedRectangleBorder = RoundedRectangleBorder(
      side: const BorderSide(color: kStrokeColor),
      borderRadius: BorderRadius.circular(8.r),
    );

    return InkWell(
      onTap: onTap,
      customBorder: roundedRectangleBorder,
      child: Ink(
        width: double.infinity,
        padding: padding ?? EdgeInsets.all(12.r),
        decoration: ShapeDecoration(
          shape: roundedRectangleBorder,
        ),
        child: Row(
          children: [
            Expanded(
              child: Row(
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
                        if (isDefault)
                          Text(
                            'Default',
                            style: context.textTheme.titleSmall?.copyWith(
                              color: kBrightGreen,
                              fontSize: 12.sp,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                      ].separatedBy(4.verticalSpace),
                    ),
                  ),
                ],
              ),
            ),
            child ?? Assets.icons.arrowRight.svg(width: 24.sp, height: 24.sp),
          ],
        ),
      ),
    );
  }
}
