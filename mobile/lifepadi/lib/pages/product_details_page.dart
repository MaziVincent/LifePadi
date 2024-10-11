import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';
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
      body: SuperListView(
        padding: kHorizontalPadding,
        children: [
          Container(
            width: double.infinity,
            height: 245.h,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: Assets.images.bnbBlenderLg.provider(),
                fit: BoxFit.fill,
              ),
              borderRadius: BorderRadius.circular(12.r),
            ),
            padding: EdgeInsets.symmetric(vertical: 5.h),
          ),
          16.verticalSpace,
          const SectionTitle(
            'BNB Blender',
            color: Color(0xFF1C1C20),
          ),
          8.verticalSpace,
          _buildPrice(),
          8.verticalSpace,
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              children: [
                const CategoryPill(text: 'Earphone'),
                const CategoryPill(text: 'Phone'),
                const CategoryPill(text: 'Gadget'),
                const CategoryPill(text: 'Accessories'),
              ].separatedBy(8.horizontalSpace),
            ),
          ),
          8.verticalSpace,
          const SectionTitle(
            'Description',
            color: Color(0xFF27272A),
          ),
          3.verticalSpace,
          Text.rich(
            TextSpan(
              children: [
                TextSpan(
                  text:
                      '2 or more persons can share this space...Velit purus egestas tellus phasellus. Mattis eget sed faucibus magna vulputate pellentesque a diam.  ',
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFF878787),
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                TextSpan(
                  text: 'Read More...',
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: kDarkPrimaryColor,
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ),
          9.verticalSpace,
          const StoreNameWithWishlistAndShare(),
          5.verticalSpace,
          HeaderWithSeeAll(
            title: 'Ratings & Review',
            onSeeAllTap: () {
              // TODO: Go to reviews page.
            },
          ),
          5.verticalSpace,
          Column(
            children: [
              Text(
                '4.5',
                style: context.textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF261E27),
                  fontSize: 32.sp,
                  fontWeight: FontWeight.w500,
                ),
              ),
              RatingBar(
                initialRating: 4.5,
                minRating: 1,
                allowHalfRating: true,
                itemPadding: EdgeInsets.symmetric(horizontal: 4.w),
                ratingWidget: RatingWidget(
                  full: Assets.icons.star.image(
                    height: 32.r,
                    width: 32.r,
                  ),
                  half: Assets.icons.starHalf.image(
                    height: 32.r,
                    width: 32.r,
                  ),
                  empty: Assets.icons.star.image(
                    color: const Color(0xFFE8E8E8),
                    height: 32.r,
                    width: 32.r,
                  ),
                ),
                onRatingUpdate: print,
                glow: false,
              ),
              Text(
                '(20.6k reviews)',
                style: context.textTheme.bodyLarge?.copyWith(
                  fontSize: 16.sp,
                  fontWeight: FontWeight.w400,
                ),
              ),
            ].separatedBy(8.verticalSpace),
          ),
          20.verticalSpace,
          PrimaryButton(
            onPressed: () {
              // TODO: Add to cart
            },
            text: 'Add to Cart',
          ),
          30.verticalSpace,
        ],
      ),
    );
  }

  Text _buildPrice() {
    return Text.rich(
      TextSpan(
        children: [
          TextSpan(
            text: '\u20a6',
            style: GoogleFonts.roboto(
              color: kDarkTextColor,
              fontSize: 24.sp,
              fontWeight: FontWeight.w700,
            ),
          ),
          TextSpan(
            text: 33000.currencyWithoutSymbol,
            style: GoogleFonts.dmSans(
              color: kDarkTextColor,
              fontSize: 24.sp,
              fontWeight: FontWeight.w700,
            ),
          ),
        ],
      ),
    );
  }
}
