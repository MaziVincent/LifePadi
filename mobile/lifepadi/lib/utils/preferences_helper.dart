import 'dart:convert';

import 'package:lifepadi/models/notification.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PreferencesHelper {
  static SharedPreferences? _prefs;
  static final Map<String, dynamic> _memoryPrefs = {};

  static Future<void> load() async {
    _prefs ??= await SharedPreferences.getInstance();
    final keys = _prefs!.getKeys();
    if (keys.isNotEmpty) {
      for (final key in keys) {
        _memoryPrefs[key] = _prefs!.get(key);
      }
    }
  }

  static Future<void> setString({
    required String key,
    required String value,
  }) async {
    await _prefs!.setString(key, value);
    _memoryPrefs[key] = value;
  }

  static Future<void> setInt({required String key, required int value}) async {
    await _prefs!.setInt(key, value);
    _memoryPrefs[key] = value;
  }

  static Future<void> setDouble({
    required String key,
    required double value,
  }) async {
    await _prefs!.setDouble(key, value);
    _memoryPrefs[key] = value;
  }

  static Future<void> setBool({
    required String key,
    required bool value,
  }) async {
    await _prefs!.setBool(key, value);
    _memoryPrefs[key] = value;
  }

  static Future<void> setStringList({
    required String key,
    required List<String> value,
  }) async {
    await _prefs!.setStringList(key, value);
    _memoryPrefs[key] = value;
  }

  static Future<void> remove(String key) async {
    await _prefs!.remove(key);
    _memoryPrefs.remove(key);
  }

  static String? getString(String key) => _memoryPrefs.containsKey(key)
      ? _memoryPrefs[key] as String
      : _prefs!.getString(key);

  static int? getInt(String key) => _memoryPrefs.containsKey(key)
      ? _memoryPrefs[key] as int
      : _prefs!.getInt(key);

  static double? getDouble(String key) => _memoryPrefs.containsKey(key)
      ? _memoryPrefs[key] as double
      : _prefs!.getDouble(key);

  static bool? getBool(String key) => _memoryPrefs.containsKey(key)
      ? _memoryPrefs[key] as bool
      : _prefs!.getBool(key);

  static List<String>? getStringList(String key) =>
      _memoryPrefs.containsKey(key)
          ? List<String>.from(_memoryPrefs[key] as Iterable)
          : _prefs!.getStringList(key);

  static Future<void> cacheJsonString({
    required String key,
    required String value,
    Duration expirationDuration = const Duration(minutes: 30),
  }) async {
    final expirationTime = DateTime.now().add(expirationDuration);
    final item = <String, dynamic>{
      'data': value,
      'expiration': expirationTime.toIso8601String(),
    };

    await setString(key: key, value: jsonEncode(item));
  }

  static String? getCachedJsonString({
    required String key,
  }) {
    final data = getString(key);

    if (data == null) {
      return null;
    }

    // Decode the JSON
    final item = jsonDecode(data) as JsonMap;
    final expirationTime = DateTime.parse(item['expiration'] as String);

    // Check whether the data has expired
    if (expirationTime.isAfter(DateTime.now())) {
      // data has not expired;
      return item['data'] as String?;
    } else {
      // data has expired
      return null;
    }
  }

  /// Clear all the cached data
  static Future<void> clear() async {
    await _prefs!.clear();
    _memoryPrefs.clear();
  }

  /// Check if notifications are enabled.
  /// If not set, default to true
  ///
  /// This is because notifications are enabled by default
  /// and only disable them if the user explicitly chooses to do so
  static bool getNotificationsEnabled() {
    return getBool(kNotificationSettingsKey) ?? true;
  }

  static Future<void> setNotificationsEnabled({required bool enabled}) async {
    await setBool(key: kNotificationSettingsKey, value: enabled);
  }

  static Future<void> saveNotification({
    required String title,
    required String body, 
    required String? route,
  }) async {
    // Only save if notifications are enabled
    if (!getNotificationsEnabled()) return;

    final notification = Notification(
      id: DateTime.now().millisecondsSinceEpoch,
      title: title,
      body: body,
      route: route,
    );
    final notifications = getNotifications()..add(notification);
    await _prefs!.setString(kNotificationKey, jsonEncode(notifications));
  }

  static Future<void> saveNotifications(
    List<Notification> notifications,
  ) async {
    await _prefs!.setString(kNotificationKey, jsonEncode(notifications));
  }

  static List<Notification> getNotifications() {
    final notificationsJson = _prefs!.getString(kNotificationKey);
    if (notificationsJson == null) return [];

    try {
      final decoded = jsonDecode(notificationsJson) as List<dynamic>;
      return decoded.map((e) => Notification.fromJson(e as String)).toList();
    } catch (e) {
      logger.e('Error parsing notifications: $e');
      return [];
    }
  }

  /// Clear all the notifications
  static Future<void> clearNotifications() async {
    await _prefs!.remove(kNotificationKey);
  }
}
