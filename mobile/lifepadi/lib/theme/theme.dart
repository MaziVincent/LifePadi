import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/utils/constants.dart';

ThemeData lightTheme() {
  final base = ThemeData.light();

  return base.copyWith(
    primaryColor: kDarkPrimaryColor,
    textTheme: GoogleFonts.interTextTheme().apply(
      bodyColor: kDarkTextColor,
      displayColor: kDarkTextColor,
    ),
    scaffoldBackgroundColor: Colors.white,
  );
}
