import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
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
    bottomSheetTheme: BottomSheetThemeData(
      showDragHandle: true,
      backgroundColor: Colors.white,
      dragHandleSize: Size(72.w, 8.h),
      dragHandleColor: kDarkTextColor,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(32),
        ),
      ),
    ),
  );
}
