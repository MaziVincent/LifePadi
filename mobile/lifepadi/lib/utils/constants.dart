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

/// 0xFFF52311
const Color kDangerColor = Color(0xFFF52311);

/// 0xFFFFF5F5
const Color kLightDanger = Color(0xFFFFF5F5);

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

const kRemoteApiUrl = 'https://lifepadi-v2-225229879541.us-east1.run.app/api';
const kSignalRLocationUrl =
    'https://lifepadi-v2-225229879541.us-east1.run.app/hubs/location';
const kPrivacyPolicyUrl = 'https://lifepadi.com/privacypolicy';
const kTermsAndConditionsUrl = 'https://lifepadi.com/termsandconditions';
const kFaqUrl = 'https://lifepadi.com/faq';

/// The cache time for the app on test
final kTestCacheTime = 10.seconds;

/// The cache time for the app on production
final kCacheTime = 10.minutes;

// Shared preferences keys
const kWishlistKey = 'wishlist';
const kCartKey = 'cart';
const kLogisticsKey = 'logistics';
const kNotificationKey = 'notifications';
const kNotificationSettingsKey = 'notification_settings';
const kBiometricsKey = 'biometrics_enabled';
const kHasEverLoggedIn = 'hasEverLoggedIn';
const kHasSeenOnboarding = 'hasSeenOnboarding';

/// Google Maps API key.
///
/// Provide via `--dart-define=GOOGLE_MAPS_API_KEY=...` at build time so the key
/// is not committed to source control. Falls back to an empty string when
/// missing; calling code should validate before use.
const kGoogleMapsApiKey = String.fromEnvironment('GOOGLE_MAPS_API_KEY');

const kTotalDescription =
    'This is the total amount of all the items in your cart including the delivery fee and any other charges.';

const String kCredentialsKey = 'currentUser';
const String kLastRouteKey = 'lastRoute'; // Key for storing last route

// Background tasks
const kPingRider = 'lifepadi.pingRider';
