import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

import '../router/routes.dart';

class ProductsPage extends HookWidget {
  const ProductsPage({super.key, this.categoryId});

  final int? categoryId;

  @override
  Widget build(BuildContext context) {
    final activeCategory = useState(1);

    return Scaffold(
      appBar: MyAppBar(
        title: 'Products',
        actions: [
          MyIconButton(
            icon: IconsaxPlusLinear.search_normal,
            onPressed: () {
              // TODO: Implement search
            },
          ),
          6.horizontalSpace,
          MyIconButton(
            icon: IconsaxPlusLinear.shopping_cart,
            onPressed: () => context.push(CartRoute().location),
          ),
        ],
      ),
      body: Padding(
        padding: kHorizontalPadding.copyWith(top: 5.h, bottom: 30.h),
        child: Column(
          children: [
            HeaderWithSeeAll(
              title: 'Categories',
              onSeeAllTap: () => context.go(CategoriesRoute().location),
            ),
            13.87.verticalSpace,
            SizedBox(
              height: 43.h,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: featuredCategories.length,
                itemBuilder: (context, index) => CategoryTab(
                  isActive: index + 1 == activeCategory.value,
                  name: featuredCategories[index],
                  onTap: () => activeCategory.value = index + 1,
                ),
                separatorBuilder: (context, index) => 6.93.horizontalSpace,
              ),
            ),
            17.72.verticalSpace,
            Expanded(
              child: SingleChildScrollView(
                child: Column(
                  children: [
                    ProductTile(
                      id: 1,
                      image: Assets.images.bnbBlender.provider(),
                      name: 'BNB Blender',
                      vendor: 'Shoprite Stores',
                      price: 33000,
                    ),
                    ProductTile(
                      id: 2,
                      image: Assets.images.oilPerfumes.provider(),
                      name: 'Oil Perfumes',
                      vendor: 'Beauty Collection',
                      price: 500,
                    ),
                    for (final i in [3, 4, 5])
                      ProductTile(
                        id: i,
                        image: Assets.images.plainTees.provider(),
                        name: 'Plain Tees',
                        vendor: 'Korede Store',
                        price: 5000,
                      ),
                  ].separatedBy(11.verticalSpace),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
