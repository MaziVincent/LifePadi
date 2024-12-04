import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_material_design_icons/flutter_material_design_icons.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconly/iconly.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/cart_state.dart';
import 'package:lifepadi/state/wishlist.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/section_title.dart';
import 'package:skeletonizer/skeletonizer.dart';

class ProductTileBase extends StatelessWidget {
  const ProductTileBase({
    super.key,
    required this.product,
    this.onCartToggle,
    this.onWishlistToggle,
    this.isInCart = false,
    this.isInWishlist = false,
  });

  final Product product;
  final VoidCallback? onCartToggle;
  final VoidCallback? onWishlistToggle;
  final bool isInCart;
  final bool isInWishlist;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () async => ProductDetailsRoute(product.id).push(context),
      customBorder: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(13.77.r),
      ),
      child: Ink(
        height: 127.36.h,
        width: double.infinity,
        padding: EdgeInsets.only(
          top: 12.05.h,
          left: 12.05.w,
          right: 15.49.w,
          bottom: 12.05.h,
        ),
        decoration: ShapeDecoration(
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(13.77.r),
          ),
          shadows: const [
            BoxShadow(
              color: Color(0x0C04060F),
              blurRadius: 51.63,
              offset: Offset(0, 3.44),
            ),
          ],
        ),
        child: Row(
          children: [
            Skeleton.replace(
              width: 103.26.h,
              height: 103.26.h,
              child: Container(
                width: 103.26.h,
                height: 103.26.h,
                decoration: ShapeDecoration(
                  color: const Color(0xFFB9B9B9),
                  image: DecorationImage(
                    image: CachedNetworkImageProvider(product.imageUrl),
                    fit: BoxFit.fill,
                  ),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10).r,
                  ),
                ),
              ),
            ),
            13.77.horizontalSpace,
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      SectionTitle(
                        product.name,
                        color: const Color(0xFF212121),
                        handleOverFlow: true,
                      ),
                      7.74.horizontalSpace,

                      /// Toggle cart
                      GestureDetector(
                        onTap: onCartToggle,
                        child: Icon(
                          isInCart ? MdiIcons.checkCircle : MdiIcons.cartPlus,
                          color: const Color(0xFF1BAC4B),
                          size: 22.r,
                        ),
                      ),
                    ],
                  ),
                  Text(
                    product.vendor.name,
                    style: context.textTheme.bodyLarge?.copyWith(
                      color: const Color(0xFFA1A5B0),
                      fontWeight: FontWeight.w400,
                      fontSize: 12.sp,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                  7.74.verticalSpace,
                  Row(
                    children: [
                      Icon(
                        IconlyBold.star,
                        color: const Color(0xFFFC9E18),
                        size: 12.05.r,
                      ),
                      Text(
                        '4.9',
                        style: context.textTheme.bodySmall?.copyWith(
                          color: const Color(0xFF616161),
                          fontWeight: FontWeight.w500,
                          fontSize: 12.05.sp,
                          letterSpacing: 0.17.r,
                        ),
                      ),
                      Text(
                        '(2.3k)',
                        style: context.textTheme.bodySmall?.copyWith(
                          color: const Color(0xFF616161),
                          fontWeight: FontWeight.w500,
                          fontSize: 12.05.sp,
                          letterSpacing: 0.17.r,
                        ),
                      ),
                    ].separatedBy(5.16.horizontalSpace),
                  ),
                  7.74.verticalSpace,
                  Expanded(
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          product.price.currency,
                          style: context.textTheme.bodyLarge?.copyWith(
                            color: const Color(0xFF1BAC4B),
                            fontSize: 16.sp,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            /// Toggle wishlist
                            GestureDetector(
                              onTap: onWishlistToggle,
                              child: Icon(
                                isInWishlist
                                    ? MdiIcons.heart
                                    : MdiIcons.heartOutline,
                                color: const Color(0xFFF14336),
                                size: 22.r,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class ProductTile extends ConsumerWidget {
  const ProductTile({super.key, required this.product});

  final Product product;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cartAsync = ref.watch(cartStateProvider);
    final wishlistAsync = ref.watch(wishlistProvider);

    final isInCart =
        cartAsync.valueOrNull?.products.any((p) => p.id == product.id) ?? false;
    final isInWishlist =
        wishlistAsync.valueOrNull?.any((p) => p.id == product.id) ?? false;

    return ProductTileBase(
      product: product,
      isInCart: isInCart,
      isInWishlist: isInWishlist,
      onCartToggle: () async {
        final notifier = ref.read(cartStateProvider.notifier);
        if (isInCart) {
          await notifier.removeFromCart(product.id);
        } else {
          await notifier.addToCart(product);
        }
      },
      onWishlistToggle: () {
        ref.read(wishlistProvider.notifier).toggle(product);
      },
    );
  }
}
