import 'package:flutter/material.dart';
import 'package:flutter_material_design_icons/flutter_material_design_icons.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/pages/product_details_page.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';

import 'circular_button.dart';

class StoreNameWithWishlistAndShare extends StatelessWidget {
  const StoreNameWithWishlistAndShare({
    super.key,
  });

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
            'Shoprite',
            style: context.textTheme.bodyLarge?.copyWith(
              color: kDarkPrimaryColor,
              fontSize: 16,
              fontWeight: FontWeight.w500,
            ),
          ),
          Row(
            children: [
              CircularButton(
                onTap: () {
                  // TODO: Toggle product in wishlist.
                },
                child: Icon(
                  MdiIcons.heartOutline,
                  color: const Color(0xFFF14336),
                  size: 24.sp,
                ),
              ),
              CircularButton(
                onTap: () {
                  // TODO: Share product.
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
