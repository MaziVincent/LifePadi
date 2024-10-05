import 'package:cached_network_image/cached_network_image.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_material_design_icons/flutter_material_design_icons.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';
import 'package:lifepadi/models/category.dart';
import 'package:lifepadi/models/product.dart';
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

// TODO: Improve performance w/ super_sliver_list
class HomePage extends StatefulHookConsumerWidget {
  const HomePage({super.key});

  @override
  ConsumerState<HomePage> createState() => _HomePageState();
}

class _HomePageState extends ConsumerState<HomePage> {
  Category? activeCategory;
  final _pagingController = PagingController<int, Product>(firstPageKey: 1);
  CancelToken? _categoryProductsCancelToken;

  @override
  void initState() {
    _pagingController.addPageRequestListener(_fetchPage);
    super.initState();
  }

  Future<void> _fetchPage(int pageKey) async {
    if (activeCategory == null) {
      return;
    }
    try {
      _categoryProductsCancelToken ??= CancelToken();
      final result =
          await ref.read(categoriesProvider().notifier).categoryProducts(
                categoryId: activeCategory!.id,
                pageNumber: pageKey,
                pageSize: 3,
                cancelToken: _categoryProductsCancelToken,
              );

      final alreadyFetchedItemsCount = _pagingController.itemList?.length ?? 0;
      final isLastPage = alreadyFetchedItemsCount == result.totalCount;

      if (isLastPage) {
        _pagingController.appendLastPage(result.data);
      } else {
        final nextPageKey = pageKey + 1;
        _pagingController.appendPage(result.data, nextPageKey);
      }
    } catch (e) {
      if (e is DioException && CancelToken.isCancel(e)) {
        // If the request was cancelled, we don't need to do anything
        // The PagingController will be refreshed by the onTap callback
        return;
      }
      // For other errors, we set the error on the PagingController
      _pagingController.error = e;
    }
  }

  @override
  void dispose() {
    _pagingController
      ..removePageRequestListener(_fetchPage)
      ..dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final activeCategoryIndex = useState(0);
    final vendors = ref.watch(vendorsProvider(pageSize: 3));
    final errands = ref.watch(errandsProvider(pageSize: 4));
    final categories = ref.watch(categoriesProvider());

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
      body: ListView(
        padding: EdgeInsets.only(top: 4.h, left: 24.w, right: 24.w),
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
                    image: CachedNetworkImageProvider(vendor.imageUrl ?? ''),
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
              data: (data) {
                if (activeCategory == null) {
                  setState(
                    () => activeCategory = data[activeCategoryIndex.value],
                  );
                  _pagingController.refresh();
                }

                return ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: data.length,
                  itemBuilder: (context, index) {
                    return CategoryTab(
                      isActive: index == activeCategoryIndex.value,
                      name: data[index].name,
                      onTap: () {
                        activeCategoryIndex.value = index;
                        activeCategory = data[index];
                        final shouldCancel =
                            _categoryProductsCancelToken != null &&
                                !_categoryProductsCancelToken!.isCancelled;
                        if (shouldCancel) {
                          logger.i('Cancelling request');
                          // Cancel any existing request for category's products
                          _categoryProductsCancelToken!
                              .cancel('Switching category');
                        }
                        setState(() {
                          // Create a new cancel token for the new category
                          _categoryProductsCancelToken = CancelToken();
                          // Clear the current items in the PagingController
                          _pagingController.itemList?.clear();
                        });
                        // Refresh the PagingController with the new category
                        _pagingController.refresh();
                      },
                    );
                  },
                  separatorBuilder: (context, index) => 6.93.horizontalSpace,
                );
              },
              error: (err, _) => const Text("Woah, something's gone wrong"),
              loading: () => Skeletonizer(
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: mockTopCategories.length,
                  itemBuilder: (context, index) => Skeleton.leaf(
                    child: CategoryTab(
                      isActive: index == activeCategoryIndex.value,
                      name: mockTopCategories[index],
                      onTap: () {},
                    ),
                  ),
                  separatorBuilder: (context, index) => 6.93.horizontalSpace,
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
          if (activeCategory == null && categories.isLoading)
            ListView.separated(
              itemBuilder: (context, index) {
                final product = mockProducts[index];

                return Skeletonizer(
                  child: ProductTile(
                    id: product.id,
                    image: AssetImage(product.imageUrl),
                    name: product.name,
                    vendor: product.vendor.name,
                    price: product.price,
                  ),
                );
              },
              separatorBuilder: (_, __) => 11.verticalSpace,
              itemCount: mockProducts.length,
              shrinkWrap: true,
              primary: false,
            )
          else
            PagedListView.separated(
              shrinkWrap: true,
              primary: false,
              pagingController: _pagingController,
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
                  return Column(
                    children: [
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
                    ].separatedBy(14.verticalSpace),
                  );
                },
                newPageProgressIndicatorBuilder: (_) => Center(
                  child: Padding(
                    padding: EdgeInsets.symmetric(vertical: 11.h),
                    child: const OrangeyLoadingWheel(),
                  ),
                ),
                noMoreItemsIndicatorBuilder: (context) =>
                    const Center(child: Text('No more items')),
                // TODO: Add more builders to capture the loading and error states
              ),
              separatorBuilder: (context, index) => 14.verticalSpace,
            ),
          15.verticalSpace,
        ],
      ),
    );
  }

  String _buildProductsHeader(String? activeCategory) {
    return activeCategory == null
        ? 'Products'
        : 'Products in ${activeCategory.capitalize()}';
  }
}
