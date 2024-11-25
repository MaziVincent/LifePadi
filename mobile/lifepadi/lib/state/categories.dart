import 'package:dio/dio.dart';
import 'package:lifepadi/models/category.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'categories.g.dart';

@riverpod
class Categories extends _$Categories {
  @override
  FutureOr<List<Category>> build({int pageSize = 6}) {
    return _fetchCategories();
  }

  Future<List<Category>> _fetchCategories() async {
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
    return data.map(CategoryMapper.fromMap).toList();
  }

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
}
