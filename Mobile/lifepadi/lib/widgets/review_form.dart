import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/product_review.dart';
import 'package:lifepadi/models/vendor_review.dart';
import 'package:lifepadi/state/product_reviews.dart';
import 'package:lifepadi/state/vendor_reviews.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/buttons/primary_button.dart';
import 'package:lifepadi/widgets/input_field.dart';

/// Form widget for creating or editing reviews
class ReviewForm extends HookConsumerWidget {
  const ReviewForm({
    super.key,
    required this.isProductReview,
    required this.targetId,
    this.existingReview,
    this.onSubmitted,
    this.onCancelled,
  });

  final bool isProductReview;
  final int targetId; // productId or vendorId
  final dynamic existingReview; // ProductReview or VendorReview
  final VoidCallback? onSubmitted;
  final VoidCallback? onCancelled;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final initialRating = existingReview != null
        ? (existingReview is ProductReview
            ? (existingReview as ProductReview).rating
            : (existingReview as VendorReview).rating)
        : 0.0;
    final initialBody = existingReview != null
        ? (existingReview is ProductReview
            ? (existingReview as ProductReview).body
            : (existingReview as VendorReview).body)
        : '';

    final rating = useState<double>(initialRating);
    final reviewController = useTextEditingController(text: initialBody ?? '');
    final formKey = useMemoized(GlobalKey<FormState>.new);

    final isEditing = existingReview != null;
    final isSubmitting = useState(false);

