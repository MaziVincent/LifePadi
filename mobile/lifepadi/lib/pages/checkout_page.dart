import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:lifepadi/utils/mock_data.dart';

class CheckoutPage extends HookWidget {
  const CheckoutPage({super.key});

  @override
  Widget build(BuildContext context) {
    final selectedPaymentMethod = useState(-1);

    return Scaffold(
      appBar: const MyAppBar(title: 'Checkout'),
      body: ListView(
        padding: kHorizontalPadding.copyWith(top: 12.h),
        children: [
          ...[
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
            Padding(
              padding:
                  EdgeInsets.symmetric(horizontal: 16.w).copyWith(top: 12.h),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ...[
                    Text(
                      'Pay Summary',
                      style: context.textTheme.bodyLarge?.copyWith(
                        color: const Color(0xFF27272A),
                        fontSize: 16.sp,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    ...<Widget>[
                      const PriceBreakdownItem(
                        title: 'Total items',
                        price: 43000,
                        isFirst: true,
                      ),
                      const PriceBreakdownItem(title: 'Logistics', price: 300),
                      const PriceBreakdownItem(
                        title: 'Sub total',
                        price: 43300,
                        isFinal: true,
                      ),
                    ].separatedBy(const MyDivider()),
                  ].separatedBy(8.verticalSpace),
                  Padding(
                    padding: EdgeInsets.only(top: 12.h),
                    child: const PaymentTotal(totalPrice: 44300),
                  ),
                ],
              ),
            ),
          ].separatedBy(14.verticalSpace),
          30.verticalSpace,
          PrimaryButton(
            text: 'Proceed to Pay',
            onPressed: () async {
              // TODO: Call payment provider to process payment.

              // After that, go to receipt page
              await context.push(ReceiptRoute(id: 1).location);
            },
          ),
        ],
      ),
    );
  }
}
