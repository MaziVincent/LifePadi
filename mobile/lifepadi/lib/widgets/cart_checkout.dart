import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/cart.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/models/receipt.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/cart_state.dart';
import 'package:lifepadi/state/orders.dart';
import 'package:lifepadi/state/wallet.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/notification_utils.dart';
import 'package:lifepadi/widgets/widgets.dart';

/// Cart checkout widget
class CartCheckout extends ConsumerWidget {
  const CartCheckout({super.key, this.existingOrder});

  final Order? existingOrder;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return existingOrder != null
        ? _CartCheckoutContent(
            ref: ref,
            existingOrder: existingOrder,
          )
        : Builder(
            builder: (context) {
              final cart = ref.watch(cartStateProvider);

              return switch (cart) {
                AsyncData(:final value) =>
                  _CartCheckoutContent(cart: value, ref: ref),
                AsyncError(:final error) => MyErrorWidget(error: error),
                _ => const Center(child: GreenyLoadingWheel()),
              };
            },
          );
  }
}

class _CartCheckoutContent extends HookWidget {
  const _CartCheckoutContent({
    this.cart,
    required this.ref,
    this.existingOrder,
  }) : assert(
          cart != null || existingOrder != null,
          'Cart or existing order must not be null',
        );

  final Cart? cart;
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
            ...<Widget>[
              if (existingOrder == null)
                PriceBreakdownItem(
                  title: 'Subtotal',
                  price: cart!.subtotal,
                  isFirst: true,
                ),
              PriceBreakdownItem(
                title: 'Delivery fee',
                price: existingOrder?.deliveryFee ?? cart!.deliveryFee,
              ),
            ].separatedBy(const MyDivider()),
            Padding(
              padding: EdgeInsets.only(top: 12.h),
              child: PaymentPrice(
                title: 'Total',
                amount: existingOrder?.totalAmount ?? cart!.total,
                description: kTotalDescription,
              ),
            ),
          ],
        ),
        16.verticalSpace,
        PaymentMethodSelector(
          selectedPaymentMethod: selectedPaymentMethod,
          totalAmount: existingOrder?.totalAmount ?? cart!.total,
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
                    totalAmount: cart!.total,
                    type: CheckoutType.cart,
                  ).future,
                );

                // Create delivery
                await ref.read(
                  storeDeliveryProvider(
                    orderId: order!.id,
                    fee: cart!.deliveryFee,
                    deliveryAddressId: cart!.deliveryLocation!.id,
                    type: CheckoutType.cart,
                  ).future,
                );

                // Create order items with the order id
                for (final product in cart!.products) {
                  await ref.read(
                    storeOrderItemProvider(
                      orderId: order.id,
                      productId: product.id,
                      quantity: product.quantity,
                      amount: product.price,
                      productName: product.name,
                      description: product.description,
                    ).future,
                  );
                }
                await showToast('Order created successfully');
              }

              // Process payment
              final subtotal = existingOrder != null ? 0.0 : cart!.subtotal;
              final deliveryFee =
                  existingOrder?.deliveryFee ?? cart!.deliveryFee;
              final totalAmount = existingOrder?.totalAmount ?? cart!.total;
              final voucherCode =
                  existingOrder != null ? null : cart!.discount?.code;
              final isExistingOrder = existingOrder != null;
              if (selectedPaymentMethod.value == 2) {
                // Get payment link
                final paymentLink = await ref.read(
                  paymentLinkProvider(
                    orderId: order.id,
                    amount: subtotal,
                    deliveryFee: deliveryFee,
                    totalAmount: totalAmount,
                    voucherCode: voucherCode,
                    type: CheckoutType.cart,
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
                final receipt = await ref.read(
                  walletPaymentProvider(
                    type: CheckoutType.cart,
                    orderId: order.id,
                    amount: subtotal,
                    deliveryFee: deliveryFee,
                    totalAmount: totalAmount,
                    voucherCode: voucherCode,
                    existingOrder: isExistingOrder,
                  ).future,
                );

                if (receipt.status) {
                  // Show success notification
                  await NotificationUtils.showNotification(
                    id: order.id,
                    title: 'Order successful',
                    body:
                        'Your order #${order.orderId} has been placed successfully.',
                    payload: {
                      'route': OrderDetailsRoute(id: order.id).location,
                    },
                    save: true,
                  );

                  // After that, go to receipt page
                  if (context.mounted) {
                    context.go(
                      ReceiptRoute(orderId: order.id).location,
                      extra: receipt,
                    );
                  }
                }
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
              logger.e(
                'Could not checkout cart order',
                error: e,
                stackTrace: s,
              );
              await handleError(e, context.mounted ? context : null);
            }
          },
        ),
      ],
    );
  }
}
