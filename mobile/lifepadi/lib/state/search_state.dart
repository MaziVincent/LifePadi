import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/search.dart';
import 'package:lifepadi/state/client.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'search_state.g.dart';

/// Make a search request to the server
@riverpod
Future<SearchResult> search(
  Ref ref, {
  required String query,
  int page = 1,
}) async {
  final client = ref.read(dioProvider());
  final response = await client.get<String>(
    '/product/searchAll',
    queryParameters: {
      'SearchString': query,
      'PageNumber': page,
    },
  );

  if (response.data == null) {
    throw Exception('No data returned from the server');
  }

  return SearchResultMapper.fromJson(response.data!);
}

/// Keep track of paginated search results
@riverpod
class PaginatedSearch extends _$PaginatedSearch {
  @override
  FutureOr<SearchResult> build({required String query}) async {
    return _fetchPage(query, 1);
  }

  Future<SearchResult> _fetchPage(String query, int page) async {
    final result =
        await ref.read(searchProvider(query: query, page: page).future);
    return result;
  }

  Future<void> loadMore() async {
    final currentState = state;
    if (currentState is AsyncData) {
      final currentValue = currentState.value!;
      if (!currentValue.hasNext) return;

      state = const AsyncLoading<SearchResult>().copyWithPrevious(currentState);

      try {
        final nextPage = currentValue.currentPage + 1;
        final newResult = await _fetchPage(query, nextPage);

        state = AsyncData(
          SearchResult(
            vendorCategories: [
              ...currentValue.vendorCategories,
              ...newResult.vendorCategories,
            ],
            productCategories: [
              ...currentValue.productCategories,
              ...newResult.productCategories,
            ],
            products: [...currentValue.products, ...newResult.products],
            vendors: [...currentValue.vendors, ...newResult.vendors],
            services: [...currentValue.services, ...newResult.services],
            currentPage: newResult.currentPage,
            totalPages: newResult.totalPages,
            totalCount: newResult.totalCount,
            hasNext: newResult.hasNext,
            hasPrevious: newResult.hasPrevious,
          ),
        );
      } catch (e, st) {
        state = AsyncError<SearchResult>(e, st).copyWithPrevious(currentState);
      }
    }
  }
}
