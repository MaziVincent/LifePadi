import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/utils/constants.dart';

ThemeData lightTheme() => ThemeData.light().copyWith(
      primaryColor: kDarkPrimary,
      textTheme: GoogleFonts.interTextTheme().apply(
        bodyColor: const Color(0xFF0F0F0F),
        displayColor: const Color(0xFF0F0F0F),
      ),
    );
