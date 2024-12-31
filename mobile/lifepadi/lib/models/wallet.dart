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
