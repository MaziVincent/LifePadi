import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/cart_state.dart';
import 'package:lifepadi/state/product.dart';
import 'package:lifepadi/state/product_reviews.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/auth_required_action.dart';
import 'package:lifepadi/widgets/widgets.dart';

class ProductDetailsPage extends ConsumerWidget {
  const ProductDetailsPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final product = ref.watch(productProvider(id: id));

    return Scaffold(
      appBar: MyAppBar(
        height: 90.h,
        title: product.when(
          data: (product) => product.name,
          loading: () => 'Loading...',
          error: (error, _) => 'An error occurred',
        ),
        actions: const [
          CartIconWidget(),
        ],
      ),
      body: switch (product) {
        AsyncError(:final error) => MyErrorWidget(error: error),
        AsyncData(:final value) => _ProductDetailsContent(product: value),
        _ => const Center(child: GreenyLoadingWheel()),
      },
    );
  }
}

class _ProductDetailsContent extends HookConsumerWidget {
  const _ProductDetailsContent({
    required this.product,
  });

  final Product product;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final quantity = useState(1);

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
            CategoryPill(text: product.category?.name ?? 'Uncategorized'),
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
            ProductReviewsRoute(product.id).go(context);
          },
        ),
        5.verticalSpace,
        Consumer(
          builder: (context, ref, child) {
            final averageRatingAsync =
                ref.watch(productAverageRatingProvider(product.id));
            final statisticsAsync =
                ref.watch(productReviewStatisticsProvider(product.id));

            return averageRatingAsync.when(
              data: (averageRating) => statisticsAsync.when(
                data: (statistics) => RatingDisplay(
                  averageRating: averageRating,
                  totalReviews: statistics.totalReviews,
                  size: RatingDisplaySize.large,
                ),
                loading: () =>
                    const RatingDisplayLoading(size: RatingDisplaySize.large),
                error: (_, __) => RatingDisplay(
                  averageRating: averageRating,
                  totalReviews: 0,
                  size: RatingDisplaySize.large,
                ),
              ),
              loading: () =>
                  const RatingDisplayLoading(size: RatingDisplaySize.large),
              error: (_, __) => const RatingDisplay(
                averageRating: 0,
                totalReviews: 0,
                size: RatingDisplaySize.large,
              ),
            );
          },
        ),
        16.verticalSpace,
        CompactReviewsList(
          isProductReview: true,
          targetId: product.id,
          maxItems: 2,
        ),
        20.verticalSpace,
        Consumer(
          builder: (context, ref, child) {
            final cartAsync = ref.watch(cartStateProvider);
            final isInCart = cartAsync.valueOrNull?.products.any(
                  (p) => p.id == product.id,
                ) ??
                false;
            final productInCart = cartAsync.valueOrNull?.products
                .firstWhereOrNull((p) => p.id == product.id);

            return Row(
              children: [
                QuantityWidget(
                  quantity: isInCart ? productInCart!.quantity : quantity.value,
                  onIncrement: () async {
                    if (isInCart) {
                      // Check auth before allowing cart modifications
                      if (await AuthRequiredAction.checkAuth(context, ref)) {
                        await ref
                            .read(cartStateProvider.notifier)
                            .incrementQuantity(product.id);
                      }
                    } else {
                      quantity.value++;
                    }
                  },
                  onDecrement: () async {
                    if (isInCart) {
                      // Check auth before allowing cart modifications
                      if (await AuthRequiredAction.checkAuth(context, ref)) {
                        await ref
                            .read(cartStateProvider.notifier)
                            .decrementQuantity(product.id);
                      }
                    } else {
                      if (quantity.value > 1) {
                        quantity.value--;
                      }
                    }
                  },
                ),
                16.horizontalSpace,
                Expanded(
                  child: PrimaryButton(
                    onPressed: () async {
                      // Check if user is authenticated before cart operations
                      if (await AuthRequiredAction.checkAuth(context, ref)) {
                        final notifier = ref.read(cartStateProvider.notifier);
                        if (isInCart) {
                          await notifier.removeFromCart(product.id);
                        } else {
                          await notifier.addToCart(
                            product,
                            quantity: quantity.value,
                          );
                        }
                      }
                    },
                    text: isInCart ? 'Remove from Cart' : 'Add to Cart',
                  ),
                ),
              ],
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
