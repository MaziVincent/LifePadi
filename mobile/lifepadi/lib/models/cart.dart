import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/discount.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/models/product.dart';

part 'cart.mapper.dart';

@MappableClass()
class Cart with CartMappable {
  Cart({
    required this.products,
    required this.subtotal,
    this.discount,
    this.deliveryLocation,
  });

  final List<Product> products;
  final double subtotal;
  final Discount? discount;
  final LocationDetails? deliveryLocation;
  bool get isEmpty => products.isEmpty;
}
