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
    // Make request to verify payment
    final confirmationResult = await ref
        .read(confirmPaymentProvider(reference: widget.reference).future);

    setState(() {
      _isLoading = false;
      _isSuccess = confirmationResult.status;
      _message =
          confirmationResult.status ? 'Payment successful!' : 'Payment failed!';
    });

    // Navigate based on the result
    if (_isSuccess) {
      // If order id is not null in the receipt,
      // that means the payment was for logistics or cart
      if (confirmationResult.receipt!.orderId != null) {
        final orderName = switch (confirmationResult.receipt!.type) {
          CheckoutType.logistics => 'logistics order',
          _ => 'order',
        };

        await NotificationUtils.showNotification(
          id: confirmationResult.receipt!.orderId!,
          title: 'Order successful',
          body:
              'Your $orderName #${confirmationResult.receipt!.orderId} has been placed successfully.',
          payload: {
            'route': OrderDetailsRoute(id: confirmationResult.receipt!.orderId!)
                .location,
          },
          save: true,
        );

        // Go to receipt page
        await Future<void>.delayed(const Duration(seconds: 3)).then((_) {
          if (mounted) {
            context.go(
              ReceiptRoute(orderId: confirmationResult.receipt!.orderId)
                  .location,
              extra: confirmationResult.receipt,
            );
          }
        });
      } else {
        // Order id is null in the receipt,
        // that means the payment was for wallet top up
        await NotificationUtils.showNotification(
          id: confirmationResult.receipt!.reference.hashCode,
          title: 'Deposit successful',
          body:
              'Your deposit of ${confirmationResult.receipt!.totalAmount.currency} has been processed successfully.',
          save: true,
        );

        // Refresh balance and txn history
        ref
          ..invalidate(balanceProvider)
          ..invalidate(transactionHistoryProvider());

        // Go to wallet page
        if (mounted) {
          context.go(const WalletRoute().location);
        }
      }
    } else {
      await showToast(
        'Failed to verify payment',
        backgroundColor: kDangerColor,
      );

      await Future<void>.delayed(const Duration(seconds: 2)).then((_) {
        // Go to home page
        if (mounted) {
          context.go('/');
        }
      });
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
