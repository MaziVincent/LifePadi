import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
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
    // TODO: Paginate vendors
    return Scaffold(
      appBar: MyAppBar(title: serviceName ?? 'Stores and Vendors'),
      body: serviceId == null

          /// All vendors
          ? Consumer(
              builder: (context, ref, child) {
                final vendorsAsync = ref.watch(vendorsProvider());

                return _VendorsContent(vendorsAsync: vendorsAsync);
              },
            )

          /// Vendors by service id
          : Consumer(
              builder: (context, ref, child) {
                final vendorsAsync = ref
                    .watch(vendorsByServiceIdProvider(serviceId: serviceId!));

                return _VendorsContent(vendorsAsync: vendorsAsync);
              },
            ),
    );
  }
}

class _VendorsContent extends StatelessWidget {
  const _VendorsContent({
    required this.vendorsAsync,
  });

  final AsyncValue<List<Vendor>> vendorsAsync;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: kHorizontalPadding.copyWith(top: 8.h),
      child: switch (vendorsAsync) {
        AsyncError(:final error) => MyErrorWidget(error: error),
        AsyncData(value: final vendors) => GridView.builder(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              crossAxisSpacing: 8.6.r,
              mainAxisSpacing: 12.05.r,
            ),
            itemCount: vendors.length,
            itemBuilder: (context, index) => VendorCard(
              name: vendors[index].name,
              image: CachedNetworkImageProvider(
                vendors[index].imageUrl ?? '',
              ),
              onTap: () => context.push(
                ProductsRoute(
                  vendorId: vendors[index].id,
                  vendorName: vendors[index].name,
                ).location,
              ),
            ),
          ),
        _ => Skeletonizer(
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
          ),
      },
    );
  }
}
