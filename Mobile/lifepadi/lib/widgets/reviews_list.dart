import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/models/product_review.dart';
import 'package:lifepadi/models/review_statistics.dart';
import 'package:lifepadi/models/vendor_review.dart';
import 'package:lifepadi/state/product_reviews.dart';
import 'package:lifepadi/state/vendor_reviews.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/my_error_widget.dart';
import 'package:lifepadi/widgets/rating_display.dart';
import 'package:lifepadi/widgets/review_card.dart';
import 'package:lifepadi/widgets/review_form.dart';

/// Widget to display a paginated list of reviews
class ReviewsList extends ConsumerWidget {
  const ReviewsList({
    super.key,
    required this.isProductReview,
    required this.targetId,
    this.showHeader = true,
    this.showAddButton = true,
    this.maxItems,
  });

  final bool isProductReview;
  final int targetId; // productId or vendorId
  final bool showHeader;
  final bool showAddButton;
  final int? maxItems;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Watch the appropriate providers based on review type
    final reviewsAsync = isProductReview
        ? ref.watch(productReviewsProvider(targetId))
        : ref.watch(vendorReviewsProvider(targetId));

    final averageRatingAsync = isProductReview
        ? ref.watch(productAverageRatingProvider(targetId))
        : ref.watch(vendorAverageRatingProvider(targetId));

    final statisticsAsync = isProductReview
        ? ref.watch(productReviewStatisticsProvider(targetId))
        : ref.watch(vendorReviewStatisticsProvider(targetId));

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Header with rating summary
        if (showHeader) ...[
          _buildHeader(context, averageRatingAsync, statisticsAsync),
          24.verticalSpace,
        ],

        // Add review button
        if (showAddButton) ...[
          _buildAddReviewButton(context),
          16.verticalSpace,
        ],

