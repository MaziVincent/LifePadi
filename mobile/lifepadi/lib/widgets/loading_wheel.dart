import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:lifepadi/utils/assets.gen.dart';

abstract class LoadingWheel extends HookWidget {
  const LoadingWheel({super.key});

  Widget getWheelImage() {
    throw UnimplementedError();
  }

  @override
  Widget build(BuildContext context) {
    final controller = useAnimationController(
      duration: const Duration(seconds: 2),
    )..repeat();

    final animation = useMemoized(
      () {
        return TweenSequence<double>([
          TweenSequenceItem(
            tween: Tween<double>(begin: 0, end: -2)
                .chain(CurveTween(curve: Curves.easeOut)),
            weight: 1.7, // fast anticlockwise rotation
          ),
          TweenSequenceItem(
            tween: Tween<double>(begin: -2, end: -1.9)
                .chain(CurveTween(curve: Curves.easeInOut)),
            weight:
                2, // small tilt to the right from the end position of the first rotation
          ),
          TweenSequenceItem(
            tween: Tween<double>(begin: -1.9, end: -2.1)
                .chain(CurveTween(curve: Curves.easeInOut)),
            weight: 2, // small tilt to the left
          ),
          TweenSequenceItem(
            tween: Tween<double>(begin: -2.1, end: -2)
                .chain(CurveTween(curve: Curves.easeInOut)),
            weight: 2, // small tilt back to the end position
          ),
        ]).animate(controller);
      },
      [controller],
    );

    return Center(
      child: AnimatedBuilder(
        animation: animation,
        builder: (context, child) {
          return Transform.rotate(
            angle: animation.value * 3.14159,
            child: child,
          );
        },
        child: getWheelImage(),
      ),
    );
  }
}

class GreenyLoadingWheel extends LoadingWheel {
  const GreenyLoadingWheel({super.key});

  @override
  Widget getWheelImage() {
    return Assets.images.greenyWheel.svg();
  }
}

class OrangeyLoadingWheel extends LoadingWheel {
  const OrangeyLoadingWheel({super.key});

  @override
  Widget getWheelImage() {
    return Assets.images.orangeyWheel.svg();
  }
}
