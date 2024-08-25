import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:remixicon/remixicon.dart';

class ChatReply extends StatelessWidget {
  const ChatReply({
    super.key,
    required this.scrollController,
  });

  final ScrollController scrollController;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 16.w).copyWith(bottom: 6.h),
      child: TextField(
        decoration: InputDecoration(
          hintText: 'Type your message...',
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(30.r),
          ),
          filled: true,
          fillColor: Colors.white,
          suffixIcon: IconButton(
            icon: const Icon(Remix.send_plane_fill),
            onPressed: () async {
              // Handle send message

              // Move the scroll position to the bottom
              await scrollController.animateTo(
                0,
                duration: const Duration(milliseconds: 300),
                curve: Curves.easeInOut,
              );

              // Empty the text field
            },
          ),
        ),
      ),
    );
  }
}
