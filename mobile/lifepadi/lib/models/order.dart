import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/order_item.dart';

part 'order.mapper.dart';

@MappableEnum(defaultValue: OrderStatus.pending)
enum OrderStatus {
  @MappableValue('Pending')
  pending,
  @MappableValue('Ongoing')
  ongoing,
  @MappableValue('Completed')
  completed,
  @MappableValue('Cancelled')
  cancelled,
}

@MappableClass()
class Order with OrderMappable {
  Order({
    required this.id,
    required this.status,
    required this.orderId,
    required this.isDelivered,
    required this.type,
    required this.items,
    required this.createdAt,
  });

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'Status')
  final OrderStatus status;
  @MappableField(key: 'Order_Id')
  final String orderId;
  @MappableField(key: 'IsDelivered')
  final bool isDelivered;
  @MappableField(key: 'Type')
  final String type;
  @MappableField(key: 'OrderItems')
  final List<OrderItem> items;
  @MappableField(key: 'CreatedAt')
  final DateTime createdAt;
  double get totalAmount => items.fold(
        0,
        (previousValue, element) => previousValue + element.totalAmount,
      );
}
