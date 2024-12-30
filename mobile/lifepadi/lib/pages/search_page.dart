import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/hooks/hooks.dart';
import 'package:lifepadi/models/search.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/search_state.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';

class SearchPage extends HookConsumerWidget {
  const SearchPage({super.key, this.query});

  final String? query;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final searchController = useTextEditingController(text: query);
    final debouncedQuery = useDebounce(searchController.text);
    final searchQuery = useState(query ?? '');

    // Update search query when debounced value changes
    useEffect(
      () {
        if (debouncedQuery.isNotEmpty) {
          searchQuery.value = debouncedQuery;
        }
        return null;
      },
      [debouncedQuery],
    );

    // Listen to text changes
    useEffect(
      () {
        void listener() {
          // Only update if text is not empty to avoid unnecessary API calls
          if (searchController.text.isNotEmpty) {
            searchQuery.value = searchController.text;
          }
        }

        searchController.addListener(listener);
        return () => searchController.removeListener(listener);
      },
      [searchController],
    );

    return Scaffold(
      appBar: MyAppBar(
        title: 'Search',
        height: 135.h,
        bottom: PreferredSize(
          preferredSize: Size.fromHeight(60.h),
          child: Padding(
            padding: kHorizontalPadding,
            child: TextField(
              controller: searchController,
              autofocus: true,
              decoration: InputDecoration(
                hintText: 'Search for products, vendors, categories, etc.',
                suffixIcon: IconButton(
                  icon: const Icon(IconsaxPlusLinear.search_normal),
                  onPressed: () {
                    if (searchController.text.isNotEmpty) {
                      searchQuery.value = searchController.text;
                    }
                  },
                ),
              ),
              onSubmitted: (value) {
                if (value.isNotEmpty) {
                  searchQuery.value = value;
                }
              },
            ),
          ),
        ),
      ),
      body: searchController.text.isEmpty
          ? const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    IconsaxPlusLinear.search_normal,
                    size: 64,
                    color: Colors.grey,
                  ),
                  SizedBox(height: 16),
                  Text(
                    'Looking for something?',
                    style: TextStyle(
                      fontSize: 18,
                      color: Colors.grey,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  Text(
                    'Start typing to search',
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey,
                    ),
                  ),
                ],
              ),
            )
          : ref.watch(searchProvider(query: searchQuery.value)).when(
                data: (searchResult) =>
                    SearchResultList(searchResult: searchResult),
                loading: () =>
                    const Center(child: CircularProgressIndicator.adaptive()),
                error: (error, _) => Center(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 30),
                    child: MyErrorWidget(error: error),
                  ),
                ),
              ),
    );
  }
}

class SearchResultList extends StatelessWidget {
  const SearchResultList({super.key, required this.searchResult});

  final SearchResult searchResult;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: kHorizontalPadding,
      children: [
        if (searchResult.products.isNotEmpty)
          SearchResultExpandable(
            title: 'Products (${searchResult.products.length})',
            children: searchResult.products
                .map((product) => ProductTile(product: product))
                .toList(),
          ),
        if (searchResult.vendors.isNotEmpty)
          SearchResultExpandable(
            title: 'Vendors (${searchResult.vendors.length})',
            children: searchResult.vendors
                .map(
                  (vendor) => VendorCard(
                    name: vendor.name,
                    image: CachedNetworkImageProvider(vendor.imageUrl ?? ''),
                    onTap: () => context.push(
                      ProductsRoute(
                        vendorId: vendor.id,
                        vendorName: vendor.name,
                      ).location,
                    ),
                  ),
                )
                .toList(),
          ),
        if (searchResult.productCategories.isNotEmpty)
          SearchResultExpandable(
            title:
                'Product Categories (${searchResult.productCategories.length})',
            children: searchResult.productCategories
                .map(
                  (category) => CategoryCard(
                    category: category,
                    onTap: () => context.push(
                      ProductsRoute(
                        categoryId: category.id,
                        categoryName: category.name.capitalize(),
                      ).location,
                    ),
                  ),
                )
                .toList(),
          ),
        if (searchResult.vendorCategories.isNotEmpty)
          SearchResultExpandable(
            title:
                'Vendor Categories (${searchResult.vendorCategories.length})',
            children: searchResult.vendorCategories
                .map(
                  (category) => CategoryCard(
                    category: category,
                    onTap: () => context.push(
                      VendorsRoute(
                        categoryId: category.id,
                        name: category.name.capitalize(),
                      ).location,
                    ),
                  ),
                )
                .toList(),
          ),
        if (searchResult.services.isNotEmpty)
          SearchResultExpandable(
            title: 'Services (${searchResult.services.length})',
            children: searchResult.services
                .map(
                  (service) => ServiceCard(
                    name: service.name,
                    imageUrl: service.iconUrl,
                    onTap: () {},
                  ),
                )
                .toList(),
          ),
        if (searchResult.hasNext)
          Center(
            child: ElevatedButton(
              // TODO: Implement load more
              onPressed: () {},
              child: const Text('Load more'),
            ),
          ),
      ],
    );
  }
}

class SearchResultExpandable extends StatelessWidget {
  const SearchResultExpandable({
    super.key,
    required this.title,
    required this.children,
  });

  final String title;
  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return ExpansionTile(
      title: Text(title),
      children: children,
    );
  }
}
