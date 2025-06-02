import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:form_validator/form_validator.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/state/cart_state.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class CartDiscount extends HookWidget {
  const CartDiscount({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    final voucherCode = useState('');
    final formKey = useMemoized(GlobalKey<FormState>.new);

    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8.h),
      child: Row(
        children: [
          Flexible(
            child: Padding(
              padding: const EdgeInsets.only(right: 10).w,
              child: Assets.icons.voucher.svg(width: 24.r, height: 24.r),
            ),
          ),
          Flexible(
            flex: 4,
            child: Form(
              key: formKey,
              child: InputField(
                hintText: 'Enter voucher code',
                labelText: 'Discount Voucher',
                keyboardType: TextInputType.text,
                textInputAction: TextInputAction.done,
                onChanged: (value) => voucherCode.value = value,
                validator: ValidationBuilder(
                  requiredMessage: 'Voucher code is required',
                )
                    .minLength(5, 'Voucher code must be at least 5 characters')
                    .build(),
                hasValue: voucherCode.value.isNotEmpty,
              ),
            ),
          ),
          Flexible(
            flex: 2,
            child: Padding(
              padding: const EdgeInsets.only(left: 10).w,
              child: Consumer(
                builder: (context, ref, _) {
                  return PrimaryActionButton(
                    text: 'use',
                    onPressed: () async {
                      if (formKey.currentState!.validate()) {
                        await ref
                              .read(cartStateProvider.notifier)
                              .applyDiscount(
                                voucherCode: voucherCode.value,
                              )
                              .catchError(
                                (dynamic error) => handleError(
                                  error,
                                  context.mounted ? context : null,
                                ),
                              );
                      }
                    },
                    radius: 8.r,
                    loadingWheelSize: 18.sp,
                    fontSize: 18.sp,
                  );
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}
