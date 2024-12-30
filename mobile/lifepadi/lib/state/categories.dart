import 'package:dio/dio.dart';
import 'package:lifepadi/models/category.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/models/vendor.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'categories.g.dart';

/// Holds the state of the categories.
@riverpod
class Categories extends _$Categories {
  @override
  FutureOr<List<Category>> build({int pageSize = 6}) {
    return _fetchProductCategories();
  }

  /// Fetches the product categories from the server.
  Future<List<ProductCategory>> _fetchProductCategories() async {
    final client = ref.read(dioProvider());
    final response = await client.get<JsonMap>(
      '/category/all',
      queryParameters: {
        'pageNumber': 1,
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
  Future<List<Product>> categoryProducts({
    int pageSize = 6,
    int categoryId = 1,
    int pageNumber = 1,
    CancelToken? cancelToken,
  }) async {
    final client = ref.read(dioProvider());
    final response = await client.get<JsonMap>(
      '/category/$categoryId/products',
      queryParameters: {
        'PageNumber': pageNumber,
        'PageSize': pageSize,
      },
      cancelToken: cancelToken,
    );
    if (response.data == null) {
      throw const ServerErrorException('No data returned from the server');
    }

    final data = List<JsonMap>.from(response.data!['result'] as List);

    ref.cache();
    return data.map(ProductMapper.fromMap).toList();
  }

  /// Fetches the vendors of a category from the server.
  Future<List<Vendor>> categoryVendors({
    int categoryId = 1,
    int pageNumber = 1,
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
}
