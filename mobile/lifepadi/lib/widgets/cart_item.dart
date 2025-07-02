import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/quantity_widget.dart';
import 'package:remixicon/remixicon.dart';

class CartItem extends StatelessWidget {
  const CartItem({
    super.key,
    required this.image,
    required this.price,
    required this.name,
    required this.quantity,
    required this.onIncrement,
    required this.onDecrement,
    required this.onRemove,
    required this.vendorName,
  });

  final ImageProvider image;
  final double price;
  final String name;
  final int quantity;
  final VoidCallback onIncrement;
  final VoidCallback onDecrement;
  final VoidCallback onRemove;
  final String vendorName;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: kStrokeColor,
          ),
        ),
      ),
      padding: EdgeInsets.only(bottom: 12.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 48.h,
            height: 48.h,
            decoration: ShapeDecoration(
              image: DecorationImage(
                image: image,
                fit: BoxFit.fill,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8.r),
              ),
            ),
          ),
          12.horizontalSpace,
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: context.textTheme.titleSmall?.copyWith(
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w500,
                    color: const Color(0xFF27272A),
                  ),
                ),
                Text(
                  vendorName,
                  style: context.textTheme.bodySmall?.copyWith(
                    color: const Color(0xFF7F7F89),
                    fontSize: 10.sp,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                4.verticalSpace,
                Text(
                  price.currency,
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFF27272A),
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                8.verticalSpace,
                QuantityWidget(
                  onDecrement: onDecrement,
                  quantity: quantity,
                  onIncrement: onIncrement,
                ),
              ],
            ),
          ),
          12.horizontalSpace,
          InkWell(
            onTap: onRemove,
            child: Ink(
              width: 24.h,
              height: 24.h,
              decoration: BoxDecoration(
                border: Border.all(
                  color: const Color(0xFFDCDCE2),
                ),
                borderRadius: BorderRadius.circular(4.r),
              ),
              child: Icon(
                Remix.close_large_fill,
                size: 13.33.sp,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
