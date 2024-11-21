import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/mock_data.dart';
import 'package:lifepadi/widgets/widgets.dart';

class PaymentMethodSelector extends StatelessWidget {
  const PaymentMethodSelector({
    super.key,
    required this.selectedPaymentMethod,
  });

  final ValueNotifier<int> selectedPaymentMethod;

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
          PaymentMethodCheckbox(
            selectedPaymentMethod: selectedPaymentMethod,
            image: paymentMethod.image,
            description: paymentMethod.description,
            balance: paymentMethod.balance,
            id: paymentMethod.id,
            isDefault: paymentMethod.isDefault,
          ),
        PrimaryOutlineButton(
          text: 'Add new card'.toUpperCase(),
          onPressed: () {
            // Open add new card bottom sheet with drag handle.
          },
          textStyle: context.textTheme.bodyLarge?.copyWith(
            color: kDarkPrimaryColor,
            fontWeight: FontWeight.w700,
            fontSize: 14.sp,
          ),
          icon: IconsaxPlusLinear.card_add,
        ),
      ].separatedBy(14.verticalSpace),
    );
  }
}
