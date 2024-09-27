import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/product.dart';

part 'category.mapper.dart';

@MappableClass()
class Category {
  Category({
    required this.id,
    required this.name,
    required this.products,
  });

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'Name')
  final String name;
  @MappableField(key: 'Products')
  final List<Product> products;
}
