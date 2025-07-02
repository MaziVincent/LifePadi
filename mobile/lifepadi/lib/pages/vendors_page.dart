import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';
import 'package:lifepadi/hooks/hooks.dart';
import 'package:lifepadi/models/vendor.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/categories.dart';
import 'package:lifepadi/state/vendors.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:skeletonizer/skeletonizer.dart';

import '../utils/constants.dart';

class VendorsPage extends StatelessWidget {
  const VendorsPage({
    super.key,
    this.serviceId,
    this.categoryId,
    this.name,
  }) : assert(
          ((serviceId == null) != (categoryId == null) && (name != null)) ||
              ((serviceId == null) && (categoryId == null)),
          'Either serviceId or categoryId must be provided, but not both. '
          'If you want to show all vendors, do not provide any of them. '
          'If you want to show vendors for a service, provide serviceId and name. '
          'If you want to show vendors for a category, provide categoryId and name.',
        );

  final int? serviceId;
  final int? categoryId;
  final String? name;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(title: name ?? 'Stores and Vendors'),
      body: _VendorContent(serviceId: serviceId, categoryId: categoryId),
    );
  }
}

mixin VendorPagingLogic {
  final pageSize = 15;

  Future<void> fetchVendorPage(
    WidgetRef ref,
    int pageKey,
    PagingController<int, Vendor> controller,
    Future<List<Vendor>> Function() vendorsFetcher,
  ) async {
    try {
      final vendors = await vendorsFetcher();
      final isLastPage = vendors.length < pageSize;
      if (isLastPage) {
        controller.appendLastPage(vendors);
      } else {
        controller.appendPage(vendors, pageKey + 1);
      }
    } catch (e) {
      logger.e('Failed to fetch vendors', error: e);
      controller.error = e;
    }
  }
}

class _VendorContent extends HookConsumerWidget with VendorPagingLogic {
  _VendorContent({this.serviceId, this.categoryId});

  final int? serviceId;
  final int? categoryId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final pagingController = usePagingController<int, Vendor>(
      firstPageKey: 1,
      fetchPage: (pageKey, controller) => fetchVendorPage(
        ref,
        pageKey,
        controller,
        () => serviceId != null
            ? ref.read(
                vendorsByServiceIdProvider(
                  serviceId: serviceId!,
                  pageNumber: pageKey,
                  pageSize: pageSize,
                ).future,
              )
            : categoryId != null
                ? ref.read(
                    categoryVendorsProvider(
                      pageNumber: pageKey,
                      categoryId: categoryId!,
                      pageSize: pageSize,
                    ).future,
                  )
                : ref.read(
                    vendorsProvider(
                      pageNumber: pageKey,
                      pageSize: pageSize,
                    ).future,
                  ),
      ),
    );

    return Padding(
      padding: kHorizontalPadding.copyWith(top: 8.h),
      child: RefreshIndicator.adaptive(
        onRefresh: () => Future.sync(pagingController.refresh),
        child: PagedGridView<int, Vendor>(
          pagingController: pagingController,
          builderDelegate: PagedChildBuilderDelegate<Vendor>(
            itemBuilder: (context, vendor, index) => VendorCard(
              name: vendor.name,
              image: CachedNetworkImageProvider(vendor.imageUrl ?? ''),
              onTap: () => context.push(
                ProductsRoute(
                  vendorId: vendor.id,
                  vendorName: vendor.name,
                ).location,
              ),
            ),
            firstPageProgressIndicatorBuilder: (context) =>
                const _VendorsLoadingGrid(),
            noItemsFoundIndicatorBuilder: (context) => Center(
              child: Text(
                serviceId == null
                    ? 'No vendors found'
                    : 'No vendors found for this service',
              ),
            ),
          ),
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
            crossAxisSpacing: 8.6.r,
            mainAxisSpacing: 12.05.r,
          ),
        ),
      ),
    );
  }
}

class _VendorsLoadingGrid extends StatelessWidget {
  const _VendorsLoadingGrid();

  @override
  Widget build(BuildContext context) {
    return Skeletonizer(
      child: GridView.builder(
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 3,
          crossAxisSpacing: 8.6.r,
          mainAxisSpacing: 12.05.r,
        ),
        itemCount: 12,
        itemBuilder: (context, index) => VendorCard(
          name: BoneMock.name,
          image: Assets.images.vendors.shoprite.provider(),
          onTap: () {},
        ),
      ),
    );
  }
}
