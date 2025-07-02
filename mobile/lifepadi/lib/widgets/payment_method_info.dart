import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/extensions.dart';

class PaymentMethodInfo extends StatelessWidget {
  const PaymentMethodInfo({
    super.key,
    required this.imagePath,
    required this.name,
    required this.id,
    this.imageHeight,
    this.imageWidth,
    this.isDefault = false,
  });

  final String imagePath;
  final String name;
  final double? imageHeight, imageWidth;
  final int id;
  final bool isDefault;

  @override
  Widget build(BuildContext context) {
    final borderRadius = BorderRadius.circular(8.r);

    return Container(
      width: double.infinity,
      height: 67.h,
      decoration: ShapeDecoration(
        shape: RoundedRectangleBorder(
          side: const BorderSide(color: Color(0xFFEBEBF0)),
          borderRadius: borderRadius,
        ),
      ),
      padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 12.h),
      child: Row(
        children: [
          /// Payment method logo
          Container(
            height: 41.67.h,
            width: 41.67.h,
            decoration: BoxDecoration(
              color: isDefault ? const Color(0x4CD9D9D9) : null,
              borderRadius: BorderRadius.circular(14.r),
            ),
           padding: EdgeInsets.only(
                  top: 8.83.h,
                  left: 11.17.w,
                  right: 10.48.w,
                  bottom: 7.83.h,
                ),
            child: Image.asset(
              imagePath,
              height: imageHeight ?? 24,
              width: imageWidth ?? 24,
            ),
          ),
    
          /// Payment method description
          Expanded(
            child: Text(
              name,
              style: context.textTheme.bodyMedium?.copyWith(
                color: const Color(0xFF27272A),
                fontSize: 14.sp,
                fontWeight: FontWeight.w700,
                overflow: TextOverflow.ellipsis,
              ),
            ),
          ),
        ].separatedBy(8.horizontalSpace),
      ),
    );
  }
}
