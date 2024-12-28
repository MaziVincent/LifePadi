import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';
import 'package:lifepadi/hooks/hooks.dart';
import 'package:lifepadi/models/vendor.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/vendors.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:skeletonizer/skeletonizer.dart';

import '../utils/constants.dart';

class VendorsPage extends StatelessWidget {
  const VendorsPage({
    super.key,
    this.serviceId,
    this.serviceName,
  });

  final int? serviceId;
  final String? serviceName;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(title: serviceName ?? 'Stores and Vendors'),
      body: serviceId == null
          ? const _AllVendorsContent()
          : _ServiceVendorsContent(serviceId: serviceId!),
    );
  }
}

class _AllVendorsContent extends HookConsumerWidget {
  const _AllVendorsContent();

  static const _pageSize = 15;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final pagingController = usePagingController<int, Vendor>(
      firstPageKey: 1,
      fetchPage: (pageKey, controller) => _fetchPage(
        ref,
        pageKey,
        controller,
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
            noItemsFoundIndicatorBuilder: (context) =>
                const Center(child: Text('No vendors found')),
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

  Future<void> _fetchPage(
    WidgetRef ref,
    int pageKey,
    PagingController<int, Vendor> controller,
  ) async {
    try {
      final vendors = await ref.read(
        vendorsProvider(
          pageNumber: pageKey,
          pageSize: _pageSize,
        ).future,
      );

      final isLastPage = vendors.length < _pageSize;
      if (isLastPage) {
        controller.appendLastPage(vendors);
      } else {
        controller.appendPage(vendors, pageKey + 1);
      }
    } catch (e) {
      controller.error = e;
    }
  }
}

class _ServiceVendorsContent extends HookConsumerWidget {
  const _ServiceVendorsContent({required this.serviceId});

  final int serviceId;
  static const _pageSize = 15;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final pagingController = usePagingController<int, Vendor>(
      firstPageKey: 1,
      fetchPage: (pageKey, controller) => _fetchPage(
        ref,
        pageKey,
        controller,
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
            noItemsFoundIndicatorBuilder: (context) =>
                const Center(child: Text('No vendors found for this service')),
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

  Future<void> _fetchPage(
    WidgetRef ref,
    int pageKey,
    PagingController<int, Vendor> controller,
  ) async {
    try {
      final vendors = await ref.read(
        vendorsByServiceIdProvider(
          serviceId: serviceId,
          pageNumber: pageKey,
          pageSize: _pageSize,
        ).future,
      );

      final isLastPage = vendors.length < _pageSize;
      if (isLastPage) {
        controller.appendLastPage(vendors);
      } else {
        controller.appendPage(vendors, pageKey + 1);
      }
    } catch (e) {
      controller.error = e;
    }
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
