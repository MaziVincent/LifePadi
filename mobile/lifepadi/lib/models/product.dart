import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/category.dart';
import 'package:lifepadi/models/vendor.dart';

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
    this.quantity = 1,
    this.category,
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
  final int quantity;
  @MappableField(key: 'Category')
  final ProductCategory? category;
}

/// Lite version of Product model without vendor field.
/// Used in contexts where vendor information is not needed (e.g., review displays).
@MappableClass()
class ProductLite with ProductLiteMappable {
  const ProductLite({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.imageUrl,
    this.quantity = 1,
    this.category,
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
  final int quantity;
  @MappableField(key: 'Category')
  final ProductCategory? category;

  static const fromMap = ProductLiteMapper.fromMap;
  static const fromJson = ProductLiteMapper.fromJson;
}
