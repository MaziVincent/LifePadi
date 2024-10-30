import 'dart:convert';

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

  static void setString({required String key, required String value}) {
    _prefs!.setString(key, value);
    _memoryPrefs[key] = value;
  }

  static void setInt({required String key, required int value}) {
    _prefs!.setInt(key, value);
    _memoryPrefs[key] = value;
  }

  static void setDouble({required String key, required double value}) {
    _prefs!.setDouble(key, value);
    _memoryPrefs[key] = value;
  }

  static void setBool({required String key, required bool value}) {
    _prefs!.setBool(key, value);
    _memoryPrefs[key] = value;
  }

  static void setStringList({
    required String key,
    required List<String> value,
  }) {
    _prefs!.setStringList(key, value);
    _memoryPrefs[key] = value;
  }

  static void remove(String key) {
    _prefs!.remove(key);
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

  static void cacheJsonString({
    required String key,
    required String value,
    Duration expirationDuration = const Duration(minutes: 30),
  }) {
    final expirationTime = DateTime.now().add(expirationDuration);
    final item = <String, dynamic>{
      'data': value,
      'expiration': expirationTime.toIso8601String(),
    };

    setString(key: key, value: jsonEncode(item));
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
}
