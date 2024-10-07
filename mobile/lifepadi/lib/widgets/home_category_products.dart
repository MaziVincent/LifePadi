import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';
import 'package:lifepadi/hooks/hooks.dart';
import 'package:lifepadi/models/category.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/state/categories.dart';
import 'package:lifepadi/widgets/widgets.dart';

class HomeCategoryProducts extends HookConsumerWidget {
  const HomeCategoryProducts({
    super.key,
    required this.category,
  });

  final Category category;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final controller = usePagingController<int, Product>(
      firstPageKey: 1,
      fetchPage: (pageKey, controller) => _fetchPage(
        ref,
        pageKey,
        controller,
        categoryId: category.id,
      ),
    );

    useEffect(
      () {
        controller.refresh();
        return null;
      },
      [category.id],
    );

    return PagedListView<int, Product>.separated(
      shrinkWrap: true,
      primary: false,
      pagingController: controller,
      builderDelegate: PagedChildBuilderDelegate<Product>(
        itemBuilder: (context, product, index) {
          return ProductTile(
            id: product.id,
            name: product.name,
            image: CachedNetworkImageProvider(product.imageUrl),
            price: product.price,
            vendor: product.vendor.name,
          );
        },
        firstPageProgressIndicatorBuilder: (_) {
          return const MockProductsSkeleton();
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
    );
  }

  Future<void> _fetchPage(
    WidgetRef ref,
    int pageKey,
    PagingController<int, Product> controller, {
    required int categoryId,
  }) async {
    try {
      const pageSize = 3;
      final result =
          await ref.read(categoriesProvider().notifier).categoryProducts(
                categoryId: categoryId,
                pageNumber: pageKey,
                pageSize: pageSize,
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
