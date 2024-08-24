import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';

import 'avatar.dart';

class ChatTile extends StatelessWidget {
  const ChatTile({
    super.key,
    required this.subject,
    required this.content,
    required this.time,
    this.image,
    this.unreadMessages,
    this.inItalics = false,
  });

  final String subject, content, time;
  final ImageProvider? image;
  final int? unreadMessages;
  final bool inItalics;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        // TODO: Go to the chat screen
      },
      child: Ink(
        width: double.infinity,
        decoration: const BoxDecoration(
          border: Border(
            bottom: BorderSide(
              color: kStrokeColor,
            ),
          ),
        ),
        padding: EdgeInsets.symmetric(vertical: 22.h, horizontal: 24.w),
        child: Row(
          children: <Widget>[
            Avatar(image: image, size: 45.h),
            21.horizontalSpace,
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text(
                        subject,
                        style: context.textTheme.bodyMedium?.copyWith(
                          color: Colors.black,
                          fontSize: 16.sp,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      10.horizontalSpace,
                      if (unreadMessages != null && unreadMessages! > 0)
                        Container(
                          width: 13.02.h,
                          height: 13.02.h,
                          decoration: const BoxDecoration(
                            color: Color(0xFF139D01),
                            shape: BoxShape.circle,
                          ),
                          child: Center(
                            child: Text(
                              unreadMessages.toString(),
                              style: context.textTheme.bodyMedium?.copyWith(
                                color: Colors.white,
                                fontSize: 8.sp,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ),
                        ),
                    ],
                  ),
                  3.verticalSpace,
                  Text(
                    content,
                    style: context.textTheme.bodyMedium?.copyWith(
                      color: const Color(0xFF9C9696),
                      fontSize: 14.sp,
                      fontWeight: FontWeight.w400,
                      fontStyle: inItalics ? FontStyle.italic : null,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ],
              ),
            ),
            10.horizontalSpace,
            Text(
              time,
              style: context.textTheme.bodyMedium?.copyWith(
                color: const Color(0xFFC4BDBD),
                fontSize: 14.sp,
                fontWeight: FontWeight.w400,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
