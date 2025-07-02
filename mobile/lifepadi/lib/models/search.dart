import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/category.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/models/service.dart';
import 'package:lifepadi/models/vendor.dart';

part 'search.mapper.dart';

@MappableClass()
class SearchResult with SearchResultMappable {
  SearchResult({
    required this.vendorCategories,
    required this.productCategories,
    required this.products,
    required this.vendors,
    required this.services,
    required this.currentPage,
    required this.totalPages,
    required this.totalCount,
    required this.hasNext,
    required this.hasPrevious,
  });

  @MappableField(key: 'VendorCategories')
  final List<VendorCategory> vendorCategories;
  @MappableField(key: 'Categories')
  final List<ProductCategory> productCategories;
  @MappableField(key: 'Products')
  final List<Product> products;
  @MappableField(key: 'Vendors')
  final List<Vendor> vendors;
  @MappableField(key: 'Services')
  final List<Service> services;
  @MappableField(key: 'CurrentPage')
  final int currentPage;
  @MappableField(key: 'TotalPages')
  final int totalPages;
  @MappableField(key: 'TotalCount')
  final int totalCount;
  @MappableField(key: 'HasNext')
  final bool hasNext;
  @MappableField(key: 'HasPrevious')
  final bool hasPrevious;
}
