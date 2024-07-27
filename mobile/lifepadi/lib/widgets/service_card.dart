import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/helpers.dart';

class ServiceCard extends StatelessWidget {
  const ServiceCard({
    super.key,
    required this.name,
    required this.outerColor,
    required this.innerColor,
    required this.image,
  });

  final String name;
  final Color outerColor, innerColor;
  final String image;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 100.13.r,
      width: 73.63.r,
      child: Column(
        children: [
          Container(
            height: 73.63.r,
            width: 73.63.r,
            decoration: ShapeDecoration(
              color: outerColor,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(25.99.r),
              ),
            ),
            padding: const EdgeInsets.fromLTRB(14, 13.87, 13.38, 13.51).r,
            child: Container(
              width: 46.24.r,
              height: 46.24.r,
              decoration: ShapeDecoration(
                color: innerColor,
                shape: const CircleBorder(),
              ),
              padding: const EdgeInsets.all(11).r,
              child: Image.asset(
                image,
                width: 24.r,
                height: 24.r,
              ), // image should be here
            ),
          ),
          6.5.verticalSpace,
          Text(
            name,
            style: context.textTheme.bodySmall?.copyWith(
              color: const Color(0xFF2D4379),
              fontSize: 12.sp,
              fontWeight: FontWeight.w400,
              overflow: TextOverflow.ellipsis,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}
