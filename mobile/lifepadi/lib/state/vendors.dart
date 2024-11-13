import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/models/vendor.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/cache_for.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'vendors.g.dart';

/// Return a list of vendors.
@riverpod
FutureOr<List<Vendor>> vendors(Ref ref, {int pageSize = 10}) async {
  final client = ref.read(dioProvider());
  final response = await client.get<JsonMap>(
    '/vendor/all',
    queryParameters: {
      'pageNumber': 1,
      'pageSize': pageSize,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  final data = List<JsonMap>.from(response.data!['result'] as List);

  ref.cache();
  return data.map(VendorMapper.fromMap).toList();
}

/// Return a list of products by a vendor ID.
@Riverpod(keepAlive: true)
FutureOr<List<Product>> vendorProducts(
  Ref ref, {
  int pageSize = 10,
  int vendorId = 1,
  int pageNumber = 1,
}) async {
  final client = ref.read(dioProvider());
  final response = await client.get<JsonMap>(
    '/vendor/$vendorId/products',
    queryParameters: {
      'pageNumber': pageNumber,
      'pageSize': pageSize,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  final data = List<JsonMap>.from(response.data!['result'] as List);

  ref.cache();
  return data.map(ProductMapper.fromMap).toList();
}
