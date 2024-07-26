import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/helpers.dart';

class VendorCard extends StatelessWidget {
  const VendorCard({
    super.key,
    required this.name,
    this.image,
    this.icon,
  }) : assert(
          (image == null) != (icon == null),
          'Either image or icon must be provided, but not both.',
        );

  final String name;
  final ImageProvider<Object>? image;
  final IconData? icon;

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
              shape: RoundedRectangleBorder(
                side: BorderSide(
                  width: 2.17.r,
                  color: const Color(0xFFD98303),
                ),
                borderRadius: BorderRadius.circular(25.99.r),
              ),
            ),
            padding: EdgeInsets.all(7.58.r),
            child: Container(
              width: 58.47.r,
              height: 58.47.r,
              decoration: ShapeDecoration(
                color: image == null ? const Color(0xFF5F5F5F) : null,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(19.49.r),
                ),
                image: image != null
                    ? DecorationImage(
                        image: image!,
                        fit: BoxFit.fill,
                      )
                    : null,
              ),
              child: icon != null
                  ? Icon(
                      icon,
                      size: 24.r,
                      color: Colors.white,
                    )
                  : null,
            ),
          ),
          6.5.verticalSpace,
          Padding(
            padding: EdgeInsets.only(left: 7.58.r, right: 8.05.r),
            child: Text(
              name,
              style: context.textTheme.bodySmall?.copyWith(
                color: const Color(0xFF2D4379),
                fontSize: 12.sp,
                fontWeight: FontWeight.w400,
                overflow: TextOverflow.ellipsis,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}
