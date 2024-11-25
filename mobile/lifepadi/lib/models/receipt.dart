import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/checkout_type.dart';

part 'receipt.mapper.dart';

@MappableClass()
class Receipt with ReceiptMappable {
  Receipt({
    required this.status,
    required this.reference,
    required this.paidAt,
    required this.channel,
    required this.orderId,
    required this.amount,
    required this.deliveryFee,
    required this.totalAmount,
    this.type = CheckoutType.cart,
  });

  @MappableField(key: 'StatusBool')
  final bool status;
  @MappableField(key: 'TransactionRef')
  final String reference;
  @MappableField(key: 'PaidAt')
  final DateTime paidAt;
  @MappableField(key: 'PaymentChannel')
  final String channel;
  @MappableField(key: 'OrderId')
  final int orderId;
  @MappableField(key: 'AmountPaid')
  final double amount;
  @MappableField(key: 'DeliveryFee')
  final double deliveryFee;
  @MappableField(key: 'TotalAmount')
  final double totalAmount;
  final CheckoutType type;
}
