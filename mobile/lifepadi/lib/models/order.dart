import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/models/logistics.dart';
import 'package:lifepadi/models/order_item.dart';
import 'package:lifepadi/models/user.dart';

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
    required this.deliveryLocation,
    this.pickupLocation,
    required this.totalAmount,
    this.logistics,
    this.deliveryFee = 0.0,
    this.rider,
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
  final CheckoutType type;
  @MappableField(key: 'OrderItems')
  final List<OrderItem> items;
  @MappableField(key: 'CreatedAt')
  final DateTime createdAt;
  @MappableField(key: 'TotalAmount')
  final double totalAmount;
  @MappableField(key: 'DeliveryAddress')
  final LocationDetails? deliveryLocation;
  @MappableField(key: 'PickUpAddress')
  final LocationDetails? pickupLocation;
  @MappableField(key: 'Logistics')
  final List<Logistics>? logistics;
  @MappableField(key: 'DeliveryFee')
  final double deliveryFee;
  @MappableField(key: 'Rider')
  final Rider? rider;
}
