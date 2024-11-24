import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/discount.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/models/product.dart';

part 'cart.mapper.dart';

@MappableClass()
class Cart with CartMappable {
  Cart({
    required this.products,
    required this.total,
    required this.subtotal,
    required this.deliveryFee,
    this.discount,
    this.deliveryLocation,
  });

  final List<Product> products;
  final double subtotal;
  final double total;
  final double deliveryFee;
  final Discount? discount;
  final LocationDetails? deliveryLocation;
}
