import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/vendor_products.dart';
import 'package:lifepadi/widgets/widgets.dart';

class ProductsPage extends HookWidget {
  const ProductsPage({
    super.key,
    this.categoryId,
    this.categoryName,
    this.vendorId,
    this.vendorName,
  }) : assert(
          !(categoryId != null && vendorId != null) &&
                  (categoryId != null && categoryName != null) ||
              (vendorId != null && vendorName != null),
          'categoryId and categoryName or vendorId and vendorName must not be null, but not both',
        );

  final int? categoryId;
  final String? categoryName;
  final int? vendorId;
  final String? vendorName;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(
        title: categoryName ?? vendorName!,
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
        child: categoryId != null
            ? CategoryProducts(
                categoryId: categoryId!,
                pageSize: 6,
              )
            : VendorProducts(
                vendorId: vendorId!,
                pageSize: 6,
              ),
      ),
    );
  }
}
