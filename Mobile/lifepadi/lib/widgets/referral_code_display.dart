import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:remixicon/remixicon.dart';
import 'package:share_plus/share_plus.dart';

/// A widget that displays a referral code with copy and share functionality
class ReferralCodeDisplay extends StatelessWidget {
  const ReferralCodeDisplay({
    super.key,
    required this.referralCode,
    this.textStyle,
    this.iconColor,
    this.showLabel = true,
    this.isCompact = false,
  });

  final String referralCode;
  final TextStyle? textStyle;
  final Color? iconColor;
  final bool showLabel;
  final bool isCompact;

  @override
  Widget build(BuildContext context) {
    final defaultTextStyle = context.textTheme.bodySmall?.copyWith(
      color: iconColor ?? const Color(0xFF7F7F89),
      fontWeight: FontWeight.w400,
      fontSize: 12.sp,
    );

    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (showLabel) ...[
          Text(
            'Referral Code: ',
            style: textStyle ?? defaultTextStyle,
          ),
        ],
        Text(
          referralCode,
          style: (textStyle ?? defaultTextStyle)?.copyWith(
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(width: isCompact ? 4.w : 8.w),
        GestureDetector(
          onTap: () => _copyToClipboard(referralCode),
          child: Icon(
            Remix.file_copy_line,
            size: isCompact ? 14.sp : 16.sp,
            color: iconColor ?? const Color(0xFF7F7F89),
          ),
        ),
        SizedBox(width: isCompact ? 4.w : 6.w),
        GestureDetector(
          onTap: () => _shareReferralCode(referralCode),
          child: Icon(
            Remix.share_line,
            size: isCompact ? 14.sp : 16.sp,
            color: iconColor ?? const Color(0xFF7F7F89),
          ),
        ),
      ],
    );
  }

  Future<void> _copyToClipboard(String code) async {
    await Clipboard.setData(ClipboardData(text: code));
    await showToast('Referral code copied to clipboard');
  }

  void _shareReferralCode(String code) {
    SharePlus.instance.share(
      ShareParams(
        text:
            'Join LifePadi using my referral code: $code\n\nDownload the app and start enjoying seamless logistics services!',
        subject: 'Join LifePadi with my referral code',
      ),
    );
  }
}
