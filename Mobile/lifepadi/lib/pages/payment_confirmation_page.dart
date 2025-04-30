import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/wallet.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/notification_utils.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:lottie/lottie.dart';

class PaymentConfirmationPage extends ConsumerStatefulWidget {
  const PaymentConfirmationPage({
    super.key,
    required this.reference,
  });

  final String reference;

  @override
  ConsumerState<PaymentConfirmationPage> createState() =>
      _PaymentConfirmationPageState();
}

class _PaymentConfirmationPageState
    extends ConsumerState<PaymentConfirmationPage> {
  bool _isLoading = true;
  bool _isSuccess = false;
  String _message = 'Verifying your payment...';

  @override
  void initState() {
    super.initState();
    _verifyPayment();
  }

  Future<void> _verifyPayment() async {
    try {
      // Make request to verify payment
      final result = await ref
          .read(confirmPaymentProvider(reference: widget.reference).future);

      setState(() {
        _isLoading = false;
        _isSuccess = result.status;
        _message = result.status ? 'Payment successful!' : 'Payment failed!';
      });

      // Wait a bit before navigating away
      await Future<void>.delayed(const Duration(seconds: 3));

      // Navigate based on the result
      if (mounted) {
        if (_isSuccess) {
          // If order id is not null in the receipt,
          // that means the payment was for logistics or cart
          if (result.receipt!.orderId != null) {
            final orderName = switch (result.receipt!.type) {
              CheckoutType.logistics => 'logistics order',
              _ => 'order',
            };
            await NotificationUtils.showNotification(
              id: result.receipt!.orderId!,
              title: 'Order successful',
              body:
                  'Your $orderName #${result.receipt!.orderId} has been placed successfully.',
              payload: {
                'route':
                    OrderDetailsRoute(id: result.receipt!.orderId!).location,
              },
              save: true,
            );

            // Go to receipt page
            final receipt = result.receipt;
            if (mounted) {
              context.go(
                ReceiptRoute().location,
                extra: receipt,
              );
            }
          } else {
            // Order id is null in the receipt,
            // that means the payment was for wallet top up
            await NotificationUtils.showNotification(
              id: result.receipt!.reference.hashCode,
              title: 'Deposit successful',
              body:
                  'Your deposit of ${result.receipt!.totalAmount.currency} has been processed successfully.',
              save: true,
            );

            // Refresh balance
            ref.invalidate(balanceProvider);

            // Refresh transaction history
            ref.invalidate(transactionHistoryProvider());

            // Go to wallet page
            if (mounted) {
              await context.push(
                const WalletRoute().location,
              );
            }
          }
        } else {
          context.go('/');
        }
      }
    } catch (e) {
      // Handle error
      setState(() {
        _isLoading = false;
        _isSuccess = false;
        _message = getErrorInfo(e).description;
      });

      await showToast(
        'Failed to verify payment',
        backgroundColor: kDangerColor,
      );

      // Navigate back home after error
      await Future<void>.delayed(const Duration(seconds: 5));
      if (mounted) {
        context.go('/');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const MyAppBar(
        title: 'Payment Confirmation',
      ),
      body: SuperListView(
        padding: kHorizontalPadding,
        children: [
          if (_isLoading)
            const Center(
              child: SizedBox(
                height: 80,
                width: 80,
                child: CircularProgressIndicator.adaptive(),
              ),
            )
          else
            Lottie.asset(
              _isSuccess
                  ? 'assets/animations/success.json'
                  : 'assets/animations/error.json',
              width: 200,
              height: 200,
            ),
          24.verticalSpace,
          Text(
            _message,
            style: Theme.of(context).textTheme.headlineSmall,
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
