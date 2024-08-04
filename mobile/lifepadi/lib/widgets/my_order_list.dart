import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/widgets/order_tile.dart';

/// A list of orders.
class MyOrderList extends StatelessWidget {
  const MyOrderList({
    super.key,
    required this.status,
    required this.numberOfOrders,
  });

  final int numberOfOrders;
  final OrderStatus status;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 24),
      child: Column(
        children: [
          10.verticalSpace,
          Expanded(
            child: ListView.separated(
              itemCount: numberOfOrders,
              itemBuilder: (context, index) {
                return OrderTile(status: status);
              },
              separatorBuilder: (context, index) => 18.verticalSpace,
            ),
          ),
        ],
      ),
    );
  }
}
