import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/user.dart';

part 'product.mapper.dart';

@MappableClass()
class Product with ProductMappable {
  Product({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.imageUrl,
    required this.vendor,
  });

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'Name')
  final String name;
  @MappableField(key: 'Description')
  final String description;
  @MappableField(key: 'Price')
  final double price;
  @MappableField(key: 'ProductImgUrl')
  final String imageUrl;
  @MappableField(key: 'Vendor')
  final Vendor vendor;
}
