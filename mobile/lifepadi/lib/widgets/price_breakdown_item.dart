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
  });

  final String title;
  final double price;
  final bool isFirst, isFinal;
  final int quantity;

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
