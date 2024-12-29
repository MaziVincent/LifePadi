import 'package:dart_mappable/dart_mappable.dart';

part 'category.mapper.dart';

/// Represents a type of category.
@MappableEnum(defaultValue: CategoryType.product)
enum CategoryType {
  @MappableValue('Product')
  product,
  @MappableValue('Vendor')
  vendor,
}

/// Represents a category of items.
@MappableClass(discriminatorKey: 'Type')
abstract class Category with CategoryMappable {
  const Category({
    required this.id,
    required this.name,
    this.icon,
    this.type = CategoryType.product,
  });

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'Name')
  final String name;
  @MappableField(key: 'Icon')
  final String? icon;
  @MappableField(key: 'Type')
  final CategoryType type;
}

/// Represents a category of products.
@MappableClass(discriminatorValue: 'Product')
class ProductCategory extends Category with ProductCategoryMappable {
  const ProductCategory({
    required super.id,
    required super.name,
    super.icon,
  });
}

/// Represents a category of vendors.
@MappableClass(discriminatorValue: 'Vendor')
class VendorCategory extends Category with VendorCategoryMappable {
  const VendorCategory({
    required super.id,
    required super.name,
    super.icon,
    super.type = CategoryType.vendor,
  });
}
