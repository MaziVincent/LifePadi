import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:infinite_scroll_pagination/infinite_scroll_pagination.dart';

part 'use_paging_controller.dart';
part 'use_side_effect.dart';

/// Debounces a value with a given delay
T useDebounce<T>(
  T value, {
  Duration delay = const Duration(milliseconds: 500),
}) {
  final debouncedValue = useState(value);

  useEffect(
    () {
      final timer = Timer(delay, () => debouncedValue.value = value);
      return timer.cancel;
    },
    [value],
  );

  return debouncedValue.value;
}
