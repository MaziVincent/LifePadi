import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/widgets/my_app_bar.dart';
import 'package:lifepadi/widgets/my_icon_button.dart';
import 'package:remixicon/remixicon.dart';

import '../router/routes.dart';

class ProductDetailsPage extends StatelessWidget {
  const ProductDetailsPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(
        title: 'BNB Blender',
        actions: [
          MyIconButton(
            icon: IconsaxPlusLinear.shopping_cart,
            onPressed: () => context.go(CartRoute().location),
          ),
          2.horizontalSpace,
          MyIconButton(
            icon: Remix.more_2_fill,
            onPressed: () {
              // TODO: Add a popup menu with options: share, report, add to cart, add to wishlist.
            },
          ),
        ],
      ),
      body: Center(
        child: Text('Product details $id'),
      ),
    );
  }
}
