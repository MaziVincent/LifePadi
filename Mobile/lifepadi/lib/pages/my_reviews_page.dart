import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/product_reviews.dart';
import 'package:lifepadi/state/vendor_reviews.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/loading_wheel.dart';
import 'package:lifepadi/widgets/my_app_bar.dart';
import 'package:lifepadi/widgets/my_error_widget.dart';
import 'package:lifepadi/widgets/review_card.dart';

/// Page to display all reviews written by the current user
class MyReviewsPage extends ConsumerWidget {
  const MyReviewsPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userAsync = ref.watch(authControllerProvider);

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: MyAppBar(
        title: 'My Reviews',
        backgroundColor: Colors.white,
      ),
      body: userAsync.when(
        data: (user) => _buildContent(context, ref, user.id),
        loading: () => const Center(child: GreenyLoadingWheel()),
        error: (error, _) => MyErrorWidget(error: error),
      ),
    );
  }

  Widget _buildContent(BuildContext context, WidgetRef ref, int customerId) {
    return DefaultTabController(
      length: 2,
      child: Column(
        children: [
          // Tab bar
          Container(
            margin: kHorizontalPadding,
            decoration: BoxDecoration(
              color: kStrokeColor.withOpacity(0.3),
              borderRadius: BorderRadius.circular(8.r),
            ),
            child: TabBar(
              indicator: BoxDecoration(
                color: kDarkPrimaryColor,
                borderRadius: BorderRadius.circular(8.r),
              ),
              labelColor: Colors.white,
              unselectedLabelColor: kLightTextColor,
              labelStyle: context.textTheme.bodyMedium?.copyWith(
                fontSize: 14.sp,
                fontWeight: FontWeight.w600,
              ),
              unselectedLabelStyle: context.textTheme.bodyMedium?.copyWith(
                fontSize: 14.sp,
                fontWeight: FontWeight.w500,
              ),
              tabs: const [
                Tab(text: 'Product Reviews'),
                Tab(text: 'Vendor Reviews'),
              ],
            ),
          ),
          
          16.verticalSpace,
          
          // Tab views
          Expanded(
            child: TabBarView(
              children: [
                _buildProductReviews(context, ref, customerId),
                _buildVendorReviews(context, ref, customerId),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProductReviews(BuildContext context, WidgetRef ref, int customerId) {
    final reviewsAsync = ref.watch(customerProductReviewsProvider(customerId));

    return reviewsAsync.when(
      data: (reviews) {
        if (reviews.isEmpty) {
          return _buildEmptyState(
            context,
            'No Product Reviews',
            'You haven\'t reviewed any products yet.',
            IconsaxPlusLinear.box,
          );
        }

        return ListView.builder(
          padding: kHorizontalPadding.copyWith(top: 8.h, bottom: 24.h),
          itemCount: reviews.length,
          itemBuilder: (context, index) {
            final review = reviews[index];
            return ReviewCard(
              productReview: review,
              showActions: true,
            );
          },
        );
      },
      loading: () => const Center(child: GreenyLoadingWheel()),
      error: (error, _) => MyErrorWidget(error: error),
    );
  }

  Widget _buildVendorReviews(BuildContext context, WidgetRef ref, int customerId) {
    final reviewsAsync = ref.watch(customerVendorReviewsProvider(customerId));

    return reviewsAsync.when(
      data: (reviews) {
        if (reviews.isEmpty) {
          return _buildEmptyState(
            context,
            'No Vendor Reviews',
            'You haven\'t reviewed any vendors yet.',
            IconsaxPlusLinear.shop,
          );
        }

        return ListView.builder(
          padding: kHorizontalPadding.copyWith(top: 8.h, bottom: 24.h),
          itemCount: reviews.length,
          itemBuilder: (context, index) {
            final review = reviews[index];
            return ReviewCard(
              vendorReview: review,
              showActions: true,
            );
          },
        );
      },
      loading: () => const Center(child: GreenyLoadingWheel()),
      error: (error, _) => MyErrorWidget(error: error),
    );
  }

  Widget _buildEmptyState(
    BuildContext context,
    String title,
    String subtitle,
    IconData icon,
  ) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 80.h, horizontal: 32.w),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            width: 80.r,
            height: 80.r,
            decoration: BoxDecoration(
              color: kStrokeColor.withOpacity(0.3),
              borderRadius: BorderRadius.circular(40.r),
            ),
            child: Icon(
              icon,
              size: 40.r,
              color: kLightTextColor,
            ),
          ),
          
          24.verticalSpace,
          
          Text(
            title,
            style: context.textTheme.bodyMedium?.copyWith(
              fontSize: 18.sp,
              fontWeight: FontWeight.w600,
              color: kDarkTextColor,
            ),
          ),
          
          8.verticalSpace,
          
          Text(
            subtitle,
            style: context.textTheme.bodyMedium?.copyWith(
              fontSize: 14.sp,
              color: kLightTextColor,
            ),
            textAlign: TextAlign.center,
          ),
          
          32.verticalSpace,
          
          OutlinedButton(
            onPressed: () => Navigator.of(context).pop(),
            style: OutlinedButton.styleFrom(
              side: BorderSide(color: kDarkPrimaryColor, width: 1.r),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8.r),
              ),
              padding: EdgeInsets.symmetric(vertical: 12.h, horizontal: 24.w),
            ),
            child: Text(
              'Start Shopping',
              style: context.textTheme.bodyMedium?.copyWith(
                fontSize: 14.sp,
                fontWeight: FontWeight.w500,
                color: kDarkPrimaryColor,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
