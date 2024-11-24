import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/utils/helpers.dart';

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
  });

  @MappableField(key: 'status')
  final bool status;
  @MappableField(
    key: 'data',
    hook: ReceiptHook<String>(key: 'reference'),
  )
  final String reference;
  @MappableField(
    key: 'data',
    hook: ReceiptHook<DateTime>(key: 'paid_at'),
  )
  final DateTime paidAt;
  @MappableField(key: 'data', hook: ReceiptHook<String>(key: 'channel'))
  final String channel;
  @MappableField(
    key: 'data',
    hook: ReceiptHook<int>(key: 'orderId', isMetadata: true),
  )
  final int orderId;
  @MappableField(
    key: 'data',
    hook: ReceiptHook<double>(key: 'amount', isMetadata: true),
  )
  final double amount;
  @MappableField(
    key: 'data',
    hook: ReceiptHook<double>(key: 'deliveryFee', isMetadata: true),
  )
  final double deliveryFee;
  @MappableField(
    key: 'data',
    hook: ReceiptHook<double>(key: 'totalAmount', isMetadata: true),
  )
  final double totalAmount;
}

class ReceiptHook<T> extends MappingHook {
  const ReceiptHook({
    required this.key,
    this.isMetadata = false,
  });

  final String key;
  final bool isMetadata;

  @override
  T beforeDecode(Object? value) {
    final data = value! as JsonMap;
    final rawValue =
        // ignore: avoid_dynamic_calls
        isMetadata ? data['metadata'][key] : data[key];

    if (T == DateTime) {
      return DateTime.parse(rawValue as String) as T;
    } else {
      return rawValue as T;
    }
  }
}
