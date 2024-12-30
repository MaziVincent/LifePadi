import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/category.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/models/vendor.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'categories.g.dart';

/// Fetches the product categories from the server.
@Riverpod(keepAlive: true)
Future<List<ProductCategory>> productCategories(
  Ref ref, {
  int pageSize = 6,
  int pageNumber = 1,
}) async {
  final client = ref.read(dioProvider());
  final response = await client.get<JsonMap>(
    '/category/all',
    queryParameters: {
      'pageNumber': pageNumber,
      'pageSize': pageSize,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  final data = List<JsonMap>.from(response.data!['result'] as List).toList();

  ref.cache();
  return data.map(ProductCategoryMapper.fromMap).toList();
}

/// Fetches the products of a category from the server.
@Riverpod(keepAlive: true)
Future<List<Product>> categoryProducts(
  Ref ref, {
  required int categoryId,
  required int pageNumber,
  required int pageSize,
}) async {
  final client = ref.read(dioProvider());
  final response = await client.get<JsonMap>(
    '/category/$categoryId/products',
    queryParameters: {
      'PageNumber': pageNumber,
      'PageSize': pageSize,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  final data = List<JsonMap>.from(response.data!['result'] as List);

  ref.cache();
  return data.map(ProductMapper.fromMap).toList();
}

/// Fetches the vendors of a category from the server.
@Riverpod(keepAlive: true)
Future<List<Vendor>> categoryVendors(
  Ref ref, {
  required int categoryId,
  required int pageNumber,
  required int pageSize,
}) async {
  final client = ref.read(dioProvider());
  final response = await client.get<JsonMap>(
    '/vendorcategory/vendors/$categoryId',
    queryParameters: {
      'PageNumber': pageNumber,
      'PageSize': pageSize,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  final data = List<JsonMap>.from(response.data!['result'] as List);

  ref.cache();
  return data.map(VendorMapper.fromMap).toList();
}
