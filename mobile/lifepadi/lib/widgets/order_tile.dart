import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';

import 'order_status_widget.dart';

enum OrderStatus {
  pending,
  ongoing,
  completed,
  canceled,
}

class OrderTile extends StatelessWidget {
  const OrderTile({
    super.key,
    required this.status,
  });

  final OrderStatus status;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => context.go(const OrderDetailsRoute(id: 1).location),
      child: Container(
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
                  image: Assets.images.bnbBlender.provider(),
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
                    'BNB Blender',
                    style: context.textTheme.titleSmall?.copyWith(
                      fontSize: 14.sp,
                      fontWeight: FontWeight.w500,
                      color: const Color(0xFF27272A),
                    ),
                  ),
                  Text(
                    '04-05-2024',
                    style: context.textTheme.bodySmall?.copyWith(
                      color: const Color(0xFF7F7F89),
                      fontSize: 10.sp,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  4.verticalSpace,
                  Text(
                    'Order no: #787654JK',
                    style: context.textTheme.bodySmall?.copyWith(
                      color: const Color(0xFF27272A),
                      fontSize: 12.sp,
                      fontWeight: FontWeight.w400,
                    ),
                  ),
                  4.verticalSpace,
                  Text(
                    5000.currency,
                    style: context.textTheme.bodyMedium?.copyWith(
                      color: const Color(0xFF27272A),
                      fontSize: 14.sp,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  Container(
                    height: 30.h,
                    clipBehavior: Clip.antiAlias,
                    decoration: ShapeDecoration(
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(4.r),
                        side: const BorderSide(
                          color: Color(0xFFCCCCCC),
                        ),
                      ),
                    ),
                    padding: EdgeInsets.symmetric(
                      horizontal: 12.w,
                      vertical: 3.h,
                    ),
                    margin: EdgeInsets.only(top: 8.h),
                    child: OrderStatusWidget(status: status),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
