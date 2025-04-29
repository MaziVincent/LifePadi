import 'dart:math';

import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:lottie/lottie.dart';

class PaymentConfirmationPage extends ConsumerStatefulWidget {
  const PaymentConfirmationPage({
    super.key,
    required this.ref,
  });

  final String ref;

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
      // Simulate a network call to verify payment
      final status = await Future.delayed(
        const Duration(seconds: 2),
        () => Random().nextBool(),
      );

      setState(() {
        _isLoading = false;
        _isSuccess = status;
        _message = status ? 'Payment successful!' : 'Payment failed!';
      });

      // Wait a bit before navigating away
      await Future.delayed(const Duration(seconds: 2));

      // Navigate based on the result
      if (mounted) {
        if (_isSuccess) {
          context.go('/profile');
        } else {
          context.go('/');
        }
      }
    } catch (e) {
      setState(() {
        _isLoading = false;
        _isSuccess = false;
        _message = 'An error occurred: $e';
      });

      await showToast('Failed to verify payment: $e');

      // Navigate back home after error
      await Future.delayed(const Duration(seconds: 2));
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
