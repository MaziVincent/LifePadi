import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/orders.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/mock_data.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

import '../utils/constants.dart';

class OrderDetailsPage extends ConsumerWidget {
  const OrderDetailsPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final paymentMethod = paymentMethods[1];
    final order = ref.watch(orderProvider(id));

    return Scaffold(
      appBar: MyAppBar(
        title: 'Order Details',
        actions: [
          MyIconButton(
            icon: Remix.more_2_fill,
            onPressed: () {
              // Can have popup menu with option: Get Receipt (Go to receipt page).
            },
          ),
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
            AsyncData(:final value) =>
              _OrderDetailsContent(order: value, paymentMethod: paymentMethod),
            _ => const Center(child: GreenyLoadingWheel()),
          },
          switch (order) {
            AsyncLoading() => const SizedBox.shrink(),
            _ => BottomPanel(
                height: 182.h,
                child: Column(
                  children: <Widget>[
                    PrimaryOutlineButton(
                      onPressed: () =>
                          context.push(TrackOrderRoute(id: id).location),
                      text: 'Track Order',
                    ),
                    PrimaryButton(
                      onPressed: () {
                        // TODO: Implement Buy Again
                      },
                      text: 'Buy Again',
                    ),
                  ].separatedBy(17.verticalSpace),
                ),
              ),
          },
        ],
      ),
    );
  }
}

class _OrderDetailsContent extends StatelessWidget {
  const _OrderDetailsContent({
    required this.order,
    required this.paymentMethod,
  });

  final ({
    double? balance,
    String description,
    int id,
    Image image,
    bool isDefault
  }) paymentMethod;
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

        /// Price info
        const SectionTitle('Total Items'),
        Padding(
          padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
          child: Column(
            children: <Widget>[
              for (final item in order.items)
                PriceBreakdownItem(
                  title: item.name,
                  price: item.amount,
                  isFirst: order.items.first == item,
                ),
              PriceBreakdownItem(
                title: 'Sub total',
                price: order.totalAmount,
                isFinal: true,
              ),
            ].separatedBy(const MyDivider()),
          ),
        ),

        /// Location
        const SectionTitle(
          'Location',
          color: Color(0xFF27272A),
        ),
        LocationCard(
          onTap: () {
            // TODO: Open bottom sheet to update location
          },
          place: 'Soja, Lekki Lagos...',
          phoneNumber: '0901 234 5678',
        ),

        /// Payment method
        const SectionTitle('Payment Method'),
        PaymentMethodInfo(
          onTap: () {
            // TODO: Change payment method
          },
          image: paymentMethod.image,
          description: paymentMethod.description,
          balance: paymentMethod.balance,
          id: paymentMethod.id,
          isDefault: paymentMethod.isDefault,
        ),
        10.verticalSpace,
        182.verticalSpace,
      ].separatedBy(14.verticalSpace),
    );
  }
}
