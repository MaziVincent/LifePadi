import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';

class MyIconButton extends StatelessWidget {
  const MyIconButton({
    super.key,
    required this.onPressed,
    this.backgroundColor,
    this.iconColor,
    required this.icon,
    this.showBadge = false,
  });

  final IconData icon;
  final VoidCallback onPressed;
  final Color? backgroundColor;
  final Color? iconColor;
  final bool showBadge;

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: onPressed,
      icon: Stack(
        children: [
          Icon(
            icon,
            color: iconColor,
          ),
          if (showBadge)
            Positioned(
              right: 2.r,
              top: 2.r,
              child: Container(
                width: 6.r,
                height: 6.r,
                decoration: const BoxDecoration(
                  color: Color(0xFFC01212),
                  shape: BoxShape.circle,
                ),
              ),
            ),
        ],
      ),
      padding: const EdgeInsets.all(8).r,
      style: IconButton.styleFrom(
        backgroundColor: backgroundColor ?? const Color(0xFFF5F5F5),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(4.r),
        ),
      ),
      iconSize: 18.r,
    );
  }
}
