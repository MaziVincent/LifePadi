import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/models/order_item.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/models/wallet.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class OrderDetailsContent extends StatelessWidget {
  const OrderDetailsContent({
    super.key,
    required this.order,
    required this.user,
  });

  final Order order;
  final User user;

  @override
  Widget build(BuildContext context) {
    // Create a map to group items by vendor
    final itemsByVendor = <String, List<OrderItem>>{};
    if (order.type == CheckoutType.cart) {
      for (final item in order.items) {
        final vendorName = item.product?.vendor.name ?? 'Unknown Vendor';
        itemsByVendor.putIfAbsent(vendorName, () => []).add(item);
      }
    }
    final paymentMethod = PaymentMethod(
      id: 2,
      name: 'Paystack',
      imagePath: Assets.icons.paystack.path,
      isDefault: false,
    );

    return SuperListView(
      padding: kHorizontalPadding.copyWith(top: 12.h),
      children: [
        /// Product info
        Padding(
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
                    Text(
                      order.createdAt.readableDate,
                      style: context.textTheme.bodySmall?.copyWith(
                        color: const Color(0xFF7F7F89),
                        fontSize: 11.sp,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ],
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

        /// Price info by vendors
        if (order.type == CheckoutType.cart)
          for (final vendor in itemsByVendor.entries) ...[
            SectionTitle(vendor.key),
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 8.h),
              child: Column(
                children: <Widget>[
                  for (final item in vendor.value)
                    PriceBreakdownItem(
                      title: item.name,
                      price: item.amount * item.quantity,
                      isFirst: vendor.value.first == item,
                      quantity: item.quantity,
                    ),
                ].separatedBy(const MyDivider()),
              ),
            ),
          ],

        if (order.type == CheckoutType.cart && user is Customer) ...[
          const SectionTitle(
            'Payment Summary',
            color: Color(0xFF27272A),
          ),
          CuteContainer(
            child: Column(
              children: [
                PriceBreakdownItem(
                  title: 'Sub total',
                  price: order.totalAmount - order.deliveryFee,
                  isFinal: true,
                ),
                PriceBreakdownItem(
                  title: 'Delivery Fee',
                  price: order.deliveryFee,
                  isFinal: true,
                ),
                PriceBreakdownItem(
                  title: 'Total',
                  price: order.totalAmount,
                  isFinal: true,
                ),
              ].separatedBy(const MyDivider()),
            ),
          ),
        ],

        // TODO: Show payment method

        /// Locations
        if (order.type == CheckoutType.logistics) ...[
          const SectionTitle(
            'Pickup Location',
            color: Color(0xFF27272A),
          ),
          LocationCard(
            address: order.pickupLocation?.address ?? 'No address',
            child: const SizedBox.shrink(),
          ),

          // Add Sender Information
          const SectionTitle(
            'Sender Information',
            color: Color(0xFF27272A),
          ),
          CuteContainer(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                if (order.logistics?.isNotEmpty ?? false) ...[
                  Text(
                    order.logistics!.first.senderName,
                    style: context.textTheme.titleMedium?.copyWith(
                      fontSize: 14.sp,
                      fontWeight: FontWeight.w600,
                      color: const Color(0xFF27272A),
                    ),
                  ),
                  4.verticalSpace,
                  GestureDetector(
                    onTap: () async => Clipboard.setData(
                      ClipboardData(text: order.logistics!.first.senderPhone),
                    ).then((_) async => showToast('Copied to clipboard')),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          order.logistics!.first.senderPhone,
                          style: context.textTheme.bodyMedium?.copyWith(
                            fontSize: 14.sp,
                            color: const Color(0xFF7F7F89),
                          ),
                        ),
                        SizedBox(width: 4.w),
                        Icon(
                          Remix.file_copy_line,
                          size: 16.sp,
                          color: const Color(0xFF7F7F89),
                        ),
                      ],
                    ),
                  ),
                ],
              ],
            ),
          ),

          // Add Item Details
          if (order.logistics?.isNotEmpty ?? false) ...[
            const SectionTitle(
              'Item Details',
              color: Color(0xFF27272A),
            ),
            CuteContainer(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    order.logistics!.first.item,
                    style: context.textTheme.titleMedium?.copyWith(
                      fontSize: 14.sp,
                      fontWeight: FontWeight.w600,
                      color: const Color(0xFF27272A),
                    ),
                  ),
                  if (order.logistics!.first.description != null) ...[
                    4.verticalSpace,
                    Text(
                      order.logistics!.first.description!,
                      style: context.textTheme.bodyMedium?.copyWith(
                        fontSize: 14.sp,
                        color: const Color(0xFF7F7F89),
                      ),
                    ),
                  ],
                  if (order.logistics!.first.weight != null) ...[
                    4.verticalSpace,
                    Text(
                      'Weight: ${order.logistics!.first.weight}kg',
                      style: context.textTheme.bodyMedium?.copyWith(
                        fontSize: 14.sp,
                        color: const Color(0xFF7F7F89),
                      ),
                    ),
                  ],
                  4.verticalSpace,
                  Text(
                    'Fragile: ${order.logistics!.first.fragile ? 'Yes' : 'No'}',
                    style: context.textTheme.bodyMedium?.copyWith(
                      fontSize: 14.sp,
                      color: const Color(0xFF7F7F89),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
        SectionTitle(
          order.type == CheckoutType.cart
              ? 'Delivery Location'
              : 'Drop-off Location',
          color: const Color(0xFF27272A),
        ),
        LocationCard(
          address: order.deliveryLocation!.address,
          child: const SizedBox.shrink(),
        ),

        // Display customer information for cart orders
        if (order.type == CheckoutType.cart &&
            user is Rider &&
            order.customer != null) ...[
          const SectionTitle(
            'Receiver Information',
            color: Color(0xFF27272A),
          ),
          CuteContainer(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  order.customer!.name,
                  style: context.textTheme.titleMedium?.copyWith(
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w600,
                    color: const Color(0xFF27272A),
                  ),
                ),
                4.verticalSpace,
                GestureDetector(
                  onTap: () async => Clipboard.setData(
                    ClipboardData(text: order.customer!.phoneNumber),
                  ).then((_) async => showToast('Copied to clipboard')),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        order.customer!.phoneNumber,
                        style: context.textTheme.bodyMedium?.copyWith(
                          fontSize: 14.sp,
                          color: const Color(0xFF7F7F89),
                        ),
                      ),
                      SizedBox(width: 4.w),
                      Icon(
                        Remix.file_copy_line,
                        size: 16.sp,
                        color: const Color(0xFF7F7F89),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],

        if (order.type == CheckoutType.logistics &&
            order.logistics?.isNotEmpty == true) ...[
          const SectionTitle(
            'Receiver Information',
            color: Color(0xFF27272A),
          ),
          CuteContainer(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  order.logistics!.first.receiverName,
                  style: context.textTheme.titleMedium?.copyWith(
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w600,
                    color: const Color(0xFF27272A),
                  ),
                ),
                4.verticalSpace,
                GestureDetector(
                  onTap: () async => Clipboard.setData(
                    ClipboardData(text: order.logistics!.first.receiverPhone),
                  ).then((_) async => showToast('Copied to clipboard')),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        order.logistics!.first.receiverPhone,
                        style: context.textTheme.bodyMedium?.copyWith(
                          fontSize: 14.sp,
                          color: const Color(0xFF7F7F89),
                        ),
                      ),
                      SizedBox(width: 4.w),
                      Icon(
                        Remix.file_copy_line,
                        size: 16.sp,
                        color: const Color(0xFF7F7F89),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Add Delivery Fee
          const SectionTitle(
            'Delivery Fee',
            color: Color(0xFF27272A),
          ),
          CuteContainer(
            child: Text(
              '₦${order.deliveryFee}',
              style: context.textTheme.titleMedium?.copyWith(
                fontSize: 16.sp,
                fontWeight: FontWeight.w600,
                color: const Color(0xFF27272A),
              ),
            ),
          ),
        ],

        /// Payment method
        // TODO: Show payment method here
        const SectionTitle('Payment Method'),
        PaymentMethodInfo(
          name: paymentMethod.name,
          imagePath: paymentMethod.imagePath,
          id: paymentMethod.id,
          isDefault: paymentMethod.isDefault,
        ),

        10.verticalSpace,
        182.verticalSpace,
      ].separatedBy(14.verticalSpace),
    );
  }
}
