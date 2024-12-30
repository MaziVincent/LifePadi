import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';
import 'package:lifepadi/hooks/hooks.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/state/categories.dart';
import 'package:lifepadi/widgets/layouts/my_paged_list_view.dart';
import 'package:lifepadi/widgets/widgets.dart';

class CategoryProducts extends HookConsumerWidget {
  const CategoryProducts({
    super.key,
    required this.categoryId,
    this.pageSize = 3,
  });

  final int categoryId;
  final int pageSize;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = usePagingController<int, Product>(
      firstPageKey: 1,
      fetchPage: (pageKey, controller) => _fetchPage(
        ref,
        pageKey,
        controller,
      ),
    );

    useEffect(
      () {
        controller.refresh();
        return null;
      },
      [categoryId],
    );

    return RefreshIndicator.adaptive(
      onRefresh: () => Future.sync(controller.refresh),
      child: MyPagedListView<int, Product>.separated(
        shrinkWrap: true,
        primary: false,
        pagingController: controller,
        builderDelegate: PagedChildBuilderDelegate<Product>(
          itemBuilder: (context, product, index) {
            return ProductTile(
              product: product,
            );
          },
          firstPageProgressIndicatorBuilder: (_) {
            return MockProductsSkeleton(count: pageSize);
          },
          newPageProgressIndicatorBuilder: (_) => Center(
            child: Padding(
              padding: EdgeInsets.symmetric(vertical: 11.h),
              child: const OrangeyLoadingWheel(),
            ),
          ),
          noItemsFoundIndicatorBuilder: (context) =>
              const Center(child: Text('No products found')),
        ),
        separatorBuilder: (context, index) => 14.verticalSpace,
      ),
    );
  }

  Future<void> _fetchPage(
    WidgetRef ref,
    int pageKey,
    PagingController<int, Product> controller,
  ) async {
    try {
      final result = await ref.read(
        categoryProductsProvider(
          pageNumber: pageKey,
          categoryId: categoryId,
          pageSize: pageSize,
        ).future,
      );

      final isLastPage = result.length < pageSize;

      if (isLastPage) {
        controller.appendLastPage(result);
      } else {
        final nextPageKey = pageKey + 1;
        controller.appendPage(result, nextPageKey);
      }
    } catch (e) {
      controller.error = e;
    }
  }
}
