import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/constants.dart';

class SwitchInput extends StatelessWidget {
  const SwitchInput({
    super.key,
    required this.value,
    required this.onChanged,
    this.width,
    this.height,
  });

  final bool value;
  final ValueChanged<bool> onChanged;
  final double? width, height;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: height ?? 40.53.h,
      width: width ?? 30.83.w,
      child: FittedBox(
        fit: BoxFit.cover,
        child: Switch.adaptive(
          value: value,
          onChanged: onChanged,
          activeTrackColor: kLightPrimaryColor,
          trackOutlineWidth: const WidgetStatePropertyAll(1),
          inactiveTrackColor: Colors.white,
        ),
      ),
    );
  }
}
