import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/cart.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/cart_state.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';

class CheckoutPage extends HookConsumerWidget {
  const CheckoutPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cart = ref.watch(cartStateProvider);

    return Scaffold(
      appBar: const MyAppBar(title: 'Checkout'),
      body: switch (cart) {
        AsyncData(:final value) => _CheckoutContent(cart: value),
        AsyncError(:final error) => Center(
            child: Text(
              error.toString(),
              style: context.textTheme.bodyLarge?.copyWith(
                color: kDarkPrimaryColor,
                fontWeight: FontWeight.w400,
              ),
            ),
          ),
        _ => const Center(child: GreenyLoadingWheel()),
      },
    );
  }
}

class _CheckoutContent extends HookWidget {
  const _CheckoutContent({
    required this.cart,
  });

  final Cart cart;

  @override
  Widget build(BuildContext context) {
    final deliveryInstruction = useState('');
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
            ...<Widget>[
              PriceBreakdownItem(
                title: 'Subtotal',
                price: cart.subtotal,
                isFirst: true,
              ),
              PriceBreakdownItem(
                title: 'Delivery fee',
                price: cart.deliveryFee,
              ),
            ].separatedBy(const MyDivider()),
            Padding(
              padding: EdgeInsets.only(top: 12.h),
              child: PaymentPrice(
                title: 'Total',
                amount: cart.total,
                description: kTotalDescription,
              ),
            ),
          ],
        ),
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
    );
  }
}
