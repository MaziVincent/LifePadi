import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:remixicon/remixicon.dart';
import 'package:share_plus/share_plus.dart';

/// A profile detail info widget with copy and share actions for referral codes
class ProfileDetailInfoWithActions extends StatelessWidget {
  const ProfileDetailInfoWithActions({
    super.key,
    required this.name,
    required this.value,
  });

  final String name;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(
        left: 20.w,
        right: 20.w,
        top: 5.h,
        bottom: 10.64.h,
      ),
      decoration: BoxDecoration(
        border: Border(
          bottom: BorderSide(
            color: const Color(0xFFF9F9FF),
            width: 1.21.h,
          ),
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Wrap(
              alignment: WrapAlignment.spaceBetween,
              crossAxisAlignment: WrapCrossAlignment.center,
              spacing: 10.w,
              runSpacing: 5.h,
              runAlignment: WrapAlignment.spaceBetween,
              children: [
                Text(
                  name,
                  style: TextStyle(
                    color: const Color(0xFF1A202E),
                    fontSize: 16.sp,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      value,
                      style: TextStyle(
                        color: const Color(0xFF7F7F89),
                        fontSize: 14.sp,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                    SizedBox(width: 8.w),
                    GestureDetector(
                      onTap: () => _copyToClipboard(value),
                      child: Icon(
                        Remix.file_copy_line,
                        size: 16.sp,
                        color: const Color(0xFF7F7F89),
                      ),
                    ),
                    SizedBox(width: 6.w),
                    GestureDetector(
                      onTap: () => _shareReferralCode(value),
                      child: Icon(
                        Remix.share_line,
                        size: 16.sp,
                        color: const Color(0xFF7F7F89),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
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
