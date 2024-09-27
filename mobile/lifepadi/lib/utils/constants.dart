import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
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

List<({String name, String image})> mockErrands = [
  (name: 'Cooking gas', image: Assets.icons.cookingGas.path),
  (name: 'Food', image: Assets.icons.restaurant.path),
  (name: 'Petrol/Fuel', image: Assets.icons.fuelStation.path),
  (name: 'Laundry', image: Assets.icons.laundry.path),
  (name: 'Groceries', image: Assets.icons.groceryStore.path),
  (name: 'Gas filling', image: Assets.icons.gasFilling.path),
];

const featuredCategories = [
  'All',
  'Fashion',
  'Agro-product',
  'Stationary',
  'Pharmaceutical',
  'Furniture',
];

List<({String name, String image})> categories = [
  (name: 'Vegetables', image: Assets.images.categories.vegetable.path),
  (name: 'Fruits', image: Assets.images.categories.fruit.path),
  (name: 'Beverages', image: Assets.images.categories.beverage.path),
  (name: 'Grocery', image: Assets.images.categories.grocery.path),
  (name: 'Edible Oil', image: Assets.images.categories.edibleOil.path),
  (name: 'Household', image: Assets.images.categories.household.path),
  (name: 'Babycare', image: Assets.images.categories.babycare.path),
  (name: 'Electronics', image: Assets.images.categories.electronic.path),
  (name: 'Fashion', image: Assets.images.categories.fashion.path),
  (name: 'Pharmaceutical', image: Assets.images.categories.pharmaceutical.path),
  (name: 'Furniture', image: Assets.images.categories.furniture.path),
  (name: 'Agro', image: Assets.images.categories.agro.path),
];

List<({String name, ImageProvider<Object> image})> mockVendors = [
  (name: 'McDonald', image: Assets.images.vendors.mcdonald.provider()),
  (name: 'Shoprite', image: Assets.images.vendors.shoprite.provider()),
  (
    name: "Domino's Pizza",
    image: Assets.images.vendors.dominosPizza.provider()
  ),
  (name: 'Shoprite', image: Assets.images.vendors.shoprite.provider()),
  (name: 'McDonald', image: Assets.images.vendors.mcdonald.provider()),
  (name: 'Shoprite', image: Assets.images.vendors.shoprite.provider()),
  (
    name: "Domino's Pizza",
    image: Assets.images.vendors.dominosPizza.provider()
  ),
  (name: 'Shoprite', image: Assets.images.vendors.shoprite.provider()),
  (name: 'McDonald', image: Assets.images.vendors.mcdonald.provider()),
  (name: 'Shoprite', image: Assets.images.vendors.shoprite.provider()),
  (
    name: "Domino's Pizza",
    image: Assets.images.vendors.dominosPizza.provider()
  ),
  (name: 'Shoprite', image: Assets.images.vendors.shoprite.provider()),
];

List<
    ({
      int id,
      String description,
      Image image,
      double? balance,
      bool isDefault
    })> paymentMethods = [
  (
    id: 1,
    description: 'Lifepadi wallet',
    image: Assets.images.logoDark.image(),
    balance: 51547,
    isDefault: true,
  ),
  (
    id: 2,
    description: '2345 3456 4564 Access bank',
    image: Assets.icons.mastercard.image(),
    balance: null,
    isDefault: false,
  ),
  (
    id: 3,
    description: '2345 3456 4564 Access bank',
    image: Assets.icons.verve.image(),
    balance: null,
    isDefault: false,
  ),
];

/// The cache time for the app on test
final kTestCacheTime = 10.seconds;

/// The cache time for the app on production
final kCacheTime = 10.minutes;
