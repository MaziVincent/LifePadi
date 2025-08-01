import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/my_app_bar.dart';
import 'package:lifepadi/widgets/reviews_list.dart';

/// Page to display all reviews for a specific vendor
class VendorReviewsPage extends ConsumerWidget {
  const VendorReviewsPage({
    super.key,
    required this.vendorId,
  });

  final int vendorId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Note: We need to create a vendor provider similar to product provider
    // For now, we'll use a placeholder approach
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const MyAppBar(
        title: 'Vendor Reviews',
        backgroundColor: Colors.white,
      ),
      body: _buildContent(context),
    );
  }

  Widget _buildContent(BuildContext context) {
    return SingleChildScrollView(
      padding: kHorizontalPadding.copyWith(top: 16.h, bottom: 24.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Vendor info header
          _buildVendorHeader(context),

          32.verticalSpace,

          // Reviews list
          ReviewsList(
            isProductReview: false,
            targetId: vendorId,
          ),
        ],
      ),
    );
  }

  Widget _buildVendorHeader(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(16.r),
      decoration: BoxDecoration(
        color: kStrokeColor.withValues(alpha: 0.3),
        borderRadius: BorderRadius.circular(12.r),
        border: Border.all(
          color: kStrokeColor,
          width: 1.r,
        ),
      ),
      child: Row(
        children: [
          // Vendor image placeholder
          Container(
            width: 60.r,
            height: 60.r,
            decoration: BoxDecoration(
              color: kDarkPrimaryColor.withValues(alpha: 0.1),
              borderRadius: BorderRadius.circular(8.r),
            ),
            child: Icon(
              IconsaxPlusLinear.shop,
              color: kDarkPrimaryColor,
              size: 24.r,
            ),
          ),

          16.horizontalSpace,

          // Vendor details placeholder
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Vendor Name', // This should come from vendor data
                  style: context.textTheme.bodyMedium?.copyWith(
                    fontSize: 16.sp,
                    fontWeight: FontWeight.w600,
                    color: kDarkTextColor,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                4.verticalSpace,
                Row(
                  children: [
                    Icon(
                      IconsaxPlusLinear.location,
                      size: 12.r,
                      color: kLightTextColor,
                    ),
                    4.horizontalSpace,
                    Expanded(
                      child: Text(
                        'Location', // This should come from vendor data
                        style: context.textTheme.bodySmall?.copyWith(
                          fontSize: 12.sp,
                          color: kLightTextColor,
                        ),
                      ),
                    ),
                  ],
                ),
                4.verticalSpace,
                Row(
                  children: [
                    Icon(
                      IconsaxPlusLinear.call,
                      size: 12.r,
                      color: kLightTextColor,
                    ),
                    4.horizontalSpace,
                    Text(
                      'Phone Number', // This should come from vendor data
                      style: context.textTheme.bodySmall?.copyWith(
                        fontSize: 12.sp,
                        color: kLightTextColor,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
