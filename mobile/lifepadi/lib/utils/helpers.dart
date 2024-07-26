import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:logger/logger.dart';

/// Onboarding Feature information.
typedef OnboardingInfo = ({String info, String description, String image});

Logger logger = Logger(
  printer: PrettyPrinter(
    methodCount: 0,
  ),
);

Future<bool?> showToast(
  String msg, {
  Toast? toastLength,
  Color? backgroundColor,
  double? fontSize,
  Color? textColor,
  ToastGravity? gravity,
}) {
  return Fluttertoast.showToast(
    msg: msg,
    backgroundColor: backgroundColor ?? Colors.black54,
    toastLength: toastLength,
    fontSize: fontSize,
    textColor: textColor,
    gravity: gravity,
  );
}

extension WidgetIterableExtension on Iterable<Widget> {
  /// Add a specified widget between each pair of widgets.
  List<Widget> addBetween(Widget child) {
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
