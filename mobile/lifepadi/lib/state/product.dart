import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'product.g.dart';

/// Return a single product by its ID.
@riverpod
FutureOr<Product> product(Ref ref, {required int id}) async {
  final client = ref.read(dioProvider());
  final response = await client.get<JsonMap>(
    '/product/get/$id',
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  ref.cache();
  return ProductMapper.fromMap(response.data!);
}
