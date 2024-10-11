import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/extensions.dart';

class TypingLoader extends HookWidget {
  const TypingLoader({
    super.key,
    this.color = const Color(0xFFC6DEFF),
  });

  final Color color;

  @override
  Widget build(BuildContext context) {
    final animationController = useAnimationController(
      duration: const Duration(milliseconds: 1200),
    )..repeat(reverse: true);

    final animations = List.generate(3, (index) {
      return Tween<double>(begin: 0.3, end: 1).animate(
        CurvedAnimation(
          parent: animationController,
          curve: Interval(
            index * 0.2,
            1,
            curve: Curves.easeInOut,
          ),
        ),
      );
    });

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        for (int i = 0; i < 3; i++)
          AnimatedBuilder(
            animation: animations[i],
            builder: (context, child) {
              return Opacity(
                opacity: animations[i].value,
                child: Container(
                  width: 15.h,
                  height: 15.h,
                  decoration: ShapeDecoration(
                    color: color,
                    shape: const CircleBorder(),
                  ),
                ),
              );
            },
          ),
      ].separatedBy(8.horizontalSpace),
    );
  }
}