        // Reviews list
        reviewsAsync.when(
          data: (reviews) => _buildReviewsList(context, reviews),
          loading: _buildLoadingState,
          error: (error, _) => MyErrorWidget(error: error),
        ),
      ],
    );
  }

  Widget _buildHeader(
    BuildContext context,
    AsyncValue<double> averageRatingAsync,
    AsyncValue<ReviewStatistics> statisticsAsync,
  ) {
    return averageRatingAsync.when(
      data: (averageRating) => statisticsAsync.when(
        data: (statistics) => RatingDisplay(
          averageRating: averageRating,
          totalReviews: statistics.totalReviews,
          statistics: statistics,
          showBreakdown: true,
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
      loading: () => const RatingDisplayLoading(size: RatingDisplaySize.large),
      error: (_, __) => const RatingDisplay(
        averageRating: 0,
        totalReviews: 0,
        size: RatingDisplaySize.large,
      ),
    );
  }

  Widget _buildAddReviewButton(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: OutlinedButton.icon(
        onPressed: () => _showReviewForm(context),
        icon: Icon(
          IconsaxPlusLinear.edit,
          size: 18.r,
          color: kDarkPrimaryColor,
        ),
        label: Text(
          'Write a Review',
          style: context.textTheme.bodyMedium?.copyWith(
            fontSize: 14.sp,
            fontWeight: FontWeight.w500,
            color: kDarkPrimaryColor,
          ),
        ),
        style: OutlinedButton.styleFrom(
          side: BorderSide(color: kDarkPrimaryColor, width: 1.r),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8.r),
          ),
          padding: EdgeInsets.symmetric(vertical: 12.h, horizontal: 16.w),
        ),
      ),
    );
  }

  Widget _buildReviewsList(BuildContext context, List<dynamic> reviews) {
    if (reviews.isEmpty) {
      return _buildEmptyState(context);
    }

    final displayReviews = maxItems != null && reviews.length > maxItems!
        ? reviews.take(maxItems!).toList()
        : reviews;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Reviews header
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              'Reviews (${reviews.length})',
              style: context.textTheme.bodyMedium?.copyWith(
                fontSize: 16.sp,
                fontWeight: FontWeight.w600,
                color: kDarkTextColor,
              ),
            ),
            if (maxItems != null && reviews.length > maxItems!) ...[
              TextButton(
                onPressed: () => _showAllReviews(context),
                child: Text(
                  'See All',
                  style: context.textTheme.bodyMedium?.copyWith(
                    fontSize: 14.sp,
                    color: kDarkPrimaryColor,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ),
            ],
          ],
        ),

        16.verticalSpace,

        // Reviews
        ...displayReviews.map((review) {
          if (isProductReview) {
            return ReviewCard(
              productReview: review as ProductReview,
              showActions: true,
            );
          } else {
            return ReviewCard(
              vendorReview: review as VendorReview,
              showActions: true,
            );
          }
        }),
      ],
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 48.h, horizontal: 24.w),
      child: Column(
        children: [
          Icon(
            IconsaxPlusLinear.message_text,
            size: 48.r,
            color: kLightTextColor,
          ),
          16.verticalSpace,
          Text(
            'No Reviews Yet',
            style: context.textTheme.bodyMedium?.copyWith(
              fontSize: 16.sp,
              fontWeight: FontWeight.w600,
              color: kDarkTextColor,
            ),
          ),
          8.verticalSpace,
          Text(
            'Be the first to share your experience!',
            style: context.textTheme.bodyMedium?.copyWith(
              fontSize: 14.sp,
              color: kLightTextColor,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }

  Widget _buildLoadingState() {
    return Column(
      children: [
        // Loading skeleton for reviews
        ...List.generate(
          3,
          (index) => Container(
            margin: EdgeInsets.only(bottom: 16.h),
            padding: EdgeInsets.all(16.r),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(12.r),
              border: Border.all(color: kStrokeColor, width: 1.r),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // User info skeleton
                Row(
                  children: [
                    Container(
                      width: 40.r,
                      height: 40.r,
                      decoration: BoxDecoration(
                        color: kStrokeColor,
                        borderRadius: BorderRadius.circular(20.r),
                      ),
                    ),
                    12.horizontalSpace,
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            width: 120.w,
                            height: 16.h,
                            decoration: BoxDecoration(
                              color: kStrokeColor,
                              borderRadius: BorderRadius.circular(4.r),
                            ),
                          ),
                          4.verticalSpace,
                          Container(
                            width: 80.w,
                            height: 12.h,
                            decoration: BoxDecoration(
                              color: kStrokeColor,
                              borderRadius: BorderRadius.circular(4.r),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),

                16.verticalSpace,

                // Rating skeleton
                Row(
                  children: List.generate(
                    5,
                    (index) => Padding(
                      padding: EdgeInsets.only(right: 4.w),
                      child: Container(
                        width: 16.r,
                        height: 16.r,
                        decoration: BoxDecoration(
                          color: kStrokeColor,
                          borderRadius: BorderRadius.circular(2.r),
                        ),
                      ),
                    ),
                  ),
                ),

                12.verticalSpace,

                // Review text skeleton
                Container(
                  width: double.infinity,
                  height: 60.h,
                  decoration: BoxDecoration(
                    color: kStrokeColor,
                    borderRadius: BorderRadius.circular(4.r),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  void _showReviewForm(BuildContext context) {
    ReviewFormModal.show(
      context,
      isProductReview: isProductReview,
      targetId: targetId,
    );
  }

  void _showAllReviews(BuildContext context) {
    // Navigate to full reviews page
    // This will be implemented when we create the review pages
  }
}

/// Compact reviews list for use in product/vendor detail pages
class CompactReviewsList extends ConsumerWidget {
  const CompactReviewsList({
    super.key,
    required this.isProductReview,
    required this.targetId,
    this.maxItems = 3,
  });

  final bool isProductReview;
  final int targetId;
  final int maxItems;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ReviewsList(
      isProductReview: isProductReview,
      targetId: targetId,
      showHeader: false,
      showAddButton: false,
      maxItems: maxItems,
    );
  }
}
