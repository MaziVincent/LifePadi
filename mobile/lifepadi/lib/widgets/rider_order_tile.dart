import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/models/order_item.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';

class RiderOrderTile extends StatelessWidget {
  const RiderOrderTile({super.key, required this.order});

  final Order order;

  @override
  Widget build(BuildContext context) {
    final isLogistics = order.type == CheckoutType.logistics;

    // Group items by vendor
    final vendorItemsMap = <int, List<OrderItem>>{};
    for (final item in order.items) {
      if (item.product?.vendor != null) {
        final vendorId = item.product!.vendor.id;
        vendorItemsMap.putIfAbsent(vendorId, () => []).add(item);
      }
    }

    return Card(
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
                      isLogistics
                          ? 'Logistics Delivery'
                          : '${vendorItemsMap.length} ${'vendor'.pluralize(vendorItemsMap.length)}',
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
            if (isLogistics) ...[
              AddressRow(
                icon: Icons.location_on,
                title: 'Pickup Location',
                address: order.pickupLocation?.address ?? 'No address',
              ),
              8.verticalSpace,
              AddressRow(
                icon: Icons.flag,
                title: 'Drop-off Location',
                address: order.deliveryLocation?.address ?? 'No address',
              ),
            ] else ...[
              ...vendorItemsMap.entries.map((entry) {
                final items = entry.value;
                final vendor = items.first.product?.vendor;
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    AddressRow(
                      icon: Icons.store,
                      title: vendor?.name ?? 'Unknown Vendor',
                      address: vendor?.address.address ?? 'No address',
                    ),
                    8.verticalSpace,
                    Padding(
                      padding: EdgeInsets.only(left: 28.w),
                      child: Text(
                        '${items.length} ${'item'.pluralize(items.length)}',
                        style: context.textTheme.bodySmall?.copyWith(
                          color: Colors.grey,
                        ),
                      ),
                    ),
                    16.verticalSpace,
                  ],
                );
              }),
            ],
          ],
        ),
      ),
    );
  }
}
