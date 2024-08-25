import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class ReceiverChatBubble extends StatelessWidget {
  const ReceiverChatBubble({
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
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Avatar(
          size: 40.h,
          image: Assets.images.johnBayo.provider(),
        ),
        10.horizontalSpace,
        ConstrainedBox(
          constraints: BoxConstraints(maxWidth: 0.7.sw),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Container(
                padding: EdgeInsets.symmetric(
                  horizontal: 15.w,
                  vertical: isTyping ? 13.h : 10.h,
                ),
                decoration: ShapeDecoration(
                  color: const Color(0xFFF1F7FF),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.only(
                      topRight: Radius.circular(10.r),
                      bottomLeft: Radius.circular(10.r),
                      bottomRight: Radius.circular(10.r),
                    ),
                  ),
                ),
                margin: EdgeInsets.only(right: 10.w),
                child: isTyping
                    ? const TypingLoader()
                    : Text(
                        content,
                        style: context.textTheme.bodyLarge?.copyWith(
                          color: const Color(0xFF0D082B),
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
        ),
      ],
    );
  }
}
