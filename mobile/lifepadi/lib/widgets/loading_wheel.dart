import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class LoadingWheel extends StatefulWidget {
  const LoadingWheel({super.key});

  @override
  State createState() => _LoadingWheelState();
}

class _LoadingWheelState extends State<LoadingWheel>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(
        seconds: 2,
      ), // reduce the total duration for a faster cycle
    )..repeat();
    _animation = TweenSequence<double>([
      TweenSequenceItem(
        tween: Tween<double>(begin: 0, end: -2)
            .chain(CurveTween(curve: Curves.easeOut)),
        weight: 1.7, // increase the weight for a faster anticlockwise rotation
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
    ]).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: AnimatedBuilder(
        animation: _animation,
        builder: (context, child) {
          return Transform.rotate(
            angle: _animation.value * 3.14159,
            child: child,
          );
        },
        child: SvgPicture.asset('assets/animations/loading_circles.svg'),
      ),
    );
  }
}
