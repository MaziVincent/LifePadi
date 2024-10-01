import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_material_design_icons/flutter_material_design_icons.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/categories.dart';
import 'package:lifepadi/state/errands.dart';
import 'package:lifepadi/state/vendors.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/mock_data.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';
import 'package:skeletonizer/skeletonizer.dart';

class HomePage extends HookConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final activeCategoryIndex = useState(0);
    final vendors = ref.watch(vendorsProvider(pageSize: 3));
    final errands = ref.watch(errandsProvider(pageSize: 4));
    final categories = ref.watch(categoriesProvider());
    final activeCategory = categories.when(
      data: (data) => data[activeCategoryIndex.value],
      loading: () => null,
      error: (error, stackTrace) => null,
    );

    TextStyle? inputTextStyle() {
      return context.textTheme.bodyMedium?.copyWith(
        color: const Color(0xFF878787),
        fontSize: 14.sp,
        fontWeight: FontWeight.w500,
      );
    }

    OutlineInputBorder inputBorder({Color? color}) {
      return OutlineInputBorder(
        borderRadius: BorderRadius.circular(8.r),
        borderSide: BorderSide(
          color: color ?? const Color(0xFFD6D6D6),
        ),
      );
    }

    return Scaffold(
      appBar: MyAppBar(
        title: Row(
          children: [
            MyIconButton(
              icon: Remix.map_pin_5_line,
              onPressed: () async {
                await displayBottomPanel(
                  context,
                  child: const EditLocationModalForm(),
                );
              },
              backgroundColor: const Color(0x194FAF5A),
              iconColor: kDarkPrimaryColor,
            ),
            8.horizontalSpace,
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
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
                  ],
                ),
                4.verticalSpace,
                Text(
                  'Soja, Lekki Lagos',
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: kDarkTextColor,
                    fontWeight: FontWeight.w600,
                    fontSize: 12.sp,
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          MyIconButton(
            icon: IconsaxPlusLinear.shopping_cart,
            onPressed: () => context.go(CartRoute().location),
          ),
          6.horizontalSpace,
          MyIconButton(
            onPressed: () => context.go(NotificationRoute().location),
            icon: MdiIcons.bellBadgeOutline,
            showBadge: true,
          ),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.only(top: 4.h, left: 24.w, right: 24.w),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Try searchfield package when implementing this
              TextFormField(
                cursorColor: kDarkPrimaryColor,
                decoration: InputDecoration(
                  border: inputBorder(),
                  enabledBorder: inputBorder(),
                  focusedBorder: inputBorder(color: const Color(0xFF21D1A5)),
                  hintText: 'Search product',
                  hintStyle: inputTextStyle(),
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
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: vendors.when(
                  data: (data) => [
                    for (final vendor in data)
                      VendorCard(
                        name: vendor.name,
                        image:
                            CachedNetworkImageProvider(vendor.imageUrl ?? ''),
                        onTap: () {},
                      ),
                    VendorCard(
                      name: 'See more',
                      icon: IconsaxPlusLinear.element_plus,
                      onTap: () => VendorsRoute().go(context),
                    ),
                  ].separatedBy(10.horizontalSpace),
                  error: (error, stackTrace) => [
                    const Text('Woah, something went wrong'),
                  ],
                  loading: () => [
                    for (final v in mockVendors.take(4))
                      Skeletonizer(
                        child: VendorCard(
                          name: v.name,
                          image: AssetImage(v.imageUrl!),
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
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: errands.when(
                  data: (data) => [
                    for (final errand in data)
                      ErrandCard(
                        name: errand.name,
                        imageUrl: errand.iconUrl,
                        onTap: () => context.push(
                          SingleErrandRoute(id: errand.id).location,
                        ),
                      ),
                  ].separatedBy(10.horizontalSpace),
                  error: (error, stackTrace) => [
                    const Text('Woah, something went wrong'),
                  ],
                  loading: () => [
                    for (final (:name, :image) in mockErrands.take(4))
                      Skeletonizer(
                        child: ErrandCard(
                          name: name,
                          imageUrl: image,
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
              SizedBox(
                height: 43.h,
                child: categories.when(
                  data: (data) => ListView.separated(
                    scrollDirection: Axis.horizontal,
                    itemCount: data.length,
                    itemBuilder: (context, index) => CategoryTab(
                      isActive: index == activeCategoryIndex.value,
                      name: data[index].name,
                      onTap: () => activeCategoryIndex.value = index,
                    ),
                    separatorBuilder: (context, index) => 6.93.horizontalSpace,
                  ),
                  error: (err, _) => const Text("Woah, something's gone wrong"),
                  loading: () => Skeletonizer(
                    child: ListView.separated(
                      scrollDirection: Axis.horizontal,
                      itemCount: mockTopCategories.length,
                      itemBuilder: (context, index) => Skeleton.leaf(
                        child: CategoryTab(
                          isActive: index == activeCategoryIndex.value,
                          name: mockTopCategories[index],
                          onTap: () => activeCategoryIndex.value = index + 1,
                        ),
                      ),
                      separatorBuilder: (context, index) =>
                          6.93.horizontalSpace,
                    ),
                  ),
                ),
              ),
              22.72.verticalSpace,
              HeaderWithSeeAll(
                title: _buildProductsHeader(activeCategory?.name),
                onSeeAllTap: () => context.push(
                  ProductsRoute(categoryId: activeCategoryIndex.value).location,
                ),
              ),
              16.verticalSpace,
              Column(
                children: [
                  ...categories.when(
                    data: (data) => [
                      for (final product in activeCategory!.products)
                        ProductTile(
                          id: product.id,
                          name: product.name,
                          image: CachedNetworkImageProvider(product.imageUrl),
                          price: product.price,
                          vendor: product.vendor.name,
                        ),
                    ].separatedBy(12.verticalSpace),
                    error: (error, stackTrace) => [
                      const Text('Woah, something went wrong'),
                    ],
                    loading: () => [
                      for (final product in mockProducts)
                        Skeletonizer(
                          child: ProductTile(
                            id: product.id,
                            image: AssetImage(product.imageUrl),
                            name: product.name,
                            vendor: product.vendor.name,
                            price: product.price,
                          ),
                        ),
                    ].separatedBy(11.verticalSpace),
                  ),
                  19.67.verticalSpace,
                  const OrangeyLoadingWheel(),
                  15.verticalSpace,
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _buildProductsHeader(String? activeCategory) {
    return activeCategory == null
        ? 'Products'
        : 'Products in ${activeCategory.capitalize()}';
  }
}
