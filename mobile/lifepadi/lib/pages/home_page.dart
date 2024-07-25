import 'package:flutter/material.dart';
import 'package:flutter_material_design_icons/flutter_material_design_icons.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:remixicon/remixicon.dart';

import '../widgets/my_icon_button.dart';

class HomePage extends ConsumerWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final textTheme = Theme.of(context).textTheme;

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
      body: const SafeArea(
        child: Column(),
      ),
    );
  }
}
