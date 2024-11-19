import 'package:flutter/material.dart';
import 'package:flutter_material_design_icons/flutter_material_design_icons.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/state/wishlist.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';

import 'buttons/circular_button.dart';

class StoreNameWithWishlistAndShare extends StatelessWidget {
  const StoreNameWithWishlistAndShare({
    super.key,
    required this.product,
  });

  final Product product;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 54.h,
      padding: EdgeInsets.symmetric(vertical: 7.h),
      decoration: const BoxDecoration(
        border: Border(
          top: BorderSide(color: kStrokeColor),
          bottom: BorderSide(color: kStrokeColor),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            product.vendor.name,
            style: context.textTheme.bodyLarge?.copyWith(
              color: kDarkPrimaryColor,
              fontSize: 16,
              fontWeight: FontWeight.w500,
            ),
          ),
          Row(
            children: [
              Consumer(
                builder: (context, ref, child) {
                  final wishlistAsync = ref.watch(wishlistProvider);
                  final isInWishlist = wishlistAsync.valueOrNull?.any(
                        (p) => p.id == product.id,
                      ) ??
                      false;

                  return CircularButton(
                    onTap: () {
                      ref.read(wishlistProvider.notifier).toggle(product);
                    },
                    child: Icon(
                      isInWishlist ? MdiIcons.heart : MdiIcons.heartOutline,
                      color: const Color(0xFFF14336),
                      size: 24.sp,
                    ),
                  );
                },
              ),
              CircularButton(
                onTap: () {
                  // TODO: Implement sharing of product
                },
                child: Assets.icons.share.image(
                  width: 16.sp,
                  height: 16.sp,
                ),
              ),
            ].separatedBy(10.horizontalSpace),
          ),
        ],
      ),
    );
  }
}
