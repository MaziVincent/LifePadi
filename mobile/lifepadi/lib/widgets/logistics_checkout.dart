import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/logistics.dart';
import 'package:lifepadi/state/logistics.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class LogisticsCheckout extends ConsumerWidget {
  const LogisticsCheckout({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final logistics = ref.watch(logisticsStateProvider);

    return switch (logistics) {
      AsyncData(:final value) =>
        _LogisticsCheckoutContent(logistics: value!, ref: ref),
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
    };
  }
}

class _LogisticsCheckoutContent extends HookWidget {
  const _LogisticsCheckoutContent({
    required this.logistics,
    required this.ref,
  });

  final Logistics logistics;
  final WidgetRef ref;

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
            PriceBreakdownItem(
              title: 'Delivery fee',
              price: logistics.deliveryFee,
            ),
            Padding(
              padding: EdgeInsets.only(top: 12.h),
              child: PaymentPrice(
                title: 'Total',
                amount: logistics.deliveryFee,
                description: kTotalDescription,
              ),
            ),
          ],
        ),
        30.verticalSpace,
        PrimaryActionButton(
          label: 'Proceed to Pay',
          onPressed: () async {
            await showToast('Please wait, creating order...');
          },
        ),
      ],
    );
  }
}
