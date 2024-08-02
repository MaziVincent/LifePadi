import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';

enum OrderStatus {
  ongoing,
  completed,
}

class OrderTile extends StatelessWidget {
  const OrderTile({
    super.key,
    required this.status,
  });

  final OrderStatus status;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 132.h,
      width: double.infinity,
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: Color(0xFFEBEBF0),
          ),
        ),
      ),
      padding: EdgeInsets.only(bottom: 12.h),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 48.h,
            height: 48.h,
            decoration: ShapeDecoration(
              image: DecorationImage(
                image: Assets.images.bnbBlender.provider(),
                fit: BoxFit.fill,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8.r),
              ),
            ),
          ),
          12.horizontalSpace,
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'BNB Blender',
                  style: context.textTheme.titleSmall?.copyWith(
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w500,
                    color: const Color(0xFF27272A),
                  ),
                ),
                Text(
                  '04-05-2024',
                  style: context.textTheme.bodySmall?.copyWith(
                    color: const Color(0xFF7F7F89),
                    fontSize: 10.sp,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                4.verticalSpace,
                Text(
                  'Order no: #787654JK',
                  style: context.textTheme.bodySmall?.copyWith(
                    color: const Color(0xFF27272A),
                    fontSize: 12.sp,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                4.verticalSpace,
                Text(
                  formatCurrency.format(5000),
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFF27272A),
                    fontSize: 14.sp,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                Container(
                  height: 34.h,
                  clipBehavior: Clip.antiAlias,
                  decoration: ShapeDecoration(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(4.r),
                      side: const BorderSide(
                        color: Color(0xFFCCCCCC),
                      ),
                    ),
                  ),
                  padding: EdgeInsets.symmetric(
                    horizontal: 12.w,
                    vertical: 4.h,
                  ),
                  margin: EdgeInsets.only(top: 8.h),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    mainAxisSize: MainAxisSize.min,
                    children: _buildOrderStatus(context),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  List<Widget> _buildOrderStatus(BuildContext context) {
    return switch (status) {
      OrderStatus.ongoing => [
          SizedBox(
            height: 16.h,
            width: 16.w,
            child: const CircularProgressIndicator(
              backgroundColor: Color(0xFFF0CE9B),
              color: Color(0xFFD98404),
              strokeWidth: 2,
            ),
          ),
          8.horizontalSpace,
          Text(
            'ongoing',
            style: context.textTheme.bodySmall?.copyWith(
              color: const Color(0xFFD98404),
              fontSize: 12.sp,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      OrderStatus.completed => [
          Text(
            'Completed',
            style: context.textTheme.bodySmall?.copyWith(
              color: kDarkPrimaryColor,
              fontSize: 12.sp,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
    };
  }
}
