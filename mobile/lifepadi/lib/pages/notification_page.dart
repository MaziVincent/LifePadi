import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class NotificationPage extends HookWidget {
  const NotificationPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(
        title: 'Notifications',
        actions: [
          MyIconButton(
            icon: Remix.more_2_fill,
            onPressed: () {
              // TODO: Add clear all or other options here using a popup menu
            },
          ),
        ],
      ),
      body: ListView(
        children: [
          NotificationTile(
            title: 'Payment Top-up Alert!',
            description:
                'We wanted to notify you that a payment top-up has been processed on your account. Please make payment so we can proceed with your shopping.',
            time: '14h',
            primaryAction: (text: 'Make Payment', onTap: () {}),
            secondaryAction: (text: 'Decline', onTap: () {}),
          ),
          NotificationTile(
            title: 'Patrick added a review on an item you purchased.',
            description:
                'Looks perfect, bought it for my technical workshop tomorrow!',
            time: '8h',
            image: Assets.images.johnDoeAvatar.provider(),
          ),
          NotificationTile(
            title: 'New Feature Alert!',
            description:
                "We're pleased to introduce the latest enhancements in our delivery experience.",
            time: '14h',
            primaryAction: (text: 'Try now', onTap: () {}),
          ),
        ],
      ),
    );
  }
}