    return Form(
      key: formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Text(
            isEditing ? 'Edit Review' : 'Write a Review',
            style: context.textTheme.titleLarge?.copyWith(
              fontSize: 20.sp,
              fontWeight: FontWeight.w600,
              color: kDarkTextColor,
            ),
          ),

          24.verticalSpace,

          // Rating section
          Text(
            'Rating *',
            style: context.textTheme.bodyMedium?.copyWith(
              fontSize: 14.sp,
              fontWeight: FontWeight.w600,
              color: kDarkTextColor,
            ),
          ),

          12.verticalSpace,

          // Star rating picker
          RatingBar.builder(
            initialRating: rating.value,
            minRating: 1,
            itemSize: 40.r,
            itemPadding: EdgeInsets.symmetric(horizontal: 4.w),
            itemBuilder: (context, index) {
              return Assets.icons.star.image(
                height: 40.r,
                width: 40.r,
                color: index < rating.value ? null : const Color(0xFFE8E8E8),
              );
            },
            onRatingUpdate: (newRating) {
              rating.value = newRating;
            },
            glow: false,
          ),

          8.verticalSpace,

          // Rating description
          Text(
            _getRatingDescription(rating.value),
            style: context.textTheme.bodySmall?.copyWith(
              fontSize: 12.sp,
              color: kLightTextColor,
            ),
          ),

          24.verticalSpace,

          // Review text section
          Text(
            'Review (Optional)',
            style: context.textTheme.bodyMedium?.copyWith(
              fontSize: 14.sp,
              fontWeight: FontWeight.w600,
              color: kDarkTextColor,
            ),
          ),

          8.verticalSpace,

          // Review text input
          InputField(
            controller: reviewController,
            hintText: 'Share your experience...',
            labelText: 'Review',
            hasValue: reviewController.text.isNotEmpty,
            maxLines: 5,
            maxLength: 1000,
            keyboardType: TextInputType.multiline,
            textInputAction: TextInputAction.newline,
            validator: (value) {
              if (value != null && value.length > 1000) {
                return 'Review cannot exceed 1000 characters';
              }
              return null;
            },
          ),

          32.verticalSpace,

          // Action buttons
          Row(
            children: [
              // Cancel button
              if (onCancelled != null) ...[
                Expanded(
                  child: OutlinedButton(
                    onPressed: isSubmitting.value ? null : onCancelled,
                    style: OutlinedButton.styleFrom(
                      side: BorderSide(color: kStrokeColor, width: 1.r),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(40.r),
                      ),
                      padding: EdgeInsets.symmetric(vertical: 16.h),
                    ),
                    child: Text(
                      'Cancel',
                      style: context.textTheme.bodyMedium?.copyWith(
                        fontSize: 14.sp,
                        fontWeight: FontWeight.w500,
                        color: kLightTextColor,
                      ),
                    ),
                  ),
                ),
                16.horizontalSpace,
              ],

              // Submit button
              Expanded(
                child: PrimaryButton(
                  onPressed: isSubmitting.value || rating.value == 0
                      ? null
                      : () => _submitReview(
                            context,
                            ref,
                            formKey,
                            rating.value,
                            reviewController.text.trim(),
                            isSubmitting,
                          ),
                  text: isSubmitting.value
                      ? 'Submitting...'
                      : (isEditing ? 'Update Review' : 'Submit Review'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  String _getRatingDescription(double rating) {
    return switch (rating.toInt()) {
      1 => 'Poor',
      2 => 'Fair',
      3 => 'Good',
      4 => 'Very Good',
      5 => 'Excellent',
      _ => 'Tap to rate',
    };
  }

  Future<void> _submitReview(
    BuildContext context,
    WidgetRef ref,
    GlobalKey<FormState> formKey,
    double rating,
    String reviewText,
    ValueNotifier<bool> isSubmitting,
  ) async {
    if (!formKey.currentState!.validate()) return;

    isSubmitting.value = true;

    try {
      if (isProductReview) {
        final controller = ref.read(productReviewControllerProvider.notifier);

        if (existingReview != null) {
          // Update existing review
          await controller.updateReview(
            reviewId: (existingReview as ProductReview).id,
            rating: rating,
            body: reviewText.isEmpty ? null : reviewText,
            productId: targetId,
          );
        } else {
          // Create new review
          await controller.createReview(
            rating: rating,
            body: reviewText.isEmpty ? null : reviewText,
            productId: targetId,
          );
        }
      } else {
        final controller = ref.read(vendorReviewControllerProvider.notifier);

        if (existingReview != null) {
          // Update existing review
          await controller.updateReview(
            reviewId: (existingReview as VendorReview).id,
            rating: rating,
            body: reviewText.isEmpty ? null : reviewText,
            vendorId: targetId,
          );
        } else {
          // Create new review
          await controller.createReview(
            rating: rating,
            body: reviewText.isEmpty ? null : reviewText,
            vendorId: targetId,
          );
        }
      }

      // Show success message
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              existingReview != null
                  ? 'Review updated successfully!'
                  : 'Review submitted successfully!',
            ),
            backgroundColor: kBrightGreen,
          ),
        );
      }

      onSubmitted?.call();
    } catch (error) {
      // Show error message
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'Failed to ${existingReview != null ? 'update' : 'submit'} review. Please try again.',
            ),
            backgroundColor: kDangerColor,
          ),
        );
      }
    } finally {
      isSubmitting.value = false;
    }
  }
}

/// Modal bottom sheet for review form
class ReviewFormModal extends StatelessWidget {
  const ReviewFormModal({
    super.key,
    required this.isProductReview,
    required this.targetId,
    this.existingReview,
  });

  final bool isProductReview;
  final int targetId;
  final dynamic existingReview;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(
        24.w,
        24.h,
        24.w,
        MediaQuery.of(context).viewInsets.bottom + 24.h,
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(20.r),
        ),
      ),
      child: SingleChildScrollView(
        child: ReviewForm(
          isProductReview: isProductReview,
          targetId: targetId,
          existingReview: existingReview,
          onSubmitted: () => Navigator.of(context).pop(),
          onCancelled: () => Navigator.of(context).pop(),
        ),
      ),
    );
  }

  /// Show the review form as a modal bottom sheet
  static Future<void> show(
    BuildContext context, {
    required bool isProductReview,
    required int targetId,
    dynamic existingReview,
  }) {
    return showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (context) => ReviewFormModal(
        isProductReview: isProductReview,
        targetId: targetId,
        existingReview: existingReview,
      ),
    );
  }
}
