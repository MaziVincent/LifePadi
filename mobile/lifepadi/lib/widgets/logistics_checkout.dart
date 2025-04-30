import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/logistics.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/models/receipt.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/logistics.dart';
import 'package:lifepadi/state/orders.dart';
import 'package:lifepadi/state/wallet.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class LogisticsCheckout extends ConsumerWidget {
  const LogisticsCheckout({super.key, this.existingOrder});

  final Order? existingOrder;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return existingOrder != null
        ? _LogisticsCheckoutContent(
            ref: ref,
            existingOrder: existingOrder,
          )
        : Builder(
            builder: (context) {
              final logistics = ref.watch(logisticsStateProvider);

              return switch (logistics) {
                AsyncData(:final value) => value != null
                    ? _LogisticsCheckoutContent(logistics: value, ref: ref)
                    : const Center(child: Text('No logistics found')),
                AsyncError(:final error) => MyErrorWidget(error: error),
                _ => const Center(child: GreenyLoadingWheel()),
              };
            },
          );
  }
}

class _LogisticsCheckoutContent extends HookWidget {
  const _LogisticsCheckoutContent({
    this.logistics,
    required this.ref,
    this.existingOrder,
  }) : assert(
          logistics != null || existingOrder != null,
          'Logistics or existing order must not be null',
        );

  final Logistics? logistics;
  final WidgetRef ref;
  final Order? existingOrder;

  @override
  Widget build(BuildContext context) {
    final deliveryInstruction = useState('');
    final selectedPaymentMethod = useState(1);

    return SuperListView(
      padding: kHorizontalPadding.copyWith(top: 12.h),
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            16.verticalSpace,
            InputField(
              hintText: 'Do you have any delivery instruction?',
              labelText: 'Delivery instruction (Optional)',
              onChanged: (value) => deliveryInstruction.value = value,
              keyboardType: TextInputType.multiline,
              hasValue: deliveryInstruction.value.isNotEmpty,
              maxLines: 3,
              maxLength: 100,
              textInputAction: TextInputAction.newline,
            ),
            18.verticalSpace,
            Text(
              'Payment Summary',
              style: context.textTheme.bodyLarge?.copyWith(
                color: const Color(0xFF27272A),
                fontSize: 16.sp,
                fontWeight: FontWeight.w700,
              ),
            ),
            8.verticalSpace,
            PriceBreakdownItem(
              title: 'Delivery fee',
              price: existingOrder?.deliveryFee ?? logistics!.deliveryFee,
            ),
            Padding(
              padding: EdgeInsets.only(top: 12.h),
              child: PaymentPrice(
                title: 'Total',
                amount: existingOrder?.deliveryFee ?? logistics!.deliveryFee,
              ),
            ),
          ],
        ),
        16.verticalSpace,
        PaymentMethodSelector(
          selectedPaymentMethod: selectedPaymentMethod,
          totalAmount: existingOrder?.deliveryFee ?? logistics!.deliveryFee,
        ),
        30.verticalSpace,
        PrimaryActionButton(
          text: 'Proceed to Pay',
          onPressed: () async {
            if (selectedPaymentMethod.value == -1) {
              await displayError(
                context,
                title: 'Select payment method',
                description: 'Please select a payment method to proceed.',
              );
              return;
            }
            await showToast('Please wait, creating order...');

            try {
              var order = existingOrder;

              if (order == null) {
                // Create order
                order = await ref.read(
                  storeOrderProvider(
                    instruction: deliveryInstruction.value,
                    totalAmount: logistics!.deliveryFee,
                    type: CheckoutType.logistics,
                  ).future,
                );

                await ref.read(
                  storeDeliveryProvider(
                    orderId: order!.id,
                    fee: logistics!.deliveryFee,
                    deliveryAddressId: logistics!.dropoffLocation.id,
                    type: CheckoutType.logistics,
                    pickupAddressId: logistics!.pickupLocation.id,
                  ).future,
                );

                // Create logistics with the order id
                await ref.read(
                  storeLogisticsProvider(
                    orderId: order.id,
                    logistics: logistics!,
                  ).future,
                );
                await showToast('Order created successfully');
              }

              // Process payment
              final deliveryFee =
                  existingOrder?.deliveryFee ?? logistics!.deliveryFee;
              final isExistingOrder = existingOrder != null;
              if (selectedPaymentMethod.value == 2) {
                // Get payment link
                final paymentLink = await ref.read(
                  paymentLinkProvider(
                    orderId: order.id,
                    amount: 0,
                    deliveryFee: deliveryFee,
                    totalAmount: deliveryFee,
                    type: CheckoutType.logistics,
                  ).future,
                );

                await showToast('Processing payment...');
                // Use webview to process payment
                if (context.mounted) {
                  await context.push<Receipt>(
                    PaymentRoute(
                      link: paymentLink,
                      isExistingOrder: isExistingOrder,
                    ).location,
                  );
                }
              } else if (selectedPaymentMethod.value == 1) {
                // Use wallet to process payment
                await ref.read(
                  walletPaymentProvider(
                    type: CheckoutType.logistics,
                    orderId: order.id,
                    amount: 0,
                    deliveryFee: deliveryFee,
                    totalAmount: deliveryFee,
                    existingOrder: isExistingOrder,
                  ).future,
                );
              }
            } on PaymentFailedException catch (e) {
              if (context.mounted) {
                await displayError(
                  context,
                  title: 'Payment failed',
                  description: e.message,
                );
              } else {
                await showToast(
                  e.message,
                  isLong: true,
                  gravity: ToastGravity.CENTER,
                );
              }
            } catch (e, s) {
              logger.e('Error creating order', error: e, stackTrace: s);
              await handleError(e, context.mounted ? context : null);
            }
          },
        ),
      ],
    );
  }
}
