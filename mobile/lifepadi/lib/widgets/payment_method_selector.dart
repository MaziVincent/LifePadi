import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/payment_method.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';

class PaymentMethodSelector extends StatelessWidget {
  const PaymentMethodSelector({
    super.key,
    required this.selectedPaymentMethod,
    required this.totalAmount,
  });

  final ValueNotifier<int> selectedPaymentMethod;
  final double totalAmount;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Select payment method',
          style: context.textTheme.titleMedium?.copyWith(
            color: const Color(0xFF27272A),
            fontSize: 16.sp,
            fontWeight: FontWeight.w700,
          ),
        ),
        for (final paymentMethod in paymentMethods)
          Consumer(
            builder: (context, ref, child) {
              final user = ref.watch(authControllerProvider);
              final walletBalance = user.maybeWhen(
                data: (user) => user is Customer ? user.wallet.balance : 0.0,
                orElse: () => 0.0,
              );

              final isWalletDisabled =
                  paymentMethod.id == 1 && walletBalance < totalAmount;

              // If wallet is disabled and it's currently selected, switch to Paystack
              if (isWalletDisabled && selectedPaymentMethod.value == 1) {
                selectedPaymentMethod.value = 2;
              }

              return PaymentMethodCheckbox(
                selectedPaymentMethod: selectedPaymentMethod,
                imagePath: paymentMethod.imagePath,
                name: paymentMethod.name,
                balance: paymentMethod.id == 1 ? walletBalance : null,
                id: paymentMethod.id,
                isDefault: paymentMethod.isDefault,
                disabled: isWalletDisabled,
              );
            },
          ),
      ].separatedBy(14.verticalSpace),
    );
  }
}
