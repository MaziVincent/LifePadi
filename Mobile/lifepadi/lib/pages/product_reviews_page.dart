import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/state/product.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/loading_wheel.dart';
import 'package:lifepadi/widgets/my_app_bar.dart';
import 'package:lifepadi/widgets/my_error_widget.dart';
import 'package:lifepadi/widgets/reviews_list.dart';

/// Page to display all reviews for a specific product
class ProductReviewsPage extends ConsumerWidget {
  const ProductReviewsPage({
    super.key,
    required this.productId,
  });

  final int productId;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final productAsync = ref.watch(productProvider(id: productId));

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: const MyAppBar(
        title: 'Product Reviews',
        backgroundColor: Colors.white,
      ),
      body: productAsync.when(
        data: (product) => _buildContent(context, product),
        loading: () => const Center(child: GreenyLoadingWheel()),
        error: (error, _) => MyErrorWidget(error: error),
      ),
    );
  }

  Widget _buildContent(BuildContext context, Product product) {
    return SingleChildScrollView(
      padding: kHorizontalPadding.copyWith(top: 16.h, bottom: 24.h),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Product info header
          _buildProductHeader(context, product),
          
          32.verticalSpace,
          
          // Reviews list
          ReviewsList(
            isProductReview: true,
            targetId: productId,
          ),
        ],
      ),
    );
  }

  Widget _buildProductHeader(BuildContext context, Product product) {
    return Container(
      padding: EdgeInsets.all(16.r),
      decoration: BoxDecoration(
        color: kStrokeColor.withOpacity(0.3),
        borderRadius: BorderRadius.circular(12.r),
        border: Border.all(
          color: kStrokeColor,
          width: 1.r,
        ),
      ),
      child: Row(
        children: [
          // Product image
          ClipRRect(
            borderRadius: BorderRadius.circular(8.r),
            child: Image.network(
              product.imageUrl,
              width: 60.r,
              height: 60.r,
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) => Container(
                width: 60.r,
                height: 60.r,
                decoration: BoxDecoration(
                  color: kStrokeColor,
                  borderRadius: BorderRadius.circular(8.r),
                ),
                child: Icon(
                  Icons.image_not_supported_outlined,
                  color: kLightTextColor,
                  size: 24.r,
                ),
              ),
            ),
          ),
          
          16.horizontalSpace,
          
          // Product details
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  product.name,
                  style: context.textTheme.bodyMedium?.copyWith(
                    fontSize: 16.sp,
                    fontWeight: FontWeight.w600,
                    color: kDarkTextColor,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                
                4.verticalSpace,
                
                Text(
                  product.price.currency,
                  style: context.textTheme.bodyMedium?.copyWith(
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w600,
                    color: kBrightGreen,
                  ),
                ),
                
                4.verticalSpace,
                
                if (product.vendor.name.isNotEmpty) ...[
                  Text(
                    'by ${product.vendor.name}',
                    style: context.textTheme.bodySmall?.copyWith(
                      fontSize: 12.sp,
                      color: kLightTextColor,
                    ),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }
}
