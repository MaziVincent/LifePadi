import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class SingleChatPage extends StatelessWidget {
  const SingleChatPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context) {
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
      body: CustomScrollView(
        slivers: [
          SliverPadding(
            padding: EdgeInsets.symmetric(horizontal: 40.w).copyWith(top: 22.h),
            sliver: SliverToBoxAdapter(
              child: Center(
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
            ),
          ),
          SliverPadding(
            padding: EdgeInsets.symmetric(horizontal: 30.w, vertical: 30.h),
            sliver: SliverList.list(
              children: [
                const SenderMessage(
                  content: 'Hello, Sir?',
                  time: '08:15 AM',
                ),
                const ReceiverMessage(
                  content: 'hello Mabel',
                  time: '08:16 AM',
                ),
                const SenderMessage(
                  content:
                      'Please, can you help with the price tag of all the product?',
                ),
                const ReceiverMessage(
                  isTyping: true,
                ),
                const SenderMessage(
                  isTyping: true,
                ),
              ].separatedBy(21.verticalSpace),
            ),
          ),
        ],
      ),
    );
  }
}
