import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_material_design_icons/flutter_material_design_icons.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/category_tab.dart';
import 'package:lifepadi/widgets/header_with_see_all.dart';
import 'package:lifepadi/widgets/loading_wheel.dart';
import 'package:lifepadi/widgets/my_app_bar.dart';
import 'package:lifepadi/widgets/my_icon_button.dart';
import 'package:lifepadi/widgets/product_card.dart';
import 'package:lifepadi/widgets/section_title.dart';
import 'package:lifepadi/widgets/service_card.dart';
import 'package:lifepadi/widgets/vendor_card.dart';
import 'package:remixicon/remixicon.dart';

class HomePage extends HookWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final activeCategory = useState(0);

    TextStyle? inputTextStyle() {
      return context.textTheme.bodyMedium?.copyWith(
        color: const Color(0xFF878787),
        fontSize: 14.sp,
        fontWeight: FontWeight.w500,
      );
    }

    OutlineInputBorder inputBorder({Color? color}) {
      return OutlineInputBorder(
        borderRadius: BorderRadius.circular(8.r),
        borderSide: BorderSide(
          color: color ?? const Color(0xFFD6D6D6),
        ),
      );
    }

    const categories = [
      'All',
      'Fashion',
      'Agro-product',
      'Stationary',
      'Pharmaceutical',
      'Furniture',
    ];

    return Scaffold(
      appBar: MyAppBar(
        title: Row(
          children: [
            MyIconButton(
              icon: Remix.map_pin_5_line,
              onPressed: () {
                // TODO: Display a modal bottom sheet with a form to update the user's delivery location.
                // The modal should have a drag handle.

                // For now, navigate to the new location page
                context.go(NewLocationRoute().location);
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
                      style: context.textTheme.bodySmall?.copyWith(
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
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: kDarkTextColor,
                    fontWeight: FontWeight.w600,
                    fontSize: 12.sp,
                  ),
                ),
              ],
            ),
          ],
        ),
        actions: [
          MyIconButton(
            icon: IconsaxPlusLinear.shopping_cart,
            onPressed: () => context.go(CartRoute().location),
          ),
          6.horizontalSpace,
          MyIconButton(
            onPressed: () => context.go(NotificationRoute().location),
            icon: MdiIcons.bellBadgeOutline,
            showBadge: true,
          ),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.only(top: 4.h, left: 24.w, right: 24.w),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Try searchfield package when implementing this
              TextFormField(
                cursorColor: kDarkPrimaryColor,
                decoration: InputDecoration(
                  border: inputBorder(),
                  enabledBorder: inputBorder(),
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
                style: context.textTheme.bodyLarge?.copyWith(
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
              const SectionTitle('Stores and Vendors'),
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
                ].separatedBy(10.horizontalSpace),
              ),
              16.verticalSpace,
              HeaderWithSeeAll(
                title: 'Service Errands',
                onSeeAllTap: () {
                  // TODO: Go to errands page
                },
              ),
              16.verticalSpace,
              Row(
                children: [
                  for (final (:name, :image) in services.take(4))
                    ServiceCard(name: name, image: image),
                ].separatedBy(10.horizontalSpace),
              ),
              16.verticalSpace,
              HeaderWithSeeAll(
                title: 'Categories',
                onSeeAllTap: () {
                  // TODO: Go to categories page
                },
              ),
              13.87.verticalSpace,
              SizedBox(
                height: 43.h,
                child: ListView.separated(
                  scrollDirection: Axis.horizontal,
                  itemCount: categories.length,
                  itemBuilder: (context, index) => CategoryTab(
                    isActive: index == activeCategory.value,
                    name: categories[index],
                    onTap: () => activeCategory.value = index,
                  ),
                  separatorBuilder: (context, index) => 6.93.horizontalSpace,
                ),
              ),
              22.72.verticalSpace,
              HeaderWithSeeAll(
                title: 'Products Near You',
                onSeeAllTap: () {
                  // TODO: Go to products page with the current active category id passed in state
                  // If the category id is null, it should default to All
                },
              ),
              16.verticalSpace,
              Column(
                children: [
                  ...[
                    ProductCard(
                      id: 1,
                      image: Assets.images.bnbBlender.provider(),
                      name: 'BNB Blender',
                      vendor: 'Shoprite Stores',
                      price: 33000,
                    ),
                    ProductCard(
                      id: 2,
                      image: Assets.images.oilPerfumes.provider(),
                      name: 'Oil Perfumes',
                      vendor: 'Beauty Collection',
                      price: 500,
                    ),
                    ProductCard(
                      id: 3,
                      image: Assets.images.plainTees.provider(),
                      name: 'Plain Tees',
                      vendor: 'Korede Store',
                      price: 5000,
                    ),
                  ].separatedBy(11.verticalSpace),
                  19.67.verticalSpace,
                  const OrangeyLoadingWheel(),
                  15.verticalSpace,
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
