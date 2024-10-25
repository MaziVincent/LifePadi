import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';

import 'order_status_widget.dart';

class OrderTile extends StatelessWidget {
  const OrderTile({
    super.key,
    required this.order,
    this.isMock = false,
  });

  final Order order;
  final bool isMock;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: isMock
          ? null
          : () => context.go(OrderDetailsRoute(id: order.id).location),
      child: Ink(
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
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Order no: #${order.orderId}',
                    style: context.textTheme.titleSmall?.copyWith(
                      fontSize: 14.sp,
                      fontWeight: FontWeight.w500,
                      color: const Color(0xFF27272A),
                    ),
                  ),
                  4.verticalSpace,
                  Text(
                    order.totalAmount.currency,
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
                    child: OrderStatusWidget(status: order.status),
                  ),
                ],
              ),
            ),
            Text(
              order.createdAt.readableDate,
              style: context.textTheme.bodySmall?.copyWith(
                color: const Color(0xFF7F7F89),
                fontSize: 13.sp,
                fontWeight: FontWeight.w400,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
