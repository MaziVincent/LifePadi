import 'dart:async';

import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/router/routes.dart';
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
        children: !PreferencesHelper.getNotificationsEnabled()
            ? [
                Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(
                        "You've disabled notifications",
                        style: TextStyle(
                          fontSize: 18.sp,
                          color: kDarkTextColor,
                        ),
                      ),
                      10.verticalSpace,
                      TextButton(
                        onPressed: () =>
                            context.go(const ProfileRoute().location),
                        child: Text(
                          'Enable from profile page',
                          style: context.textTheme.bodyMedium?.copyWith(
                            fontSize: 14.sp,
                            color: kDarkPrimaryColor,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ]
            : notifications.value.isEmpty
                ? [
                    const Center(
                      child: Text(
                        'None yet, enjoy the silence😊',
                        style: TextStyle(
                          fontSize: 18,
                          color: kDarkTextColor,
                        ),
                      ),
                    ),
                  ]
                : notifications.value.reversed.map((notification) {
                    return Dismissible(
                      key: ValueKey(notification.id),
                      direction: DismissDirection.endToStart,
                      background: Container(
                        alignment: Alignment.centerRight,
                        padding: EdgeInsets.only(right: 20.w),
                        color: Colors.red,
                        child: const Icon(Icons.delete, color: Colors.white),
                      ),
                      onDismissed: (_) async {
                        notifications.value = notifications.value
                            .where((n) => n.id != notification.id)
                            .toList();
                        await PreferencesHelper.saveNotifications(
                          notifications.value,
                        );
                      },
                      child: NotificationTile(
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
                      ),
                    );
                  }).toList(),
      ),
    );
  }
}
