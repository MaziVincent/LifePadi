import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/utils/constants.dart';

extension CacheFor<T> on AutoDisposeRef<T> {
  void cacheFor(Duration duration) {
    final link = keepAlive();
    final timer = Timer(duration, link.close);

    onDispose(timer.cancel);
  }

  void cache() {
    if (kDebugMode) {
      this.cacheFor(kTestCacheTime);
    } else {
      this.cacheFor(kCacheTime);
    }
  }
}
