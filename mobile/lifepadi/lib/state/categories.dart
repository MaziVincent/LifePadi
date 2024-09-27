// ignore_for_file: inference_failure_on_untyped_parameter, avoid_dynamic_calls

import 'package:lifepadi/models/category.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/cache_for.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/mock_data.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'categories.g.dart';

@riverpod
FutureOr<List<Category>> categories(
  CategoriesRef ref, {
  int pageSize = 6,
}) async {
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

  const dummyImageUrl =
      'https://res.cloudinary.com/dbxapeqzu/image/upload/v1720469766/LifePadi/Vendors/ixc2siciy2cfgr8x0tjd.jpg';
  final data = List<JsonMap>.from(response.data!['result'] as List)
    // FIXME: This is a temp fix for the server returning null Vendors
    // Add mock vendor to each product in each list
    ..map(
      (c) => c['Products']
          .map(
            (p) => p['Vendor'] =
                mockVendors[0].copyWith(imageUrl: dummyImageUrl).toMap(),
          )
          .toList(),
    ).toList();
  logger
    ..i('Second category:')
    ..i(data[1]);

  ref.cache();
  return data.map(CategoryMapper.fromMap).toList();
}
