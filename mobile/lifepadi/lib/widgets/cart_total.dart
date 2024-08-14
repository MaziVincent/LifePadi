import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/helpers.dart';

class CartTotal extends StatelessWidget {
  const CartTotal({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Total',
            style: context.textTheme.bodyMedium?.copyWith(
              color: const Color(0xFF7F7F89),
              fontSize: 14.sp,
              fontWeight: FontWeight.w400,
            ),
          ),
          Row(
            children: [
              Text(
                formatCurrency.format(43000),
                style: context.textTheme.bodyLarge?.copyWith(
                  fontSize: 24.sp,
                  color: const Color(0xFF27272A),
                  fontWeight: FontWeight.w700,
                ),
              ),
              4.horizontalSpace,
              Tooltip(
                message:
                    'This is the total amount of all the items in your cart including the delivery fee and any other charges.',
                showDuration: 2.seconds,
                triggerMode: TooltipTriggerMode.tap,
                verticalOffset: 20,
                child: Assets.icons.info.svg(
                  width: 16.sp,
                  height: 16.sp,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
