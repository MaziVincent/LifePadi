import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class ProductsPage extends HookWidget {
  const ProductsPage({super.key, this.categoryId});

  final int? categoryId;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(
        title: 'Fashion',
        bottom: PreferredSize(
          preferredSize: Size(12.h, double.infinity),
          child: 12.verticalSpace,
        ),
        height: 87.h,
        actions: [
          MyIconButton(
            icon: IconsaxPlusLinear.search_normal,
            onPressed: () {
              // TODO: Implement products search
            },
          ),
          MyIconButton(
            icon: IconsaxPlusLinear.shopping_cart,
            onPressed: () => context.push(CartRoute().location),
          ),
        ],
      ),
      body: Padding(
        padding: kHorizontalPadding.copyWith(top: 5.h),
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
    );
  }
}
