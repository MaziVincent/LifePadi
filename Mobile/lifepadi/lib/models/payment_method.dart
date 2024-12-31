import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/utils/assets.gen.dart';

part 'payment_method.mapper.dart';

@MappableClass()
class PaymentMethod with PaymentMethodMappable {
  PaymentMethod({
    required this.id,
    required this.name,
    required this.imagePath,
    required this.isDefault,
    required this.codeName,
  });

  final int id;
  final String name;
  final String imagePath;
  final bool isDefault;
  final String codeName;
}

List<PaymentMethod> paymentMethods = [
  PaymentMethod(
    id: 1,
    name: 'Lifepadi Wallet',
    imagePath: Assets.images.logoDark.path,
    isDefault: true,
    codeName: 'Lifepadi_Wallet',
  ),
  PaymentMethod(
    id: 2,
    name: 'Paystack',
    imagePath: Assets.icons.paystack.path,
    isDefault: false,
    codeName: 'PayStack',
  ),
];
