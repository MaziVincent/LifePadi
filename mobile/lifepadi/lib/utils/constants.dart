import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

/// 0xFF629D03
const Color kDarkPrimaryColor = Color(0xFF629D03);

/// 0xFF9EC81D
const Color kLightPrimaryColor = Color(0xFF9EC81D);

/// 0xFF0F0F0F
const Color kDarkTextColor = Color(0xFF0F0F0F);

/// 0xFF5F5F5F
const Color kLightTextColor = Color(0xFF5F5F5F);

/// 0xFFEBEBF0
const Color kStrokeColor = Color(0xFFEBEBF0);

/// 0xFF139D01
const Color kBrightGreen = Color(0xFF139D01);

/// This horizontal padding is used in many places in the app, I
/// decided to create a getter for it to avoid repetition.
EdgeInsets get kHorizontalPadding => EdgeInsets.symmetric(horizontal: 24.w);

EdgeInsets get kInputPadding => EdgeInsets.only(
      top: 13.h,
      left: 13.01.w,
      right: 9.76.w,
      bottom: 13.h,
    );

const kRadialGradient = RadialGradient(
  colors: [Color(0xFF90DB19), kDarkPrimaryColor],
  radius: 0.85,
  center: Alignment(0.7386, -0.668),
  stops: [0.0, 1.0],
);

const kRemoteApiUrl =
    'https://4i2f5way3slxupj3rkqood3wje0txtca.lambda-url.us-east-1.on.aws/api';

/// The cache time for the app on test
final kTestCacheTime = 10.seconds;

/// The cache time for the app on production
final kCacheTime = 10.minutes;

/// Key for the wishlist in the shared preferences
const kWishlistKey = 'wishlist';

/// Key for the cart in the shared preferences
const String kCartKey = 'cart';

const kGoogleMapsApiKey = 'AIzaSyC2RpKHucfu2rnTI_O5JXTiUCc0jyliA9k';

const kDeliveryPricePerKm = 300.0;

const kTotalDescription =
    'This is the total amount of all the items in your cart including the delivery fee and any other charges.';
