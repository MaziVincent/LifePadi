import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/widgets.dart';

class ProductsPage extends HookWidget {
  const ProductsPage({
    super.key,
    required this.categoryId,
    required this.categoryName,
  });

  final int categoryId;
  final String categoryName;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(
        title: categoryName,
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
        padding: kHorizontalPadding.copyWith(top: 5.h, bottom: 11.h),
        child: CategoryProducts(
          categoryId: categoryId,
          pageSize: 6,
        ),
      ),
    );
  }
}
