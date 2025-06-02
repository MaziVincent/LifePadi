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
import 'package:lifepadi/state/delivery_fee.dart';
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

    // Watch delivery fee calculation from backend
    final deliveryFeeAsync =
        cart != null ? ref.watch(deliveryFeeProvider) : null;

    return SuperListView(
      padding: kHorizontalPadding.copyWith(top: 12.h),
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Add CartDiscount widget for voucher code input
            if (existingOrder == null) ...[
              const CartDiscount(),
              if (cart?.discount != null) ...[
                8.verticalSpace,
                Text(
                  cart!.discount!.statement,
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: kDarkPrimaryColor,
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w500,
                    fontStyle: FontStyle.italic,
                  ),
                ),
              ],
              18.verticalSpace,
            ],
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
            // Show subtotal
            if (existingOrder == null)
              PriceBreakdownItem(
                title: 'Subtotal',
                price: cart!.subtotal,
                isFirst: true,
              ),
            const MyDivider(),
            // Show delivery fee with loading state
            if (deliveryFeeAsync != null)
              deliveryFeeAsync.when(
                loading: () => const PriceBreakdownItem(
                  title: 'Delivery fee',
                  price: 0,
                  isLoading: true,
                ),
                error: (error, _) => const PriceBreakdownItem(
                  title: 'Delivery fee',
                  price: 0,
                  error: 'Failed to calculate delivery fee',
                ),
                data: (deliveryFeeData) => PriceBreakdownItem(
                  title: 'Delivery fee',
                  price: deliveryFeeData.deliveryFee,
                ),
              )
            else
              PriceBreakdownItem(
                title: 'Delivery fee',
                price: existingOrder?.deliveryFee ?? 0,
              ),
            const MyDivider(),
            Padding(
              padding: EdgeInsets.only(top: 12.h),
              child: deliveryFeeAsync != null
                  ? deliveryFeeAsync.when(
                      loading: () => PaymentPrice(
                        title: 'Total',
                        amount: cart!.subtotal,
                        description: 'Calculating delivery fee...',
                      ),
                      error: (error, _) => PaymentPrice(
                        title: 'Total',
                        amount: cart!.subtotal,
                        description: 'Error calculating total',
                      ),
                      data: (deliveryFeeData) => PaymentPrice(
                        title: 'Total',
                        amount: deliveryFeeData.total,
                        description: kTotalDescription,
                      ),
                    )
                  : PaymentPrice(
                      title: 'Total',
                      amount: existingOrder?.totalAmount ?? 0,
                      description: kTotalDescription,
                    ),
            ),
          ],
        ),
        16.verticalSpace,
        if (deliveryFeeAsync != null)
          deliveryFeeAsync.when(
            loading: () => PaymentMethodSelector(
              selectedPaymentMethod: selectedPaymentMethod,
              totalAmount: cart!.subtotal,
            ),
            error: (error, _) => PaymentMethodSelector(
              selectedPaymentMethod: selectedPaymentMethod,
              totalAmount: cart!.subtotal,
            ),
            data: (deliveryFeeData) => PaymentMethodSelector(
              selectedPaymentMethod: selectedPaymentMethod,
              totalAmount: deliveryFeeData.total,
            ),
          )
        else
          PaymentMethodSelector(
            selectedPaymentMethod: selectedPaymentMethod,
            totalAmount: existingOrder?.totalAmount ?? 0,
          ),
        30.verticalSpace,
        PrimaryActionButton(
          text: 'Proceed to Pay',
          onPressed: deliveryFeeAsync != null && deliveryFeeAsync.isLoading
              ? null
              : () async {
                  if (selectedPaymentMethod.value == -1) {
                    await displayError(
                      context,
                      title: 'Select payment method',
                      description: 'Please select a payment method to proceed.',
                    );
                    return;
                  }

                  final deliveryFeeData = deliveryFeeAsync?.valueOrNull;
                  if (deliveryFeeData == null && existingOrder == null) {
                    await displayError(
                      context,
                      title: 'Cannot proceed',
                      description:
                          'Failed to calculate delivery fee. Please try again.',
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
                          totalAmount: deliveryFeeData!.total,
                          type: CheckoutType.cart,
                        ).future,
                      );

                      // Create delivery
                      await ref.read(
                        storeDeliveryProvider(
                          orderId: order!.id,
                          fee: deliveryFeeData.deliveryFee,
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
                    final subtotal =
                        existingOrder != null ? 0.0 : cart!.subtotal;
                    final deliveryFee = existingOrder?.deliveryFee ??
                        deliveryFeeData!.deliveryFee;
                    final totalAmount =
                        existingOrder?.totalAmount ?? deliveryFeeData!.total;
                    final discountCode =
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
                          voucherCode: discountCode,
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
                          voucherCode: discountCode,
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
