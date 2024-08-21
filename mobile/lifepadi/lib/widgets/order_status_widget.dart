import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/order_tile.dart';

class OrderStatusWidget extends StatelessWidget {
  const OrderStatusWidget({
    super.key,
    required this.status,
  });

  final OrderStatus status;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: switch (status) {
        OrderStatus.pending => [
            Text(
              'Pending',
              style: context.textTheme.bodySmall?.copyWith(
                color: const Color(0xFFD98404),
                fontSize: 12.sp,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        OrderStatus.ongoing => [
            SizedBox(
              height: 16.h,
              width: 16.w,
              child: const CircularProgressIndicator(
                backgroundColor: Color(0xFFF0CE9B),
                color: Color(0xFFD98404),
                strokeWidth: 2,
              ),
            ),
            8.horizontalSpace,
            Text(
              'ongoing',
              style: context.textTheme.bodySmall?.copyWith(
                color: const Color(0xFFD98404),
                fontSize: 12.sp,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        OrderStatus.completed => [
            Text(
              'Completed',
              style: context.textTheme.bodySmall?.copyWith(
                color: kDarkPrimaryColor,
                fontSize: 12.sp,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        OrderStatus.canceled => [
            Text(
              'Canceled',
              style: context.textTheme.bodySmall?.copyWith(
                color: const Color(0xFFF52311),
                fontSize: 12.sp,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
      },
    );
  }
}
