import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/extensions.dart';

class ReceiptInfoTile extends StatelessWidget {
  const ReceiptInfoTile({
    super.key,
    required this.left,
    required this.right,
  });

  final String left, right;

  @override
  Widget build(BuildContext context) {
    final children = <Widget>[
      Text(
        left,
        style: context.textTheme.bodyLarge?.copyWith(
          color: const Color(0xFF1A202E),
          fontSize: 16.sp,
          fontWeight: FontWeight.w500,
        ),
      ),
      Text(
        right,
        style: context.textTheme.bodyMedium?.copyWith(
          color: const Color(0xFF7F7F89),
          fontSize: 14,
          fontWeight: FontWeight.w400,
        ),
      ),
    ];

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 9.64.h),
      child: Wrap(
        alignment: WrapAlignment.spaceBetween,
        children: children,
      ),
    );
  }
}
