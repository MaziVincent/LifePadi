import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';

class WalletAction extends StatelessWidget {
  const WalletAction({
    super.key,
    required this.onTap,
    required this.label,
    required this.icon,
  });

  final VoidCallback onTap;
  final String label;
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Icon(
            icon,
            color: kDarkPrimaryColor,
            size: 16.sp,
          ),
          8.verticalSpace,
          Text(
            label,
            textAlign: TextAlign.center,
            style: context.textTheme.bodySmall?.copyWith(
              color: kDarkPrimaryColor,
              fontSize: 12.sp,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}
