import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/service.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'errands.g.dart';

@riverpod
FutureOr<List<Service>> services(Ref ref, {int pageSize = 200}) async {
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
  return data.map(ServiceMapper.fromMap).toList();
}
