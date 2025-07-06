import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/models/review_statistics.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';

/// Widget to display rating information and statistics
class RatingDisplay extends StatelessWidget {
  const RatingDisplay({
    super.key,
    required this.averageRating,
    required this.totalReviews,
    this.statistics,
    this.showBreakdown = false,
    this.size = RatingDisplaySize.medium,
  });

  final double averageRating;
  final int totalReviews;
  final ReviewStatistics? statistics;
  final bool showBreakdown;
  final RatingDisplaySize size;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Main rating display
        _buildMainRating(context),

        // Rating breakdown
        if (showBreakdown && statistics != null) ...[
          16.verticalSpace,
          _buildRatingBreakdown(context),
        ],
      ],
    );
  }

  Widget _buildMainRating(BuildContext context) {
    final starSize = switch (size) {
      RatingDisplaySize.small => 16.r,
      RatingDisplaySize.medium => 20.r,
      RatingDisplaySize.large => 24.r,
    };

    final ratingTextSize = switch (size) {
      RatingDisplaySize.small => 24.sp,
      RatingDisplaySize.medium => 32.sp,
      RatingDisplaySize.large => 40.sp,
    };

    final reviewTextSize = switch (size) {
      RatingDisplaySize.small => 12.sp,
      RatingDisplaySize.medium => 14.sp,
      RatingDisplaySize.large => 16.sp,
    };

    return Column(
      children: [
        // Average rating number
        Text(
          averageRating.toStringAsFixed(1),
          style: context.textTheme.bodyMedium?.copyWith(
            color: kDarkTextColor,
            fontSize: ratingTextSize,
            fontWeight: FontWeight.w600,
          ),
        ),

        8.verticalSpace,

        // Star rating
        RatingBar(
          initialRating: averageRating,
          minRating: 1,
          allowHalfRating: true,
          ignoreGestures: true,
          itemSize: starSize,
          itemPadding: EdgeInsets.symmetric(horizontal: 2.w),
          ratingWidget: RatingWidget(
            full: Assets.icons.star.image(
              height: starSize,
              width: starSize,
            ),
            half: Assets.icons.starHalf.image(
              height: starSize,
              width: starSize,
            ),
            empty: Assets.icons.star.image(
              color: const Color(0xFFE8E8E8),
              height: starSize,
              width: starSize,
            ),
          ),
          onRatingUpdate: (_) {},
          glow: false,
        ),

        8.verticalSpace,

        // Review count
        Text(
          totalReviews == 1 ? '1 review' : '$totalReviews reviews',
          style: context.textTheme.bodyMedium?.copyWith(
            fontSize: reviewTextSize,
            color: kLightTextColor,
            fontWeight: FontWeight.w400,
          ),
        ),
      ],
    );
  }

  Widget _buildRatingBreakdown(BuildContext context) {
    if (statistics == null) return const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Rating Breakdown',
          style: context.textTheme.bodyMedium?.copyWith(
            fontSize: 16.sp,
            fontWeight: FontWeight.w600,
            color: kDarkTextColor,
          ),
        ),

        12.verticalSpace,

        // Rating bars for each star level (5 to 1)
        ...List.generate(5, (index) {
          final rating = 5 - index;
          final count = statistics!.getRatingCount(rating);
          final percentage = statistics!.getRatingPercentage(rating);

          return Padding(
            padding: EdgeInsets.only(bottom: 8.h),
            child: Row(
              children: [
                // Star rating label
                Text(
                  '$rating',
                  style: context.textTheme.bodySmall?.copyWith(
                    fontSize: 12.sp,
                    color: kLightTextColor,
                    fontWeight: FontWeight.w500,
                  ),
                ),

                4.horizontalSpace,

                // Star icon
                Assets.icons.star.image(
                  height: 12.r,
                  width: 12.r,
                ),

                8.horizontalSpace,

                // Progress bar
                Expanded(
                  child: Container(
                    height: 6.h,
                    decoration: BoxDecoration(
                      color: kStrokeColor,
                      borderRadius: BorderRadius.circular(3.r),
                    ),
                    child: FractionallySizedBox(
                      alignment: Alignment.centerLeft,
                      widthFactor: percentage / 100,
                      child: Container(
                        decoration: BoxDecoration(
                          color: kDarkPrimaryColor,
                          borderRadius: BorderRadius.circular(3.r),
                        ),
                      ),
                    ),
                  ),
                ),

                8.horizontalSpace,

                // Count
                SizedBox(
                  width: 30.w,
                  child: Text(
                    '$count',
                    textAlign: TextAlign.end,
                    style: context.textTheme.bodySmall?.copyWith(
                      fontSize: 12.sp,
                      color: kLightTextColor,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ],
            ),
          );
        }),
      ],
    );
  }
}

/// Compact rating display for use in lists and cards
class CompactRatingDisplay extends StatelessWidget {
  const CompactRatingDisplay({
    super.key,
    required this.averageRating,
    required this.totalReviews,
    this.showCount = true,
  });

  final double averageRating;
  final int totalReviews;
  final bool showCount;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        // Star rating
        RatingBar(
          initialRating: averageRating,
          minRating: 1,
          allowHalfRating: true,
          ignoreGestures: true,
          itemSize: 14.r,
          itemPadding: EdgeInsets.symmetric(horizontal: 1.w),
          ratingWidget: RatingWidget(
            full: Assets.icons.star.image(
              height: 14.r,
              width: 14.r,
            ),
            half: Assets.icons.starHalf.image(
              height: 14.r,
              width: 14.r,
            ),
            empty: Assets.icons.star.image(
              color: const Color(0xFFE8E8E8),
              height: 14.r,
              width: 14.r,
            ),
          ),
          onRatingUpdate: (_) {},
          glow: false,
        ),

        if (showCount) ...[
          6.horizontalSpace,
          Text(
            '($totalReviews)',
            style: context.textTheme.bodySmall?.copyWith(
              fontSize: 12.sp,
              color: kLightTextColor,
            ),
          ),
        ],
      ],
    );
  }
}

/// Loading state for rating display
class RatingDisplayLoading extends StatelessWidget {
  const RatingDisplayLoading({
    super.key,
    this.size = RatingDisplaySize.medium,
  });

  final RatingDisplaySize size;

  @override
  Widget build(BuildContext context) {
    final starSize = switch (size) {
      RatingDisplaySize.small => 16.r,
      RatingDisplaySize.medium => 20.r,
      RatingDisplaySize.large => 24.r,
    };

    return Column(
      children: [
        // Rating number placeholder
        Container(
          width: 60.w,
          height: 32.h,
          decoration: BoxDecoration(
            color: kStrokeColor,
            borderRadius: BorderRadius.circular(4.r),
          ),
        ),

        8.verticalSpace,

        // Stars placeholder
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(
            5,
            (index) => Padding(
              padding: EdgeInsets.symmetric(horizontal: 2.w),
              child: Container(
                width: starSize,
                height: starSize,
                decoration: BoxDecoration(
                  color: kStrokeColor,
                  borderRadius: BorderRadius.circular(2.r),
                ),
              ),
            ),
          ),
        ),

        8.verticalSpace,

        // Review count placeholder
        Container(
          width: 80.w,
          height: 16.h,
          decoration: BoxDecoration(
            color: kStrokeColor,
            borderRadius: BorderRadius.circular(4.r),
          ),
        ),
      ],
    );
  }
}

enum RatingDisplaySize {
  small,
  medium,
  large,
}
