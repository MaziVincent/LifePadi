import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/helpers.dart';

class CartDiscount extends StatelessWidget {
  const CartDiscount({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
      child: Row(
        children: [
          Assets.icons.voucher.svg(width: 24.r, height: 24.r),
          10.horizontalSpace,
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Discount voucher',
                  style: context.textTheme.bodyLarge?.copyWith(
                    color: const Color(0xFF27272A),
                    fontSize: 16.sp,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                4.verticalSpace,
                Text(
                  'Enter voucher code',
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFF7F7F89),
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w400,
                  ),
                ),
              ],
            ),
          ),
          Row(
            children: [
              Padding(
                padding: EdgeInsets.only(left: 8.w),
                child: Text(
                  '0.00',
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFF27272A),
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
              4.horizontalSpace,
              Assets.icons.arrowRight.svg(
                width: 24.sp,
                height: 24.sp,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
