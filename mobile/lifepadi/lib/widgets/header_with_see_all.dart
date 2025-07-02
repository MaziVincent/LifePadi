import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/section_title.dart';

class HeaderWithSeeAll extends StatelessWidget {
  const HeaderWithSeeAll({
    super.key,
    required this.title,
    required this.onSeeAllTap,
  });

  final String title;
  final VoidCallback onSeeAllTap;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        SectionTitle(title),
        GestureDetector(
          onTap: onSeeAllTap,
          child: Text(
            'See all',
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: kDarkPrimaryColor,
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w500,
                ),
          ),
        ),
      ],
    );
  }
}
