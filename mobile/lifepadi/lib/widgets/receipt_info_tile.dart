import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:remixicon/remixicon.dart';

class ReceiptInfoTile extends StatelessWidget {
  const ReceiptInfoTile({
    super.key,
    required this.left,
    required this.right,
    this.copiable = false,
  });

  final String left, right;
  final bool copiable;

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
      if (copiable)
        GestureDetector(
          onTap: () async => Clipboard.setData(ClipboardData(text: right))
              .then((_) async => showToast('Copied to clipboard')),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                right,
                style: context.textTheme.bodyMedium?.copyWith(
                  color: const Color(0xFF7F7F89),
                  fontSize: 14,
                  fontWeight: FontWeight.w400,
                ),
              ),
              SizedBox(width: 4.w),
              Icon(
                Remix.file_copy_line,
                size: 16.sp,
                color: const Color(0xFF7F7F89),
              ),
            ],
          ),
        )
      else
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
      padding: EdgeInsets.symmetric(horizontal: 20.w, vertical: 8.h),
      child: SizedBox(
        width: double.infinity,
        child: Wrap(
          alignment: WrapAlignment.spaceBetween,
          children: children,
        ),
      ),
    );
  }
}
