import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:remixicon/remixicon.dart';

class CartItem extends StatelessWidget {
  const CartItem({
    super.key,
    required this.image,
    required this.price,
    required this.name,
  });

  final ImageProvider<Object> image;
  final double price;
  final String name;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: Color(0xFFEBEBF0),
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
                  'Trader: Shoprite Stores',
                  style: context.textTheme.bodySmall?.copyWith(
                    color: const Color(0xFF7F7F89),
                    fontSize: 10.sp,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                4.verticalSpace,
                Text(
                  formatCurrency.format(price),
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFF27272A),
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                8.verticalSpace,
                Row(
                  children: [
                    /// Decrement button
                    InkWell(
                      onTap: () {
                        // TODO: Decrease item quantity
                      },
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
                        '1',
                        style: context.textTheme.bodyMedium?.copyWith(
                          color: const Color(0xFF27272A),
                          fontSize: 16.sp,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    ),

                    /// Increment button
                    InkWell(
                      onTap: () {
                        // TODO: Increase item quantity
                      },
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
                ),
                12.horizontalSpace,
              ],
            ),
          ),
          InkWell(
            onTap: () {
              // TODO: Remove item from cart
            },
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
