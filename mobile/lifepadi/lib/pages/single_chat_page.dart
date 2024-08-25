import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class SingleChatPage extends HookWidget {
  const SingleChatPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context) {
    final scrollController = useScrollController();

    return Scaffold(
      appBar: MyAppBar(
        title: 'John Bayo',
        actions: [
          MyIconButton(
            icon: Remix.more_2_fill,
            onPressed: () {},
          ),
        ],
      ),
      resizeToAvoidBottomInset: true,
      body: Column(
        children: [
          Expanded(
            child: Align(
              alignment: Alignment.topCenter,
              child: ListView(
                controller: scrollController,
                padding: EdgeInsets.symmetric(horizontal: 30.w).copyWith(
                  top: 30.h,
                  bottom: 16.h,
                ),
                reverse: true,
                shrinkWrap: true,
                children: [
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 10.w),
                    child: Text(
                      'A live chat interface that allows for seamless, natural communication with lifepadi agents',
                      textAlign: TextAlign.center,
                      style: context.textTheme.bodySmall?.copyWith(
                        color: const Color(0xFF757575),
                        fontSize: 12.sp,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ),
                  const SenderChatBubble(
                    content: 'Hello, Sir?',
                    time: '08:15 AM',
                  ),
                  const ReceiverChatBubble(
                    content: 'hello Mabel',
                    time: '08:16 AM',
                  ),
                  const SenderChatBubble(
                    content:
                        'Please, can you help with the price tag of all the product?',
                  ),
                  for (final i in List.generate(10, (index) => index))
                    i.isEven
                        ? const SenderChatBubble(
                            content: 'Hello, Sir?',
                            time: '08:15 AM',
                          )
                        : const ReceiverChatBubble(
                            content: 'hello Mabel',
                            time: '08:16 AM',
                          ),
                  const ReceiverChatBubble(
                    isTyping: true,
                  ),
                ].separatedBy(21.verticalSpace).reversed.toList(),
              ),
            ),
          ),
          ChatReply(
            scrollController: scrollController,
          ),
        ],
      ),
    );
  }
}
