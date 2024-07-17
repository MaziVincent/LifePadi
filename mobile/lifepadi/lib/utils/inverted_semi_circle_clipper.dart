import 'package:flutter/material.dart';

class InvertedSemiCircleClipper extends CustomClipper<Path> {
  InvertedSemiCircleClipper({
    /// Inward depth
    this.controlPointYFactor = 2.0,

    /// Semi-circle width
    this.controlPointXFactor = 2.0,
  });

  final double controlPointYFactor;
  final double controlPointXFactor;

  @override
  Path getClip(Size size) {
    return Path()
      ..lineTo(0, size.height)
      ..lineTo(0, size.height - size.height / 30)
      ..quadraticBezierTo(
        size.width / controlPointXFactor,
        size.height - size.height / controlPointYFactor,
        size.width,
        size.height - size.height / 30,
      )
      ..lineTo(size.width, size.height)
      ..lineTo(size.width, 0)
      ..close();
  }

  @override
  bool shouldReclip(covariant CustomClipper<Path> oldClipper) {
    return true;
  }
}
