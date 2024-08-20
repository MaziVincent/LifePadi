import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/my_app_bar.dart';
import 'package:lifepadi/widgets/my_divider.dart';
import 'package:lifepadi/widgets/payment_total.dart';
import 'package:lifepadi/widgets/primary_button.dart';

import '../widgets/payment_method_checkbox.dart';
import '../widgets/primary_outline_button.dart';

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
            ...[
              for (final paymentMethod in paymentMethods)
                PaymentMethodCheckbox(
                  selectedPaymentMethod: selectedPaymentMethod,
                  image: paymentMethod.image,
                  description: paymentMethod.description,
                  balance: paymentMethod.balance,
                  id: paymentMethod.id,
                  isDefault: paymentMethod.isDefault,
                ),
            ],
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
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Total items',
                            style: TextStyle(
                              color: const Color(0xFF27272A),
                              fontSize: 14.sp,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                          Text(
                            43000.currency,
                            style: TextStyle(
                              color: const Color(0xFF27272A),
                              fontSize: 14.sp,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Logistics',
                            style: TextStyle(
                              color: const Color(0xFF27272A),
                              fontSize: 14.sp,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                          Text(
                            1300.currency,
                            style: TextStyle(
                              color: const Color(0xFF27272A),
                              fontSize: 14.sp,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ],
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Sub total',
                            style: TextStyle(
                              color: const Color(0xFF27272A),
                              fontSize: 14.sp,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                          Text(
                            (43000 + 1300).currency,
                            style: TextStyle(
                              color: const Color(0xFF27272A),
                              fontSize: 16.sp,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
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
            onPressed: () {
              // TODO: Call payment provider to process payment.
            },
          ),
        ],
      ),
    );
  }
}
