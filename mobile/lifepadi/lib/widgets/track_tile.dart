import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/section_title.dart';

enum TrackStatus { pending, completed }

class TrackTile extends StatelessWidget {
  const TrackTile({
    super.key,
    required this.title,
    required this.subtitle,
    required this.icon,
    this.status = TrackStatus.completed,
  });

  final String title;
  final String subtitle;
  final String icon;
  final TrackStatus status;

  @override
  Widget build(BuildContext context) {
    final iconColor = switch (status) {
      TrackStatus.completed => const Color(0xFF28B446),
      TrackStatus.pending => const Color(0xFF868889),
    };
    final iconBackground = switch (status) {
      TrackStatus.completed => const Color(0xFFEAFFD7),
      TrackStatus.pending => const Color(0xFFF5F5F5),
    };

    return Container(
      height: 68.h,
      width: double.infinity,
      padding: EdgeInsets.symmetric(vertical: 10.h),
      decoration: const BoxDecoration(
        border: Border(
          bottom: BorderSide(color: Color(0xFFEBEBF0)),
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 48.h,
            height: 48.h,
            decoration: ShapeDecoration(
              color: iconBackground,
              shape: const CircleBorder(),
            ),
            padding: EdgeInsets.all(12.37.r),
            child: SvgPicture.asset(
              icon,
              height: 23.27.h,
              width: 23.27.h,
              colorFilter: ColorFilter.mode(
                iconColor,
                BlendMode.srcIn,
              ),
            ),
          ),
          12.horizontalSpace,
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SectionTitle(
                title,
                color: const Color(0xFF27272A),
              ),
              Text(
                subtitle,
                style: context.textTheme.bodySmall?.copyWith(
                  color: const Color(0xFF7F7F89),
                  fontSize: 10.sp,
                  fontWeight: FontWeight.w400,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
