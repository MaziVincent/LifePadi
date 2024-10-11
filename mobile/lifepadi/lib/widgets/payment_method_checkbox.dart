import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';

class PaymentMethodCheckbox extends StatelessWidget {
  const PaymentMethodCheckbox({
    super.key,
    required this.selectedPaymentMethod,
    required this.image,
    required this.description,
    this.balance,
    required this.id,
    required this.isDefault,
  });

  final ValueNotifier<int> selectedPaymentMethod;
  final Image image;
  final String description;
  final double? balance;
  final int id;
  final bool isDefault;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _selectPaymentMethod,
      child: Container(
        width: double.infinity,
        height: 67.h,
        decoration: ShapeDecoration(
          shape: RoundedRectangleBorder(
            side: const BorderSide(color: Color(0xFFEBEBF0)),
            borderRadius: BorderRadius.circular(8.r),
          ),
        ),
        padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 12.h),
        child: Row(
          children: [
            /// Check or uncheck this payment method
            Transform.scale(
              scale: 1.3,
              child: SizedBox(
                height: 24.h,
                width: 24.h,
                child: Checkbox.adaptive(
                  value: isSelected,
                  onChanged: (_) => _selectPaymentMethod(),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(4.r),
                  ),
                  side: const BorderSide(
                    color: Color(0xFFDCDCE2),
                  ),
                  activeColor: kDarkPrimaryColor,
                ),
              ),
            ),

            /// Payment method logo
            Container(
              height: 41.67.h,
              width: 41.67.h,
              decoration: BoxDecoration(
                color: isDefault ? const Color(0x4CD9D9D9) : null,
                borderRadius: BorderRadius.circular(14.r),
              ),
              padding: isDefault
                  ? EdgeInsets.only(
                      top: 8.83.h,
                      left: 11.17.w,
                      right: 10.48.w,
                      bottom: 7.83.h,
                    )
                  : EdgeInsets.zero,
              child: image,
            ),

            /// Payment method description
            Expanded(
              child: Text(
                description,
                style: context.textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF27272A),
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w700,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ),

            /// Payment method balance or arrow right
            if (balance != null)
              Text(
                balance!.currency,
                style: context.textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF27272A),
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w700,
                ),
              )
            else
              // Arrow right
              GestureDetector(
                onTap: () {
                  // TODO: Open edit card bottom sheet
                },
                child: Assets.icons.arrowRight.svg(),
              ),
          ].separatedBy(8.horizontalSpace),
        ),
      ),
    );
  }

  void _selectPaymentMethod() {
    if (!isSelected) {
      selectedPaymentMethod.value = id;
    }
  }

  bool get isSelected => selectedPaymentMethod.value == id;
}
