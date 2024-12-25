import 'package:dart_mappable/dart_mappable.dart';

part 'wallet.mapper.dart';

@MappableClass()
class Wallet with WalletMappable {
  Wallet({required this.id, required this.balance});

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'Balance')
  final double balance;
}

@MappableClass()
class PaymentMethod with PaymentMethodMappable {
  PaymentMethod({
    required this.id,
    required this.name,
    required this.imagePath,
    required this.isDefault,
  });

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'Name')
  final String name;
  @MappableField(key: 'Image')
  final String imagePath;
  @MappableField(key: 'IsDefault')
  final bool isDefault;
}
