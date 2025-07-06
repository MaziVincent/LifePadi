import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:intl/intl.dart';
import 'package:lifepadi/models/product_review.dart';
import 'package:lifepadi/models/vendor_review.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/product_reviews.dart';
import 'package:lifepadi/state/vendor_reviews.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/avatar.dart';

/// Widget to display a single review card
class ReviewCard extends ConsumerWidget {
  const ReviewCard({
    super.key,
    this.productReview,
    this.vendorReview,
    this.onEdit,
    this.onDelete,
    this.showActions = false,
  }) : assert(
          (productReview != null) ^ (vendorReview != null),
          'Either productReview or vendorReview must be provided, but not both',
        );

  final ProductReview? productReview;
  final VendorReview? vendorReview;
  final VoidCallback? onEdit;
  final VoidCallback? onDelete;
  final bool showActions;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final isProductReview = productReview != null;
    final customer =
        isProductReview ? productReview!.customer : vendorReview!.customer;
    final rating =
        isProductReview ? productReview!.rating : vendorReview!.rating;
    final body = isProductReview ? productReview!.body : vendorReview!.body;
    final createdAt =
        isProductReview ? productReview!.createdAt : vendorReview!.createdAt;
    final customerId =
        isProductReview ? productReview!.customerId : vendorReview!.customerId;

    // Check if current user owns this review
    final currentUser = ref.watch(authControllerProvider);
    final isOwner = currentUser.maybeWhen(
      data: (user) => user.id == customerId,
      orElse: () => false,
    );

