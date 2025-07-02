import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';

class ChatReply extends StatelessWidget {
  const ChatReply({
    super.key,
    required this.scrollController,
  });

  final ScrollController scrollController;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 30.w).copyWith(bottom: 6.h),
      child: Row(
        children: [
          Expanded(child: ReplyField(scrollController: scrollController)),
          Assets.icons.imageAttachment.image(width: 24.h, height: 24.h),
          10.horizontalSpace,
          InkWell(
            onTap: () async {
              // Make send message request

              // Add the message to the list of messages

              // Move the scroll position to the bottom
              await scrollController.animateTo(
                0, // 0 is the bottom since reverse is true
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeInOut,
              );

              // Empty the text field
            },
            customBorder: const CircleBorder(),
            child: Ink(
              width: 40.h,
              height: 40.h,
              decoration: const ShapeDecoration(
                color: kDarkPrimaryColor,
                shape: CircleBorder(),
              ),
              padding: EdgeInsets.symmetric(horizontal: 12.w, vertical: 6.h),
              child: Assets.icons.arrowRight.svg(
                colorFilter:
                    const ColorFilter.mode(Colors.white, BlendMode.srcIn),
                width: 24.h,
                height: 24.h,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class ReplyField extends StatelessWidget {
  const ReplyField({
    super.key,
    required this.scrollController,
  });

  final ScrollController scrollController;

  @override
  Widget build(BuildContext context) {
    return TextField(
      decoration: InputDecoration(
        hintText: 'Reply...',
        hintStyle: GoogleFonts.sourceSans3(
          color: const Color(0x990D082C),
          fontSize: 16.sp,
          fontWeight: FontWeight.w400,
        ),
        border: const OutlineInputBorder(
          borderSide: BorderSide.none,
        ),
        filled: true,
        fillColor: Colors.white,
      ),
      // multiLine: true,
    );
  }
}
