import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/orders.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

import '../utils/constants.dart';

class OrderDetailsPage extends ConsumerWidget {
  const OrderDetailsPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final order = ref.watch(orderProvider(id));
    final user = ref.watch(authControllerProvider);

    return Scaffold(
      appBar: MyAppBar(
        title: 'Order Details',
        actions: [
          switch (user) {
            AsyncData(:final value) => value is Customer
                ? MyIconButton(
                    icon: Remix.more_2_fill,
                    onPressed: () {
                      showMenu(
                        context: context,
                        position: RelativeRect.fromLTRB(100.w, 0, 0, 0),
                        color: Colors.white,
                        items: [
                          PopupMenuItem<dynamic>(
                            child: Text(
                              'View Receipt',
                              style: context.textTheme.bodyMedium?.copyWith(
                                fontSize: 14.sp,
                                color: const Color(0xFF27272A),
                              ),
                            ),
                            onTap: () => context
                                .push(ReceiptRoute(orderId: id).location),
                          ),
                        ],
                      );
                    },
                  )
                : const SizedBox.shrink(),
            _ => const SizedBox.shrink(),
          },
        ],
      ),
      body: Stack(
        children: [
          switch (order) {
            AsyncError(:final error) => Center(
                child: Text(
                  error.toString(),
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFF27272A),
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w400,
                  ),
                ),
              ),
            AsyncData(:final value) => _OrderDetailsContent(order: value),
            _ => const Center(child: GreenyLoadingWheel()),
          },
          switch (order) {
            AsyncError() => BottomPanel(
                height: 100.h,
                child: Column(
                  children: <Widget>[
                    PrimaryOutlineButton(
                      onPressed: () => ref.refresh(orderProvider(id).future),
                      text: 'Retry',
                    ),
                  ],
                ),
              ),
            AsyncData(:final value) => BottomPanel(
                height: 182.h,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    if (value.status == OrderStatus.pending) ...[
                      PrimaryButton(
                        onPressed: () {
                          // Implement Make Payment
                        },
                        text: 'Make Payment',
                      ),
                      PrimaryOutlineButton(
                        onPressed: () => {
                          // Implement Cancel Order
                        },
                        text: 'Cancel Order',
                      ),
                    ],
                    if (value.status == OrderStatus.ongoing ||
                        value.status == OrderStatus.completed)
                      PrimaryOutlineButton(
                        onPressed: () =>
                            context.push(TrackOrderRoute(id: id).location),
                        text: 'Track Order',
                      ),
                    if (canBuyAgain(value))
                      PrimaryButton(
                        onPressed: () {
                          // TODO: Implement Buy Again
                        },
                        text: 'Buy Again',
                      ),
                  ].separatedBy(17.verticalSpace),
                ),
              ),
            _ => const SizedBox.shrink(),
          },
        ],
      ),
    );
  }

  bool canBuyAgain(Order order) {
    return order.type == CheckoutType.cart &&
        order.status == OrderStatus.ongoing &&
        order.status == OrderStatus.completed;
  }
}

class _OrderDetailsContent extends StatelessWidget {
  const _OrderDetailsContent({
    required this.order,
  });

  final Order order;

  @override
  Widget build(BuildContext context) {
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
        // TODO: Implement this
        if (order.type == CheckoutType.cart) ...[
          const SectionTitle('Total Items'),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
            child: Column(
              children: <Widget>[
                for (final item in order.items)
                  PriceBreakdownItem(
                    title: item.name,
                    price: item.amount * item.quantity,
                    isFirst: order.items.first == item,
                    quantity: item.quantity,
                  ),
                PriceBreakdownItem(
                  title: 'Sub total',
                  price: order.totalAmount,
                  isFinal: true,
                ),
              ].separatedBy(const MyDivider()),
            ),
          ),
        ],

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
        ],
        SectionTitle(
          order.type == CheckoutType.cart
              ? 'Delivery Location'
              : 'Drop-off Location',
          color: const Color(0xFF27272A),
        ),
        LocationCard(
          address: order.deliveryLocation?.address ?? 'No address',
          child: const SizedBox.shrink(),
        ),

        10.verticalSpace,
        182.verticalSpace,
      ].separatedBy(14.verticalSpace),
    );
  }
}
