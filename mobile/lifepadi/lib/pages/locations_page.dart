import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/location.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:skeletonizer/skeletonizer.dart';

class LocationsPage extends ConsumerWidget {
  const LocationsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locations = ref.watch(locationsProvider);

    return Scaffold(
      appBar: const MyAppBar(
        title: 'Locations',
      ),
      body: RefreshIndicator(
        onRefresh: () async => ref.refresh(locationsProvider),
        child: switch (locations) {
          AsyncData(:final value) => _LocationsContent(locations: value),
          AsyncError(:final error) => MyErrorWidget(error: error),
          _ => Skeletonizer(
              child: SuperListView(
                padding: kHorizontalPadding.copyWith(top: 24.h, bottom: 20.h),
                children: [
                  for (final i in [1, 2, 3])
                    LocationCard(
                      onTap: () {},
                      address: BoneMock.address,
                      isDefault: i == 1,
                      padding: EdgeInsets.symmetric(
                        horizontal: 16.w,
                        vertical: 12.h,
                      ),
                    ),
                ].separatedBy(16.verticalSpace),
              ),
            ),
        },
      ),
    );
  }
}

class _LocationsContent extends StatelessWidget {
  const _LocationsContent({
    required this.locations,
  });

  final List<LocationDetails> locations;

  @override
  Widget build(BuildContext context) {
    return SuperListView(
      padding: kHorizontalPadding.copyWith(top: 24.h, bottom: 20.h),
      children: [
        for (final location in locations)
          LocationCard(
            onTap: () {
              context.push(EditLocationRoute(id: location.id!).location);
            },
            address: location.address,
            isDefault: location.isDefault,
            padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
          ),

        /// Add new location button
        PrimaryOutlineButton(
          text: 'Add new location'.toUpperCase(),
          onPressed: () {
            context.push(NewLocationRoute().location);
          },
          textStyle: context.textTheme.bodyLarge?.copyWith(
            color: kDarkPrimaryColor,
            fontWeight: FontWeight.w700,
            fontSize: 14.sp,
          ),
          icon: IconsaxPlusLinear.location_add,
        ),
      ].separatedBy(16.verticalSpace),
    );
  }
}
