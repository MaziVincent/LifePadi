import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';

class ToggleAuthPage extends StatelessWidget {
  const ToggleAuthPage({
    super.key,
    required this.question,
    required this.action,
    required this.onPressed,
  });

  final String question, action;

  /// The action to be performed when the action text is clicked.
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final textTheme = context.textTheme;

    return RichText(
      text: TextSpan(
        children: [
          TextSpan(
            text: '$question ',
            style: textTheme.bodyMedium?.copyWith(
              color: kLightTextColor,
              fontSize: 14.sp,
            ),
          ),
          TextSpan(
            recognizer: TapGestureRecognizer()..onTap = onPressed,
            text: action,
            style: textTheme.bodyLarge?.copyWith(
              color: kDarkPrimaryColor,
              fontWeight: FontWeight.w600,
              fontSize: 16.sp,
            ),
          ),
        ],
      ),
      textAlign: TextAlign.center,
    );
  }
}
