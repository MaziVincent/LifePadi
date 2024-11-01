import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/product.dart';

part 'cart.mapper.dart';

@MappableClass()
class Cart with CartMappable {
  Cart({
    required this.products,
    required this.total,
    required this.subtotal,
    required this.deliveryFee,
    required this.discount,
    this.selectedLocationId =
        1, // ? I assume this is for the default location for now
  });

  final List<Product> products;
  final double subtotal;
  final double total;
  final double deliveryFee;
  final double discount;
  final int selectedLocationId;
}
