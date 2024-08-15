import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/outlined_rectangle_button.dart';
import 'package:lifepadi/widgets/primary_rectangle_button.dart';

class NotificationCard extends StatelessWidget {
  const NotificationCard({
    super.key,
    required this.title,
    required this.description,
    required this.time,
    this.image,
    this.primaryAction,
    this.secondaryAction,
  });

  final String title, description, time;
  final Widget? image;
  final ({String text, VoidCallback onTap})? primaryAction;
  final ({String text, VoidCallback onTap})? secondaryAction;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: kStrokeColor,
          ),
        ),
      ),
      padding: EdgeInsets.symmetric(vertical: 20.83.h, horizontal: 24.w),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Container(
            height: 41.67.h,
            width: 41.67.h,
            decoration: const BoxDecoration(
              color: Color(0xFFE2E8F0),
              shape: BoxShape.circle,
            ),
            padding: image != null
                ? EdgeInsets.zero
                : EdgeInsets.only(
                    top: 8.83.h,
                    left: 11.17.w,
                    right: 10.48.w,
                    bottom: 7.83.h,
                  ),
            child: image ?? Assets.images.logoDark.image(),
          ),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFF334155),
                    fontSize: 12.50.sp,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                8.33.verticalSpace,
                Text(
                  description,
                  style: context.textTheme.bodyMedium?.copyWith(
                    color: const Color(0xFF334155),
                    fontSize: 12.50.sp,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                8.33.verticalSpace,
                if (primaryAction != null || secondaryAction != null)
                  Row(
                    children: [
                      if (primaryAction != null)
                        PrimaryRectangleButton(
                          text: primaryAction!.text,
                          onTap: primaryAction!.onTap,
                        ),
                      6.25.horizontalSpace,
                      if (secondaryAction != null)
                        OutlinedRectangleButton(
                          text: secondaryAction!.text,
                          onTap: secondaryAction!.onTap,
                        ),
                    ],
                  ),
              ],
            ),
          ),
          Text(
            time,
            style: context.textTheme.bodyMedium?.copyWith(
              color: const Color(0xFF475569),
              fontSize: 12.50.sp,
              fontWeight: FontWeight.w400,
            ),
          ),
        ].separatedBy(12.5.horizontalSpace),
      ),
    );
  }
}
