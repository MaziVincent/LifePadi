import 'package:flutter/material.dart';
import 'package:flutter_material_design_icons/flutter_material_design_icons.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:remixicon/remixicon.dart';

import '../widgets/my_icon_button.dart';
import '../widgets/vendor_card.dart';

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final textTheme = Theme.of(context).textTheme;

    TextStyle? inputTextStyle() {
      return textTheme.bodyMedium?.copyWith(
        color: const Color(0xFF878787),
        fontSize: 14.sp,
        fontWeight: FontWeight.w500,
      );
    }

    OutlineInputBorder inputBorder({Color? color}) {
      return OutlineInputBorder(
        borderRadius: BorderRadius.circular(8.r),
        borderSide: BorderSide(
          color: color ?? const Color(0xFF878787),
        ),
      );
    }

    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(75.h),
        child: Padding(
          padding: EdgeInsets.only(top: 16.h, bottom: 17.h),
          child: AppBar(
            title: Row(
              children: [
                MyIconButton(
                  icon: Remix.map_pin_5_line,
                  onPressed: () {
                    // TODO: Display a modal bottom sheet with a form to update the user's delivery location.
                    // The modal should have a drag handle.
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
                          style: textTheme.bodySmall?.copyWith(
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
                      style: textTheme.bodyMedium?.copyWith(
                        color: kDarkTextColor,
                        fontWeight: FontWeight.w600,
                        fontSize: 12.sp,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            backgroundColor: Colors.white,
            surfaceTintColor: Colors.white,
            actions: [
              MyIconButton(
                icon: IconsaxPlusLinear.shopping_cart,
                onPressed: () {
                  // TODO: Go to cart page.
                },
              ),
              6.horizontalSpace,
              MyIconButton(
                onPressed: () {
                  // TODO: Go to notifications page.
                },
                icon: MdiIcons.bellBadgeOutline,
                showBadge: true,
              ),
              18.horizontalSpace,
            ],
          ),
        ),
      ),
      body: Padding(
        padding: EdgeInsets.only(top: 4.h, left: 24.w, right: 24.w),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Try searchfield package when implementing this
            TextFormField(
              cursorColor: kDarkPrimaryColor,
              decoration: InputDecoration(
                border: inputBorder(),
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
                  onTap: () {
                    // TODO: Open search filter modal
                  },
                  child: Icon(
                    IconsaxPlusBold.filter_search,
                    size: 24.r,
                    color: kDarkPrimaryColor,
                  ),
                ),
              ),
              keyboardType: TextInputType.text,
              textInputAction: TextInputAction.search,
              style: textTheme.bodyLarge?.copyWith(
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
            Text(
              'Stores and Vendors',
              style: textTheme.bodyLarge?.copyWith(
                color: const Color(0xFF0F0F0F),
                fontSize: 16.sp,
                fontWeight: FontWeight.w600,
              ),
            ),
            16.verticalSpace,
            Row(
              children: [
                VendorCard(
                  name: 'McDonald',
                  image: Assets.images.mcdonald.provider(),
                ),
                VendorCard(
                  name: 'Shoprite',
                  image: Assets.images.shoprite.provider(),
                ),
                VendorCard(
                  name: "Domino's Pizza",
                  image: Assets.images.dominosPizza.provider(),
                ),
                const VendorCard(
                  name: 'See more',
                  icon: IconsaxPlusLinear.element_plus,
                ),
              ].addBetween(10.horizontalSpace),
            ),
          ],
        ),
      ),
    );
  }
}
