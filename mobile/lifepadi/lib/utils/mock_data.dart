import 'package:flutter/material.dart';
import 'package:lifepadi/utils/assets.gen.dart';

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
