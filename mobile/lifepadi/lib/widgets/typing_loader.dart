import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/helpers.dart';

class TypingLoader extends StatelessWidget {
  const TypingLoader({
    super.key,
    this.color = const Color(0xFFC6DEFF),
  });

  final Color color;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        for (final _ in [1, 2, 3])
          Container(
            width: 15.h,
            height: 15.h,
            decoration: ShapeDecoration(
              color: color,
              shape: const CircleBorder(),
            ),
          ),
      ].separatedBy(8.horizontalSpace),
    );
  }
}
