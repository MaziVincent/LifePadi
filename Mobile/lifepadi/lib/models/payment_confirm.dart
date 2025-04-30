import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/receipt.dart';

part 'payment_confirm.mapper.dart';

@MappableClass()
class PaymentConfirm with PaymentConfirmMappable {
  PaymentConfirm({
    required this.status,
    required this.message,
    this.receipt,
  });

  @MappableField(key: 'verified')
  final bool status;
  @MappableField(key: 'message')
  final String message;
  @MappableField(key: 'transaction')
  final Receipt? receipt;
}
