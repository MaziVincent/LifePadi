import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/extensions.dart';

class PaymentPrice extends StatelessWidget {
  const PaymentPrice({
    super.key,
    required this.title,
    required this.amount,
    this.description,
  });

  final String title;
  final double amount;
  final String? description;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 4.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: context.textTheme.bodyMedium?.copyWith(
              color: const Color(0xFF7F7F89),
              fontSize: 14.sp,
              fontWeight: FontWeight.w400,
            ),
          ),
          Row(
            children: [
              Text(
                amount.currency,
                style: context.textTheme.bodyLarge?.copyWith(
                  fontSize: 18.sp,
                  color: const Color(0xFF27272A),
                  fontWeight: FontWeight.w700,
                ),
              ),
              4.horizontalSpace,
              if (description != null)
                Tooltip(
                  message: description,
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
