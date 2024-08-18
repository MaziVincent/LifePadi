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

/// 0xFFEBEBF0
const Color kStrokeColor = Color(0xFFEBEBF0);

/// This horizontal padding is used in many places in the app, I
/// decided to create a getter for it to avoid repetition.
EdgeInsets get kHorizontalPadding => EdgeInsets.symmetric(horizontal: 24.w);

List<({String name, String image})> services = [
  (name: 'Cooking gas', image: Assets.icons.cookingGas.path),
  (name: 'Food', image: Assets.icons.restaurant.path),
  (name: 'Petrol/Fuel', image: Assets.icons.fuelStation.path),
  (name: 'Laundry', image: Assets.icons.laundry.path),
  (name: 'Groceries', image: Assets.icons.groceryStore.path),
  (name: 'Gas filling', image: Assets.icons.gasFilling.path),
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

List<({String name, ImageProvider<Object> image})> vendors = [
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
