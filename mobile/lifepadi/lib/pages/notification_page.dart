import 'dart:async';

import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class NotificationPage extends HookWidget {
  const NotificationPage({super.key});

  @override
  Widget build(BuildContext context) {
    final notifications = useState(PreferencesHelper.getNotifications());

    useEffect(
      () {
        final timer = Timer.periodic(const Duration(minutes: 1), (_) {
          notifications.value = PreferencesHelper.getNotifications();
        });

        return timer.cancel;
      },
      const [],
    );

    Future<void> clearAllNotifications() async {
      await PreferencesHelper.clearNotifications();
      notifications.value = [];
    }

    return Scaffold(
      appBar: MyAppBar(
        title: 'Notifications',
        actions: [
          if (notifications.value.isNotEmpty)
            MyIconButton(
              icon: Remix.delete_bin_7_line,
              onPressed: () async {
                await openChoiceDialog(
                  context: context,
                  title: 'Clear all notifications',
                  description:
                      'Are you sure you want to clear all notifications?',
                  onYes: clearAllNotifications,
                  icon: Remix.delete_bin_7_fill,
                );
              },
            ),
        ],
      ),
      body: SuperListView(
        children: notifications.value.isEmpty
            ? [
                const Center(
                  child: Text(
                    'No notifications',
                    style: TextStyle(
                      fontSize: 18,
                      color: kDarkTextColor,
                    ),
                  ),
                ),
              ]
            : notifications.value.reversed.map((notification) {
                return NotificationTile(
                  title: notification.title,
                  description: notification.body,
                  time: notification.createdAt.timeAgo(withoutAgo: true),
                  primaryAction: notification.route != null
                      ? (
                          text: 'View',
                          onTap: () {
                            context.push(notification.route!);
                          },
                        )
                      : null,
                );
              }).toList(),
      ),
    );
  }
}
