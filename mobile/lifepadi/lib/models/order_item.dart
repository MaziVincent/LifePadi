import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/product.dart';

part 'order_item.mapper.dart';

@MappableClass()
class OrderItem with OrderItemMappable {
  OrderItem({
    required this.id,
    required this.quantity,
    required this.amount,
    required this.totalAmount,
    required this.name,
    required this.description,
    required this.orderId,
    this.weight,
    this.isFragile,
    required this.productId,
    this.product,
  });

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'Quantity')
  final int quantity;
  @MappableField(key: 'Amount')
  final double amount;
  @MappableField(key: 'TotalAmount')
  final double totalAmount;
  @MappableField(key: 'Name')
  final String name;
  @MappableField(key: 'Weight')
  final double? weight;
  @MappableField(key: 'Description')
  final String description;
  @MappableField(key: 'IsFragile')
  final bool? isFragile;
  @MappableField(key: 'ProductId')
  final int productId;
  @MappableField(key: 'OrderId')
  final int orderId;
  @MappableField(key: 'Product')
  final Product? product;
}
