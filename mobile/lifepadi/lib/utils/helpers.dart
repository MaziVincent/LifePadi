import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:intl/intl.dart';
import 'package:logger/logger.dart';

/// Onboarding Feature information.
typedef OnboardingInfo = ({String info, String description, String image});

Logger logger = Logger(
  printer: PrettyPrinter(
    methodCount: 0,
  ),
);

Future<bool?> showToast(
  String message, {
  Toast? toastLength,
  Color? backgroundColor,
  double? fontSize,
  Color? textColor,
  ToastGravity? gravity,
}) {
  return Fluttertoast.showToast(
    msg: message,
    backgroundColor: backgroundColor ?? Colors.black54,
    toastLength: toastLength,
    fontSize: fontSize,
    textColor: textColor,
    gravity: gravity,
  );
}

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

final formatCurrency = NumberFormat.currency(
  locale: 'en_US',
  symbol: '\u20a6', // naira unicode character
  decimalDigits: 0,
);
