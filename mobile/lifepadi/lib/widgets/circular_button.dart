import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class CircularButton extends StatelessWidget {
  const CircularButton({
    super.key,
    required this.onTap,
    required this.child,
  });

  final VoidCallback onTap;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      customBorder: const CircleBorder(),
      child: Ink(
        width: 40.h,
        height: 40.h,
        decoration: ShapeDecoration(
          color: const Color(0xFFFCFCFC),
          shape: const CircleBorder(),
          shadows: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              spreadRadius: 1.r,
              blurRadius: 3.r,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: child,
      ),
    );
  }
}
