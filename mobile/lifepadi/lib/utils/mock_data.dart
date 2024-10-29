import 'package:flutter/material.dart';
import 'package:lifepadi/models/product.dart';
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

final List<Product> mockProducts = [
  Product(
    id: 1,
    name: 'BNB Blender',
    description: 'High-quality blender for all your kitchen needs.',
    price: 33000,
    imageUrl: Assets.images.bnbBlender.path,
    vendor: mockVendors[0],
  ),
  Product(
    id: 2,
    name: 'Oil Perfumes',
    description: 'Exquisite oil perfumes for a lasting fragrance.',
    price: 500,
    imageUrl: Assets.images.oilPerfumes.path,
    vendor: mockVendors[1],
  ),
  Product(
    id: 3,
    name: 'Plain Tees',
    description: 'Comfortable plain tees for everyday wear.',
    price: 5000,
    imageUrl: Assets.images.plainTees.path,
    vendor: mockVendors[2],
  ),
].repeat(2);
