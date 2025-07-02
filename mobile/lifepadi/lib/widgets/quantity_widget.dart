import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/extensions.dart';

class QuantityWidget extends StatelessWidget {
  const QuantityWidget({
    super.key,
    required this.onDecrement,
    required this.quantity,
    required this.onIncrement,
  });

  final VoidCallback onDecrement;
  final int quantity;
  final VoidCallback onIncrement;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        /// Decrement button
        InkWell(
          onTap: quantity == 1 ? null : onDecrement,
          child: Ink(
            width: 40.h,
            height: 40.h,
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border.all(
                color: const Color(0xFFDCDCE2),
              ),
              borderRadius: BorderRadius.circular(4.r),
            ),
            child: const Icon(IconsaxPlusLinear.minus),
          ),
        ),

        /// Input value
        Container(
          width: 40.h,
          height: 40.h,
          alignment: Alignment.center,
          decoration: BoxDecoration(
            border: Border.all(
              color: const Color(0xFFDCDCE2),
            ),
            borderRadius: BorderRadius.circular(4.r),
          ),
          child: Text(
            '$quantity',
            style: context.textTheme.bodyMedium?.copyWith(
              color: const Color(0xFF27272A),
              fontSize: 16.sp,
              fontWeight: FontWeight.w400,
            ),
          ),
        ),

        /// Increment button
        InkWell(
          onTap: onIncrement,
          child: Ink(
            width: 40.h,
            height: 40.h,
            decoration: BoxDecoration(
              border: Border.all(
                color: const Color(0xFFDCDCE2),
              ),
              borderRadius: BorderRadius.circular(4.r),
            ),
            child: const Icon(IconsaxPlusLinear.add),
          ),
        ),
      ].separatedBy(4.horizontalSpace),
    );
  }
}
