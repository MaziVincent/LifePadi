import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

extension WidgetIterableExtension on Iterable<Widget> {
  /// Add a specified widget between each pair of widgets.
  List<Widget> separatedBy(Widget child) {
    final iterator = this.iterator;
    final result = <Widget>[];

    if (iterator.moveNext()) result.add(iterator.current);

    while (iterator.moveNext()) {
      result
        ..add(child)
        ..add(iterator.current);
    }

    return result;
  }
}

extension TextThemeExtension on BuildContext {
  TextTheme get textTheme => Theme.of(this).textTheme;
}

final currencyFormatter = NumberFormat.currency(
  locale: 'en_US',
  symbol: '\u20a6', // naira unicode character
  decimalDigits: 0,
);

/// Extension on [num] to format currency.
extension Currency on num {
  /// Format a number as currency.
  String get currency => currencyFormatter.format(this);

  /// Format a number as currency without the currency symbol.
  String get currencyWithoutSymbol =>
      currencyFormatter.format(this).substring(1);
}

extension ReadableDateTime on DateTime {
  String get readable {
    return DateFormat('d MMM yyyy, hh:mm a').format(this);
  }

  String get readableDate {
    return DateFormat('dd-MM-yyyy').format(this);
  }

  /// Return the month of the date in short month format.
  ///
  /// e.g. Jan, Feb, Mar, etc.
  String get shortMonth {
    return DateFormat.MMM().format(this);
  }
}

extension ListRepetition<T> on List<T> {
  List<T> repeat(int times) {
    return List.generate(times, (_) => this).expand((x) => x).toList();
  }
}

extension StringCasingExtension on String {
  /// Capitalize the first letter of a string.
  ///
  /// Turns the rest of the letters to lowercase
  String capitalize() =>
      length > 0 ? '${this[0].toUpperCase()}${substring(1).toLowerCase()}' : '';
}
