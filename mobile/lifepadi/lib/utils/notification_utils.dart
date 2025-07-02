import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:lifepadi/widgets/widgets.dart' hide Notification;

class NotificationUtils {
  static Future<void> initialize() async {
    await AwesomeNotifications().initialize(
      null,
      [
        NotificationChannel(
          channelGroupKey: 'orders_channel_group',
          channelKey: 'orders_channel',
          channelName: 'Order notifications',
          channelDescription: 'Notification for order status updates',
          defaultColor: kDarkPrimaryColor,
          ledColor: Colors.white,
          importance: NotificationImportance.Max,
          channelShowBadge: true,
          playSound: true,
          criticalAlerts: true,
        ),
      ],
      channelGroups: [
        NotificationChannelGroup(
          channelGroupKey: 'orders_channel_group',
          channelGroupName: 'Order notifications group',
        ),
      ],
      debug: true,
    );

    await AwesomeNotifications().isNotificationAllowed().then((isAllowed) {
      if (!isAllowed) {
        AwesomeNotifications().requestPermissionToSendNotifications();
      }
    });

    await AwesomeNotifications()
        .setListeners(onActionReceivedMethod: onActionReceivedMethod);
  }

  /// Use this method to detect when the user taps on a notification or action button
  static Future<void> onActionReceivedMethod(
    ReceivedAction receivedAction,
  ) async {
    debugPrint('onActionReceivedMethod');
    final payload = receivedAction.payload ?? {};
    if (payload['route'] != null && payload['route']!.isNotEmpty) {
      final context = rootNavigatorKey.currentContext;
      if (context != null) {
        context.go(payload['route']!);
      }
    }
  }

  static Future<void> showNotification({
    required final String title,
    required final String body,
    final String? summary,
    final Map<String, String>? payload,
    final ActionType actionType = ActionType.Default,
    final NotificationLayout notificationLayout = NotificationLayout.Default,
    final NotificationCategory? category,
    final String? bannerImageUrl,
    final List<NotificationActionButton>? actionButtons,
    String channelKey = 'orders_channel',
    int id = -1,
    bool save = false,
  }) async {
    if (save) {
      await PreferencesHelper.saveNotification(
        title: title,
        body: body,
        route: payload?['route'],
      );
    }
    await AwesomeNotifications().createNotification(
      content: NotificationContent(
        id: id,
        channelKey: channelKey,
        title: title,
        body: body,
        actionType: actionType,
        notificationLayout: notificationLayout,
        summary: summary,
        category: category,
        payload: payload,
        bigPicture: bannerImageUrl,
      ),
      actionButtons: actionButtons,
    );
  }

  /// Delete a notification by its id
  static Future<void> deleteNotification(int id) async {
    await AwesomeNotifications().cancel(id);
  }
}
