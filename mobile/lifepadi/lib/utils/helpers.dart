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
