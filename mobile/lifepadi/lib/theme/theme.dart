import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/no_transition_page.dart';

ThemeData lightTheme() {
  final base = ThemeData.light();

  return base.copyWith(
    primaryColor: kDarkPrimaryColor,
    textTheme: GoogleFonts.interTextTheme().apply(
      bodyColor: kDarkTextColor,
      displayColor: kDarkTextColor,
      fontFamily: 'Inter',
      fontFamilyFallback: ['Roboto', 'Noto Sans', 'sans-serif'],
    ),
    scaffoldBackgroundColor: Colors.white,
    pageTransitionsTheme: const PageTransitionsTheme(
      builders: {
        TargetPlatform.android: NoTransitionPageTransitionsBuilder(),
        TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),
      },
    ),
  );
}
