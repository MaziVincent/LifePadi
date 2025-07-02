import 'package:flutter/material.dart';
import 'package:lifepadi/utils/constants.dart';

class MyDivider extends StatelessWidget {
  const MyDivider({
    super.key,
    this.color = kStrokeColor,
    this.height = 1,
  });

  final Color color;
  final double height;

  @override
  Widget build(BuildContext context) {
    return Divider(
      color: color,
      height: 1,
    );
  }
}
