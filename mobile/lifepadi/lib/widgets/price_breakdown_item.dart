import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/extensions.dart';

class PriceBreakdownItem extends StatelessWidget {
  const PriceBreakdownItem({
    super.key,
    required this.title,
    required this.price,
    this.isFirst = false,
    this.isFinal = false,
    this.quantity = 0,
    this.isLoading = false,
    this.error,
  });

  final String title;
  final double price;
  final bool isFirst, isFinal;
  final int quantity;
  final bool isLoading;
  final String? error;

  @override
  Widget build(BuildContext context) {
    final fontWeight = isFinal ? FontWeight.w700 : FontWeight.w500;

    return Padding(
      padding:
          EdgeInsets.only(top: isFirst ? 0 : 8.h, bottom: isFinal ? 0 : 8.h),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            '$title ${quantity > 0 ? 'x$quantity' : ''}',
            style: TextStyle(
              color: const Color(0xFF27272A),
              fontSize: 14.sp,
              fontWeight: fontWeight,
            ),
          ),
          if (isLoading)
            SizedBox(
              width: 20.w,
              height: 20.h,
              child: const CircularProgressIndicator(
                strokeWidth: 2,
              ),
            )
          else if (error != null)
            Text(
              error!,
              style: TextStyle(
                color: Colors.red,
                fontSize: 12.sp,
                fontWeight: FontWeight.w400,
              ),
            )
          else
            Text(
              price.currency,
              style: TextStyle(
                color: const Color(0xFF27272A),
                fontSize: isFinal ? 17.sp : 14.sp,
                fontWeight: fontWeight,
              ),
            ),
        ],
      ),
    );
  }
}
