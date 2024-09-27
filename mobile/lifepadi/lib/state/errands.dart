import 'package:lifepadi/models/errand.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/cache_for.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'errands.g.dart';

@riverpod
FutureOr<List<Errand>> errands(ErrandsRef ref, {int pageSize = 10}) async {
  final client = ref.read(dioProvider());
  final response = await client.get<JsonMap>(
    '/service/all',
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
  return data.map(ErrandMapper.fromMap).toList();
}
