import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';

class SenderChatBubble extends StatelessWidget {
  const SenderChatBubble({
    super.key,
    this.content = '',
    this.time = 'Just now',
    this.isTyping = false,
  });

  final String content;
  final String time;
  final bool isTyping;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: EdgeInsets.symmetric(
                horizontal: 15.w,
                vertical: isTyping ? 13.h : 10.h,
              ),
              margin: EdgeInsets.only(left: 10.w),
              constraints: BoxConstraints(maxWidth: 0.7.sw),
              decoration: ShapeDecoration(
                color: kLightPrimaryColor,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(10.r),
                    bottomLeft: Radius.circular(10.r),
                    bottomRight: Radius.circular(10.r),
                  ),
                ),
              ),
              child: Text(
                content,
                style: context.textTheme.bodyLarge?.copyWith(
                  color: Colors.white,
                  fontSize: 16.sp,
                  fontWeight: FontWeight.w400,
                ),
              ),
            ),
            if (!isTyping) ...[
              5.verticalSpace,
              Text(
                time,
                style: GoogleFonts.sourceSans3(
                  color: const Color(0x660D082C),
                  fontSize: 14.sp,
                  fontWeight: FontWeight.w400,
                ),
              ),
            ],
          ],
        ),
      ],
    );
  }
}
