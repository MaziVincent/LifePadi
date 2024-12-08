import 'package:awesome_notifications/awesome_notifications.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
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
  }) async {
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

  /// Subscribe to a topic
  static Future<void> susbcribeToTopic(String topic) async {
    await FirebaseMessaging.instance.subscribeToTopic(topic);
  }

  /// Unsubscribe from a topic
  static Future<void> unsuscribeFromTopic(String topic) async {
    await FirebaseMessaging.instance.unsubscribeFromTopic(topic);
  }

  /// Delete a notification by its id
  static Future<void> deleteNotification(int id) async {
    await AwesomeNotifications().cancel(id);
  }

  /// Get the FCM token
  /// This token is used to send notifications to a specific device
  static Future<String?> getFcmToken() async {
    return FirebaseMessaging.instance.getToken();
  }

  /// Listen for FCM notifications
  static Future<void> listenForFcmNotifications() async {
    // Terminated
    await FirebaseMessaging.instance.getInitialMessage().then((message) async {
      if (message != null) {
        if (message.notification?.title == null) return;
        final route = message.data['route'] as String?;

        await PreferencesHelper.saveNotification(
          title: message.notification?.title ?? '',
          body: message.notification?.body ?? '',
          route: route,
        );
      }
    });

    // Background
    FirebaseMessaging.onBackgroundMessage((message) async {
      if (message.notification?.title == null) return;
      final route = message.data['route'] as String?;

      await PreferencesHelper.saveNotification(
        title: message.notification?.title ?? '',
        body: message.notification?.body ?? '',
        route: route,
      );
    });

    // Foreground
    FirebaseMessaging.onMessage.listen((message) async {
      if (message.notification?.title == null) return;
      final route = message.data['route'] as String?;

      await PreferencesHelper.saveNotification(
        title: message.notification?.title ?? '',
        body: message.notification?.body ?? '',
        route: route,
      );
    });
  }
}
