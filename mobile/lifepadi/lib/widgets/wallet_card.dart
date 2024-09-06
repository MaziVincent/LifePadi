import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/payment_method_info.dart';

class WalletCard extends StatelessWidget {
  const WalletCard({
    super.key,
    required this.paymentMethod,
  });

  final ({
    double? balance,
    String description,
    int id,
    Image image,
    bool isDefault
  }) paymentMethod;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: ShapeDecoration(
        color: Colors.white,
        shape: RoundedRectangleBorder(
          side: const BorderSide(color: kStrokeColor),
          borderRadius: BorderRadius.circular(8.r),
        ),
      ),
      child: PaymentMethodInfo(
        image: paymentMethod.image,
        description: paymentMethod.description,
        balance: paymentMethod.balance,
        id: paymentMethod.id,
        isDefault: paymentMethod.isDefault,
        onTap: () {},
      ),
    );
  }
}
