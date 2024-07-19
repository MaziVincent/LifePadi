import 'package:flutter/material.dart';
import 'package:logger/logger.dart';

/// #629D03
const Color kDarkPrimaryColor = Color(0xFF629D03);

/// #9EC81D
const Color kLightPrimaryColor = Color(0xFF9EC81D);

/// #0F0F0F
const Color kDarkTextColor = Color(0xFF0F0F0F);

/// #5F5F5F
const Color kLightTextColor = Color(0xFF5F5F5F);

Logger logger = Logger(
  printer: PrettyPrinter(
    methodCount: 0,
  ),
);
