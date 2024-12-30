import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/search.dart';
import 'package:lifepadi/state/client.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'search_state.g.dart';

@riverpod
Future<SearchResult> search(Ref ref, {required String query}) async {
  final client = ref.read(dioProvider());
  final response = await client.get<String>(
    '/product/searchAll',
    queryParameters: {'SearchString': query},
  );

  if (response.data == null) {
    throw Exception('No data returned from the server');
  }

  return SearchResultMapper.fromJson(response.data!);
}
