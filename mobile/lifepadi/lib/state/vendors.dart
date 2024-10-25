import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/cache_for.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'vendors.g.dart';

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

  final data = List<JsonMap>.from(response.data!['result'] as List)
    // Add empty tokens to avoid null errors in the model
    ..map(stripAuth).toList();

  ref.cache();
  return data.map(VendorMapper.fromMap).toList();
}
