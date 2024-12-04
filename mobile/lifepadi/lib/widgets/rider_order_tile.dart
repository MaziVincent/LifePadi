import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';

class RiderOrderTile extends StatelessWidget {
  const RiderOrderTile({
    super.key,
    required this.order,
    this.isMock = false,
  });

  final Order order;
  final bool isMock;

  @override
  Widget build(BuildContext context) {
    final isLogistics = order.type == CheckoutType.logistics;

    return GestureDetector(
      onTap: isMock
          ? null
          : () => context.go(RiderOrderDetailsRoute(id: order.id).location),
      child: Card(
        elevation: 2,
        child: Padding(
          padding: EdgeInsets.all(16.r),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Order #${order.orderId}',
                        style: context.textTheme.titleMedium?.copyWith(
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      4.verticalSpace,
                      Text(
                        isLogistics ? 'Logistics Delivery' : 'Cart Order',
                        style: context.textTheme.bodySmall?.copyWith(
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ),
                  OrderStatusWidget(status: order.status),
                ],
              ),
              16.verticalSpace,
              if (isLogistics)
                AddressRow(
                  icon: Icons.location_on,
                  title: 'Pickup Location',
                  address: order.pickupLocation?.address ?? 'No address',
                ),
              8.verticalSpace,
              AddressRow(
                icon: Icons.flag,
                title: isLogistics ? 'Drop-off Location' : 'Delivery Location',
                address: order.deliveryLocation!.address,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
