import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/utils/extensions.dart';

import 'widgets.dart';

class ChoiceAlertDialog extends StatelessWidget {
  const ChoiceAlertDialog({
    super.key,
    this.onYes,
    this.onCancel,
    required this.title,
    required this.description,
    this.yesText,
    this.cancelText,
    required this.icon,
    this.iconColor,
    this.iconBackgroundColor,
    this.hasCancel = true,
  });

  final VoidCallback? onYes, onCancel;
  final String title, description;
  final String? yesText, cancelText;
  final IconData icon;
  final Color? iconColor;
  final Color? iconBackgroundColor;
  final bool hasCancel;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 332.w,
      padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 32.h),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 108.h,
            height: 108.h,
            decoration: ShapeDecoration(
              color: iconBackgroundColor ?? const Color(0xFFECECEC),
              shape: const CircleBorder(),
            ),
            child: Icon(
              icon,
              color: iconColor ?? Colors.black.withValues(alpha: 0.5),
              size: 48.h,
            ),
          ),
          Text(
            title,
            style: context.textTheme.titleLarge?.copyWith(
              color: const Color(0xFF0E0E0E),
              fontSize: 18.sp,
              fontWeight: FontWeight.w500,
            ),
          ),
          Text(
            description,
            style: context.textTheme.bodyLarge?.copyWith(
              color: const Color(0xFF0E0E0E),
              fontSize: 16.sp,
              fontWeight: FontWeight.w400,
            ),
            textAlign: TextAlign.center,
          ),
          Row(
            children: [
              if (hasCancel)
                Expanded(
                  child: PrimaryOutlineChoiceButton(
                    onPressed: onCancel ?? () => context.pop(false),
                    text: cancelText ?? 'Cancel',
                  ),
                ),
              16.horizontalSpace,
              Expanded(
                child: PrimaryChoiceButton(
                  onPressed: () {
                    onYes?.call();
                    context.pop(true);
                  },
                  text: yesText ?? 'Yes',
                ),
              ),
            ],
          ),
        ].separatedBy(16.verticalSpace),
      ),
    );
  }
}
