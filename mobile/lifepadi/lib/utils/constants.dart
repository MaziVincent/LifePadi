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

const kRemoteApiUrl = 'https://lifepadi-948405839190.us-east1.run.app/api';

const kSignalRUrl =
    'https://lifepadi-948405839190.us-east1.run.app/hubs/location';

/// The cache time for the app on test
final kTestCacheTime = 10.seconds;

/// The cache time for the app on production
final kCacheTime = 10.minutes;

// Shared preferences keys
const kWishlistKey = 'wishlist';
const kCartKey = 'cart';
const kLogisticsKey = 'logistics_key';

const kGoogleMapsApiKey = 'AIzaSyC2RpKHucfu2rnTI_O5JXTiUCc0jyliA9k';

const kDeliveryPricePerKm = 300.0;

const kTotalDescription =
    'This is the total amount of all the items in your cart including the delivery fee and any other charges.';

final kTileDecoration = BoxDecoration(
  color: Colors.white,
  borderRadius: BorderRadius.circular(8.r),
  border: Border.all(color: const Color(0xFFE5E5E5)),
);
