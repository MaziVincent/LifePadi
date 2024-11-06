import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class SectionTitle extends StatelessWidget {
  const SectionTitle(
    this.title, {
    super.key,
    this.color,
    this.handleOverFlow = false,
  });

  final String title;
  final Color? color;
  final bool handleOverFlow;

  @override
  Widget build(BuildContext context) {
    if (handleOverFlow && title.length > 15) {
      return Flexible(
        child: SizedBox(
          width: 18.w,
          child: Tooltip(
            message: title,
            showDuration: 2.seconds,
            triggerMode: TooltipTriggerMode.tap,
            child: Text(
              title,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontSize: 16.sp,
                    fontWeight: FontWeight.w600,
                    color: color,
                    overflow: TextOverflow.ellipsis,
                  ),
            ),
          ),
        ),
      );
    }

    return Text(
      title,
      style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontSize: 16.sp,
            fontWeight: FontWeight.w600,
            color: color,
          ),
    );
  }
}
