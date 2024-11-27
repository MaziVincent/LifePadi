import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/receipt.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/orders.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

import '../utils/assets.gen.dart';
import '../utils/constants.dart';

class ReceiptPage extends StatelessWidget {
  const ReceiptPage({
    super.key,
    required this.orderId,
    this.receipt,
  });

  final int orderId;
  final Receipt? receipt;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: kDarkPrimaryColor,
      appBar: AppBar(
        title: Text(
          'Receipt',
          style: context.textTheme.titleLarge?.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.w700,
            fontSize: 20.sp,
          ),
        ),
        titleSpacing: 14.w,
        backgroundColor: kDarkPrimaryColor,
        surfaceTintColor: kDarkPrimaryColor,
        flexibleSpace: Container(
          decoration: const BoxDecoration(
            gradient: kRadialGradient,
          ),
          padding: EdgeInsets.only(top: 75.h),
        ),
        actions: [
          MyIconButton(
            icon: Remix.more_2_fill,
            onPressed: () {},
            backgroundColor: const Color(0x19F5F5F5),
            iconColor: Colors.white,
          ),
          24.horizontalSpace,
        ],
        leading: Padding(
          padding: EdgeInsets.only(left: 16.w),
          child: Align(
            child: GlassmorphicBackButton(
              onPressed: () => context.go(const OrdersRoute().location),
            ),
          ),
        ),
        toolbarHeight: 0.16.sh,
      ),
      body: Container(
        width: double.infinity,
        height: 0.84.sh,
        decoration: ShapeDecoration(
          color: const Color(0xFFFBFBFB),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.only(
              topLeft: Radius.circular(30.r),
              topRight: Radius.circular(30.r),
            ),
          ),
        ),
        padding: kHorizontalPadding.copyWith(top: 28.h),
        child: receipt != null
            ? _ReceiptContent(receipt: receipt!)
            : Consumer(
                builder: (context, ref, child) {
                  final receipt = ref.watch(receiptProvider(orderId));

                  return switch (receipt) {
                    AsyncData(:final value) => _ReceiptContent(receipt: value),
                    AsyncError(:final error) => Center(
                        child: Text(
                          error.toString(),
                          style: context.textTheme.bodySmall?.copyWith(
                            color: Colors.black,
                            fontSize: 14.sp,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                    _ => const Center(child: GreenyLoadingWheel()),
                  };
                },
              ),
      ),
    );
  }
}

class _ReceiptContent extends StatelessWidget {
  const _ReceiptContent({
    required this.receipt,
  });

  final Receipt receipt;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Assets.icons.success.svg(),
        10.verticalSpace,
        Text(
          receipt.totalAmount.currency,
          style: context.textTheme.titleLarge?.copyWith(
            color: Colors.black,
            fontSize: 28.sp,
            fontWeight: FontWeight.w700,
          ),
        ),
        4.verticalSpace,
        Text(
          'Successful',
          style: context.textTheme.bodySmall?.copyWith(
            color: const Color(0xFFB3B3B5),
            fontSize: 12.sp,
            fontWeight: FontWeight.w500,
          ),
        ),
        25.66.verticalSpace,
        ReceiptInfoTile(
          left: 'Payment Channel',
          right: receipt.channel.capitalize(),
        ),
        if (receipt.type == CheckoutType.cart)
          ReceiptInfoTile(left: 'Subtotal', right: receipt.subtotal.currency),
        ReceiptInfoTile(
          left: 'Delivery fee',
          right: receipt.deliveryFee.currency,
        ),
        ReceiptInfoTile(left: 'Total', right: receipt.totalAmount.currency),
        ReceiptInfoTile(
          left: 'Txn Reference',
          right: receipt.reference,
          copiable: true,
        ),
        ReceiptInfoTile(
          left: 'Date & Time',
          right: receipt.paidAt.readable,
        ),
        const Spacer(),
        PrimaryButton(
          onPressed: () => context.go(const OrdersRoute().location),
          text: 'Go to Orders',
        ),
        const Spacer(),
      ],
    );
  }
}
