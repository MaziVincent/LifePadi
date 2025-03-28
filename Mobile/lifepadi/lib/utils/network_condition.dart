import 'dart:async';
import 'dart:io';

import 'package:flutter/foundation.dart';

class Logger {
  Logger(this.name);
  final String name;

  void log(String message) {
    if (kDebugMode) {
      print('[$name] $message');
    }
  }
}

final $networkCondition = NetworkCondition();

class NetworkCondition extends ValueNotifier<bool?> {
  NetworkCondition() : super(null);

  static final _log = Logger('NetworkCondition');
  static const _fetchInterval = Duration(seconds: 15);

  Timer? timer;

  Future<void> initState() async {
    await _update();
    timer = Timer.periodic(_fetchInterval, (_) => _update());
  }

  Future<void> _update() async {
    final c = HttpClient();
    late bool newValue;
    try {
      final req = await c.getUrl(Uri.parse('https://google.com'));
      final res = await req.close();
      newValue = res.statusCode >= 200 && res.statusCode < 300;
    } catch (e) {
      newValue = false;
    }

    if (newValue != value) {
      value = newValue;
      _log.log('online: $value');
    }
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }
}
