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
import 'package:lifepadi/state/delivery_fee.dart';
import 'package:lifepadi/state/logistics.dart';
import 'package:lifepadi/state/orders.dart';
import 'package:lifepadi/state/wallet.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/location_utils.dart';
import 'package:lifepadi/utils/notification_utils.dart';
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

class _LogisticsCheckoutContent extends HookWidget with LocationUtils {
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

  /// Calculate distance between pickup and dropoff locations
  double _calculateLogisticsDistance(Logistics logistics) {
    return calculateDistance(
      logistics.pickupLocation.latLng,
      logistics.dropoffLocation.latLng,
    );
  }

  @override
  Widget build(BuildContext context) {
    final deliveryInstruction = useState('');
    final selectedPaymentMethod = useState(1);

    // Calculate distance and get delivery fee from backend for new orders
    final distance =
        logistics != null ? _calculateLogisticsDistance(logistics!) : 0.0;
    final deliveryFeeAsync =
        ref.watch(deliveryFeeForDistanceProvider(distance: distance));

    // Determine the delivery fee based on source
    final deliveryFee =
        existingOrder?.deliveryFee ?? (deliveryFeeAsync.valueOrNull ?? 0.0);
    final isLoadingDeliveryFee = deliveryFeeAsync.isLoading;
    final deliveryFeeError = deliveryFeeAsync.error;

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
              price: deliveryFee,
              isLoading: isLoadingDeliveryFee,
              error: deliveryFeeError?.toString(),
            ),
            Padding(
              padding: EdgeInsets.only(top: 12.h),
              child: PaymentPrice(
                title: 'Total',
                amount: deliveryFee,
              ),
            ),
          ],
        ),
        16.verticalSpace,
        PaymentMethodSelector(
          selectedPaymentMethod: selectedPaymentMethod,
          totalAmount: deliveryFee,
        ),
        30.verticalSpace,
        PrimaryActionButton(
          text: 'Proceed to Pay',
          onPressed: isLoadingDeliveryFee || deliveryFeeError != null
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

                  if (isLoadingDeliveryFee) {
                    await showToast(
                        'Please wait for delivery fee calculation...',);
                    return;
                  }

                  if (deliveryFeeError != null) {
                    await displayError(
                      context,
                      title: 'Delivery Fee Error',
                      description:
                          'Unable to calculate delivery fee. Please try again.',
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
                          totalAmount: deliveryFee,
                          type: CheckoutType.logistics,
                        ).future,
                      );

                      await ref.read(
                        storeDeliveryProvider(
                          orderId: order!.id,
                          fee: deliveryFee,
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

                    // Process payment with calculated delivery fee
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
                      final receipt = await ref.read(
                        walletPaymentProvider(
                          type: CheckoutType.logistics,
                          orderId: order.id,
                          amount: 0,
                          deliveryFee: deliveryFee,
                          totalAmount: deliveryFee,
                          existingOrder: isExistingOrder,
                        ).future,
                      );

                      if (receipt.status) {
                        // show success notification
                        await NotificationUtils.showNotification(
                          id: order.id,
                          title: 'Order successful',
                          body:
                              'Your logistics order #${order.orderId} has been placed successfully.',
                          payload: {
                            'route': OrderDetailsRoute(id: order.id).location,
                          },
                          save: true,
                        );

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
                    logger.e('Error creating order', error: e, stackTrace: s);
                    await handleError(e, context.mounted ? context : null);
                  }
                },
        ),
      ],
    );
  }
}
