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
    description: 'Paystack',
    image: Assets.icons.paystack.image(
      height: 24,
      width: 24,
    ),
    balance: null,
    isDefault: false,
  ),
];
