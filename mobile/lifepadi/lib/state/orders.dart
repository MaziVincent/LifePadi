import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/cache_for.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'orders.g.dart';

@Riverpod(keepAlive: true)
FutureOr<List<Order>> orders(
  Ref ref, {
  int pageSize = 5,
  int pageNumber = 1,
  required String status,
}) async {
  final user = ref.read(authControllerProvider);
  final userId = user.maybeWhen(
    data: (user) => user.id,
    orElse: () => null,
  );
  if (userId == null) {
    return [];
  }

  final client = ref.read(dioProvider());
  final response = await client.get<JsonMap>(
    '/order/customer/$userId',
    queryParameters: {
      'pageNumber': pageNumber,
      'pageSize': pageSize,
      'SearchString': status,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  final data = List<JsonMap>.from(response.data!['result'] as List);

  ref.cache();
  return data.map(OrderMapper.fromMap).toList();
}
