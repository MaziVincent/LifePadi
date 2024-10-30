import 'package:flutter/material.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/models/user_role.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/extensions.dart';

List<({String name, String image})> mockErrands = [
  (name: 'Cooking gas', image: Assets.icons.cookingGas.path),
  (name: 'Food', image: Assets.icons.restaurant.path),
  (name: 'Petrol/Fuel', image: Assets.icons.fuelStation.path),
  (name: 'Laundry', image: Assets.icons.laundry.path),
  (name: 'Groceries', image: Assets.icons.groceryStore.path),
  (name: 'Gas filling', image: Assets.icons.gasFilling.path),
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

final mockVendors = [
  Vendor(
    id: 1,
    name: 'McDonald',
    imageUrl: Assets.images.vendors.mcdonald.path,
    address: '15 Foo Street, Bar City',
    email: '',
    phoneNumber: '',
    role: UserRole.guest,
    accessToken: '',
    refreshToken: '',
  ),
  Vendor(
    id: 2,
    name: 'Shoprite',
    imageUrl: Assets.images.vendors.shoprite.path,
    address: '16 Foo Street, Bar City',
    email: '',
    phoneNumber: '',
    role: UserRole.guest,
    accessToken: '',
    refreshToken: '',
  ),
  Vendor(
    id: 3,
    name: "Domino's Pizza",
    imageUrl: Assets.images.vendors.dominosPizza.path,
    address: '17 Foo Street, Bar City',
    email: '',
    phoneNumber: '',
    role: UserRole.guest,
    accessToken: '',
    refreshToken: '',
  ),
].repeat(3);