    return Container(
      margin: EdgeInsets.only(bottom: 16.h),
      padding: EdgeInsets.all(16.r),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12.r),
        border: Border.all(
          color: kStrokeColor,
          width: 1.r,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 8.r,
            offset: Offset(0, 2.h),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header with user info and actions
          Row(
            children: [
              // User avatar and info
              Expanded(
                child: Row(
                  children: [
                    Avatar(
                      size: 40.r,
                    ),
                    12.horizontalSpace,
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            customer?.name ?? 'Anonymous',
                            style: context.textTheme.bodyMedium?.copyWith(
                              fontWeight: FontWeight.w600,
                              fontSize: 14.sp,
                              color: kDarkTextColor,
                            ),
                          ),
                          2.verticalSpace,
                          Text(
                            _formatDate(createdAt),
                            style: context.textTheme.bodySmall?.copyWith(
                              fontSize: 12.sp,
                              color: kLightTextColor,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              // Actions menu
              if (showActions && isOwner) ...[
                PopupMenuButton<String>(
                  icon: Icon(
                    IconsaxPlusLinear.more,
                    size: 20.r,
                    color: kLightTextColor,
                  ),
                  onSelected: (value) {
                    switch (value) {
                      case 'edit':
                        onEdit?.call();
                        break;
                      case 'delete':
                        _showDeleteConfirmation(context, ref);
                        break;
                    }
                  },
                  itemBuilder: (context) => [
                    PopupMenuItem(
                      value: 'edit',
                      child: Row(
                        children: [
                          Icon(
                            IconsaxPlusLinear.edit,
                            size: 16.r,
                            color: kDarkTextColor,
                          ),
                          8.horizontalSpace,
                          Text(
                            'Edit',
                            style: context.textTheme.bodyMedium?.copyWith(
                              fontSize: 14.sp,
                            ),
                          ),
                        ],
                      ),
                    ),
                    PopupMenuItem(
                      value: 'delete',
                      child: Row(
                        children: [
                          Icon(
                            IconsaxPlusLinear.trash,
                            size: 16.r,
                            color: kDangerColor,
                          ),
                          8.horizontalSpace,
                          Text(
                            'Delete',
                            style: context.textTheme.bodyMedium?.copyWith(
                              fontSize: 14.sp,
                              color: kDangerColor,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ],
          ),

          16.verticalSpace,

          // Rating display
          Row(
            children: [
              RatingBar(
                initialRating: rating,
                minRating: 1,
                allowHalfRating: true,
                ignoreGestures: true,
                itemSize: 16.r,
                itemPadding: EdgeInsets.symmetric(horizontal: 1.w),
                ratingWidget: RatingWidget(
                  full: Assets.icons.star.image(
                    height: 16.r,
                    width: 16.r,
                  ),
                  half: Assets.icons.starHalf.image(
                    height: 16.r,
                    width: 16.r,
                  ),
                  empty: Assets.icons.star.image(
                    color: const Color(0xFFE8E8E8),
                    height: 16.r,
                    width: 16.r,
                  ),
                ),
                onRatingUpdate: (_) {},
                glow: false,
              ),
              8.horizontalSpace,
              Text(
                rating.toStringAsFixed(1),
                style: context.textTheme.bodyMedium?.copyWith(
                  fontWeight: FontWeight.w600,
                  fontSize: 14.sp,
                  color: kDarkTextColor,
                ),
              ),
            ],
          ),

          // Review text
          if (body != null && body.isNotEmpty) ...[
            12.verticalSpace,
            Text(
              body,
              style: context.textTheme.bodyMedium?.copyWith(
                fontSize: 14.sp,
                color: kDarkTextColor,
                height: 1.4,
              ),
            ),
          ],

          // Product/Vendor info (if available)
          if (isProductReview && productReview!.product != null) ...[
            16.verticalSpace,
            Container(
              padding: EdgeInsets.symmetric(
                horizontal: 12.w,
                vertical: 8.h,
              ),
              decoration: BoxDecoration(
                color: kStrokeColor.withValues(alpha: 0.5),
                borderRadius: BorderRadius.circular(8.r),
              ),
              child: Row(
                children: [
                  Icon(
                    IconsaxPlusLinear.box,
                    size: 16.r,
                    color: kLightTextColor,
                  ),
                  8.horizontalSpace,
                  Expanded(
                    child: Text(
                      productReview!.product!.name,
                      style: context.textTheme.bodySmall?.copyWith(
                        fontSize: 12.sp,
                        color: kLightTextColor,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ] else if (!isProductReview && vendorReview!.vendor != null) ...[
            16.verticalSpace,
            Container(
              padding: EdgeInsets.symmetric(
                horizontal: 12.w,
                vertical: 8.h,
              ),
              decoration: BoxDecoration(
                color: kStrokeColor.withValues(alpha: 0.5),
                borderRadius: BorderRadius.circular(8.r),
              ),
              child: Row(
                children: [
                  Icon(
                    IconsaxPlusLinear.shop,
                    size: 16.r,
                    color: kLightTextColor,
                  ),
                  8.horizontalSpace,
                  Expanded(
                    child: Text(
                      vendorReview!.vendor!.name,
                      style: context.textTheme.bodySmall?.copyWith(
                        fontSize: 12.sp,
                        color: kLightTextColor,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  String _formatDate(DateTime date) {
    final now = DateTime.now();
    final difference = now.difference(date);

    if (difference.inDays == 0) {
      return 'Today';
    } else if (difference.inDays == 1) {
      return 'Yesterday';
    } else if (difference.inDays < 7) {
      return '${difference.inDays} days ago';
    } else {
      return DateFormat('MMM d, yyyy').format(date);
    }
  }

  void _showDeleteConfirmation(BuildContext context, WidgetRef ref) {
    showDialog<void>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(
          'Delete Review',
          style: context.textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        content: Text(
          'Are you sure you want to delete this review? This action cannot be undone.',
          style: context.textTheme.bodyMedium,
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: Text(
              'Cancel',
              style: context.textTheme.bodyMedium?.copyWith(
                color: kLightTextColor,
              ),
            ),
          ),
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _deleteReview(ref);
            },
            child: Text(
              'Delete',
              style: context.textTheme.bodyMedium?.copyWith(
                color: kDangerColor,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _deleteReview(WidgetRef ref) {
    if (productReview != null) {
      ref.read(productReviewControllerProvider.notifier).deleteReview(
            reviewId: productReview!.id,
            productId: productReview!.productId,
          );
    } else if (vendorReview != null) {
      ref.read(vendorReviewControllerProvider.notifier).deleteReview(
            reviewId: vendorReview!.id,
            vendorId: vendorReview!.vendorId,
          );
    }
    onDelete?.call();
  }
}
