import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';

/// 0xFF629D03
const Color kDarkPrimaryColor = Color(0xFF629D03);

/// 0xFF9EC81D
const Color kLightPrimaryColor = Color(0xFF9EC81D);

/// 0xFF0F0F0F
const Color kDarkTextColor = Color(0xFF0F0F0F);

/// 0xFF5F5F5F
const Color kLightTextColor = Color(0xFF5F5F5F);

List<({String name, String image})> services = [
  (name: 'Cooking gas', image: Assets.icons.cookingGas.path),
  (name: 'Food', image: Assets.icons.restaurant.path),
  (name: 'Petrol/Fuel', image: Assets.icons.fuelStation.path),
  (name: 'Laundry', image: Assets.icons.laundry.path),
  (name: 'Groceries', image: Assets.icons.groceryStore.path),
  (name: 'Gas filling', image: Assets.icons.gasFilling.path),
];

/// This horizontal padding is used in many places in the app, I decided to
/// create it as a constant to avoid repetition.
EdgeInsetsGeometry get kHorizontalPadding =>
    EdgeInsets.symmetric(horizontal: 24.w);
