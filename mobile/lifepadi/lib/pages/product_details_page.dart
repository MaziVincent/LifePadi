import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/state/cart_state.dart';
import 'package:lifepadi/state/product.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

import '../router/routes.dart';

class ProductDetailsPage extends ConsumerWidget {
  const ProductDetailsPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final product = ref.watch(productProvider(id: id));

    return Scaffold(
      appBar: MyAppBar(
        title: product.when(
          data: (product) => product.name,
          loading: () => 'Loading...',
          error: (error, _) => 'An error occurred',
        ),
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
      body: switch (product) {
        AsyncError(:final error) => Center(
            child: Text(
              error.toString(),
              style: context.textTheme.bodyMedium?.copyWith(
                color: kDarkTextColor,
                fontSize: 16.sp,
                fontWeight: FontWeight.w400,
              ),
            ),
          ),
        AsyncData(:final value) => _ProductDetailsContent(product: value),
        _ => const Center(child: GreenyLoadingWheel()),
      },
    );
  }
}

class _ProductDetailsContent extends StatelessWidget {
  const _ProductDetailsContent({
    required this.product,
  });

  final Product product;

  @override
  Widget build(BuildContext context) {
    return SuperListView(
      padding: kHorizontalPadding,
      children: [
        Container(
          width: double.infinity,
          height: 245.h,
          decoration: BoxDecoration(
            image: DecorationImage(
              image: CachedNetworkImageProvider(product.imageUrl),
              fit: BoxFit.fill,
            ),
            borderRadius: BorderRadius.circular(12.r),
          ),
          padding: EdgeInsets.symmetric(vertical: 5.h),
        ),
        16.verticalSpace,
        SectionTitle(
          product.name,
          color: const Color(0xFF1C1C20),
        ),
        8.verticalSpace,
        Text.rich(
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
                text: product.price.currencyWithoutSymbol,
                style: GoogleFonts.dmSans(
                  color: kDarkTextColor,
                  fontSize: 24.sp,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
        ),
        8.verticalSpace,
        Row(
          children: [
            CategoryPill(text: product.category.name),
          ],
        ),
        8.verticalSpace,
        const SectionTitle(
          'Description',
          color: Color(0xFF27272A),
        ),
        3.verticalSpace,
        ExpandableDescription(description: product.description),
        9.verticalSpace,
        StoreNameWithWishlistAndShare(
          product: product,
        ),
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
        Consumer(
          builder: (context, ref, child) {
            final cartProducts = ref.watch(cartStateProvider).products;
            final isInCart = cartProducts.any((p) => p.id == product.id);

            return PrimaryButton(
              onPressed: () {
                if (isInCart) {
                  ref
                      .read(cartStateProvider.notifier)
                      .removeFromCart(product.id);
                } else {
                  ref.read(cartStateProvider.notifier).addToCart(product);
                }
              },
              text: isInCart ? 'Remove from Cart' : 'Add to Cart',
            );
          },
        ),
        30.verticalSpace,
      ],
    );
  }
}

class ExpandableDescription extends HookWidget {
  const ExpandableDescription({
    super.key,
    required this.description,
  });

  final String description;
  static const maxLength = 165;

  @override
  Widget build(BuildContext context) {
    final isExpanded = useState(false);
    final text = description;
    final shouldTrim = text.length > maxLength && !isExpanded.value;

    return Text.rich(
      TextSpan(
        children: [
          TextSpan(
            text: shouldTrim ? '${text.substring(0, maxLength)}...' : text,
            style: context.textTheme.bodyMedium?.copyWith(
              color: const Color(0xFF878787),
              fontSize: 14.sp,
              fontWeight: FontWeight.w400,
            ),
          ),
          if (shouldTrim)
            WidgetSpan(
              child: GestureDetector(
                onTap: () => isExpanded.value = true,
                child: Text(
                  ' Read More...',
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: kDarkPrimaryColor,
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ),
          if (isExpanded.value)
            WidgetSpan(
              child: GestureDetector(
                onTap: () => isExpanded.value = false,
                child: Text(
                  ' Show Less',
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: kDarkPrimaryColor,
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
