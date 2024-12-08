import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_material_design_icons/flutter_material_design_icons.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/categories.dart';
import 'package:lifepadi/state/errands.dart';
import 'package:lifepadi/state/location.dart';
import 'package:lifepadi/state/vendors.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';
import 'package:skeletonizer/skeletonizer.dart';

class HomePage extends HookConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final vendors = ref.watch(vendorsProvider(pageSize: 3));
    final errands = ref.watch(errandsProvider(pageSize: 4));
    final activeCategoryIndex = useState(0);
    final categories = ref.watch(categoriesProvider());
    final locationDetails = ref.watch(currentLocationProvider);

    return Scaffold(
      appBar: MyAppBar(
        height: 85.h,
        title: Row(
          children: [
            MyIconButton(
              icon: Remix.map_pin_5_line,
              onPressed: () {},
              backgroundColor: const Color(0x194FAF5A),
              iconColor: kDarkPrimaryColor,
            ),
            8.horizontalSpace,
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Current location',
                  style: context.textTheme.bodySmall?.copyWith(
                    color: kLightTextColor,
                    fontWeight: FontWeight.w400,
                    fontSize: 12.sp,
                    letterSpacing: 0.16,
                  ),
                ),
                4.verticalSpace,
                SizedBox(
                  width: 120.w,
                  child: Text(
                    locationDetails.when(
                      data: (data) => data.shortAddress,
                      loading: () => 'Fetching location...',
                      error: (_, __) => 'Could not fetch location',
                    ),
                    style: context.textTheme.bodyMedium?.copyWith(
                      color: kDarkTextColor,
                      fontWeight: FontWeight.w600,
                      fontSize: 12.sp,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          const CartIconWidget(),
          6.horizontalSpace,
          MyIconButton(
            onPressed: () => context.go(NotificationRoute().location),
            icon: MdiIcons.bellBadgeOutline,
            showBadge: true,
          ),
        ],
      ),
      body: SuperListView(
        padding: EdgeInsets.only(top: 4.h, left: 24.w, right: 24.w),
        children: [
          // TODO: Try searchfield package when implementing this
          TextFormField(
            cursorColor: kDarkPrimaryColor,
            decoration: InputDecoration(
              border: inputBorder(),
              enabledBorder: inputBorder(),
              focusedBorder: inputBorder(color: const Color(0xFF21D1A5)),
              hintText: 'Search product',
              hintStyle: inputTextStyle(context),
              contentPadding:
                  EdgeInsets.symmetric(horizontal: 12.w, vertical: 14.h),
              prefixIcon: const Icon(
                IconsaxPlusLinear.search_normal,
                size: 20,
                color: Color(0xFF878787),
              ),
              suffixIcon: GestureDetector(
                onTap: () async => displayBottomPanel(
                  context,
                  child: const FilterModal(),
                ),
                child: Icon(
                  IconsaxPlusBold.filter_search,
                  size: 24.r,
                  color: kDarkPrimaryColor,
                ),
              ),
            ),
            keyboardType: TextInputType.text,
            textInputAction: TextInputAction.search,
            style: context.textTheme.bodyLarge?.copyWith(
              color: Colors.black,
              fontSize: 16.sp,
              fontWeight: FontWeight.w400,
              letterSpacing: 0.12.r,
            ),
            onTapOutside: (e) => FocusScope.of(context).unfocus(),
            onFieldSubmitted: (String? value) {
              logger
                ..i('Search value:')
                ..i(value);
            },
          ),
          16.verticalSpace,
          const SectionTitle('Stores and Vendors'),
          16.verticalSpace,
          vendors.when(
            data: (data) => Row(
              children: [
                for (final vendor in data)
                  VendorCard(
                    name: vendor.name,
                    image: CachedNetworkImageProvider(vendor.imageUrl ?? ''),
                    onTap: () => context.push(
                      ProductsRoute(
                        vendorId: vendor.id,
                        vendorName: vendor.name,
                      ).location,
                    ),
                  ),
                VendorCard(
                  name: 'See more',
                  icon: IconsaxPlusLinear.element_plus,
                  onTap: () => VendorsRoute().go(context),
                ),
              ].separatedBy(10.horizontalSpace),
            ),
            error: (error, _) => MyErrorWidget(error: error),
            loading: () => Row(
              children: [
                for (final _ in [1, 2, 3, 4])
                  Skeletonizer(
                    child: VendorCard(
                      name: BoneMock.name,
                      image: Assets.images.vendors.shoprite.provider(),
                      onTap: () {},
                    ),
                  ),
              ].separatedBy(10.horizontalSpace),
            ),
          ),
          16.verticalSpace,
          HeaderWithSeeAll(
            title: 'Service Errands',
            onSeeAllTap: () => context.go(const ErrandsRoute().location),
          ),
          16.verticalSpace,
          errands.when(
            data: (data) => Row(
              children: [
                for (final errand in data)
                  ErrandCard(
                    name: errand.name,
                    imageUrl: errand.iconUrl,
                    onTap: () => context.push(
                      SingleErrandRoute(id: errand.id).location,
                    ),
                  ),
              ].separatedBy(10.horizontalSpace),
            ),
            error: (error, _) => MyErrorWidget(error: error),
            loading: () => Row(
              children: [
                for (final _ in [1, 2, 3, 4])
                  Skeletonizer(
                    child: ErrandCard(
                      name: BoneMock.name,
                      imageUrl: Assets.icons.cookingGas.path,
                      onTap: () {},
                      isNetworkImage: false,
                    ),
                  ),
              ].separatedBy(10.horizontalSpace),
            ),
          ),
          16.verticalSpace,
          HeaderWithSeeAll(
            title: 'Categories',
            onSeeAllTap: () => context.go(CategoriesRoute().location),
          ),
          13.87.verticalSpace,
          categories.when(
            data: (categoryList) {
              return Column(
                children: [
                  SizedBox(
                    height: 43.h,
                    child: SuperListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: categoryList.length,
                      itemBuilder: (context, index) {
                        return CategoryTab(
                          isActive: index == activeCategoryIndex.value,
                          name: categoryList[index].name,
                          onTap: () => activeCategoryIndex.value = index,
                        );
                      },
                      separatorBuilder: (context, index) =>
                          6.93.horizontalSpace,
                    ),
                  ),
                  22.72.verticalSpace,
                  HeaderWithSeeAll(
                    title:
                        'Products in ${categoryList[activeCategoryIndex.value].name.capitalize()}',
                    onSeeAllTap: () => context.push(
                      ProductsRoute(
                        categoryId: categoryList[activeCategoryIndex.value].id,
                        categoryName: categoryList[activeCategoryIndex.value]
                            .name
                            .capitalize(),
                      ).location,
                    ),
                  ),
                  16.verticalSpace,
                  CategoryProducts(
                    categoryId: categoryList[activeCategoryIndex.value].id,
                  ),
                  15.verticalSpace,
                ],
              );
            },
            error: (err, _) => MyErrorWidget(error: err),
            loading: () => Column(
              children: [
                Skeletonizer(
                  child: SizedBox(
                    height: 43.h,
                    child: SuperListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: 6,
                      itemBuilder: (context, index) => Skeleton.leaf(
                        child: CategoryTab(
                          isActive: index == activeCategoryIndex.value,
                          name: BoneMock.name,
                          onTap: () {},
                        ),
                      ),
                      separatorBuilder: (context, index) =>
                          6.93.horizontalSpace,
                    ),
                  ),
                ),
                22.72.verticalSpace,
                Skeletonizer(
                  child: HeaderWithSeeAll(
                    title: 'Products in ${BoneMock.name}',
                    onSeeAllTap: () {},
                  ),
                ),
                16.verticalSpace,
                const MockProductsSkeleton(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
