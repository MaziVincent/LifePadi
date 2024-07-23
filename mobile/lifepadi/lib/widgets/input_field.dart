import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/utils/constants.dart';

class InputField extends StatelessWidget {
  const InputField({
    super.key,
    required this.child,
    required this.onTap,
    required this.hintText,
    required this.labelText,
    required this.keyboardType,
    this.textInputAction,
    this.hideText = false,
    this.onChanged,
    this.validator,
  });

  final Widget child;

  /// Callback to be executed when the suffix icon is tapped
  final VoidCallback onTap;
  final String hintText, labelText;
  final TextInputType keyboardType;
  final TextInputAction? textInputAction;
  final bool hideText;

  /// Callback to be executed when the value changes
  final ValueChanged<String>? onChanged;

  /// Validator to be executed when the value changes
  final String? Function(String?)? validator;

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    TextStyle? inputTextStyle({Color? color, double? fontSize}) {
      return textTheme.bodySmall?.copyWith(
        color: color ?? const Color(0xFFC2C8D0),
        fontSize: fontSize ?? 14.sp,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.12.r,
      );
    }

    OutlineInputBorder inputBorder({Color? color}) {
      return OutlineInputBorder(
        borderRadius: BorderRadius.circular(3.25.r),
        borderSide: BorderSide(
          color: color ?? const Color(0xFFC2C8D0),
          width: 0.81.r,
        ),
      );
    }

    return TextFormField(
      cursorColor: kDarkPrimaryColor,
      decoration: InputDecoration(
        border: inputBorder(),
        enabledBorder: inputBorder(),
        focusedBorder: inputBorder(color: const Color(0xFF21D1A5)),
        errorBorder: inputBorder(color: const Color(0xFFBD5A56)),
        hintText: hintText,
        hintStyle: inputTextStyle(),
        errorStyle: inputTextStyle(color: const Color(0xFFBD5A56)),
        labelStyle: inputTextStyle(
          color: const Color(0xFF858585),
          fontSize: 16.sp,
        ),
        labelText: labelText,
        floatingLabelStyle: GoogleFonts.roboto(
          color: const Color(0xFF21D1A5),
          fontSize: 14.sp,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.33.r,
        ),
        contentPadding: const EdgeInsets.only(
          top: 13,
          left: 13.01,
          right: 9.76,
          bottom: 13,
        ).r,
        suffixIcon: GestureDetector(
          onTap: onTap,
          child: child,
        ),
        floatingLabelBehavior: FloatingLabelBehavior.auto,
      ),
      keyboardType: keyboardType,
      textInputAction: textInputAction ?? TextInputAction.next,
      style: textTheme.bodyLarge?.copyWith(
        color: Colors.black,
        fontSize: 16.sp,
        fontWeight: FontWeight.w400,
        letterSpacing: 0.12.r,
      ),
      onTapOutside: (e) => FocusScope.of(context).unfocus(),
      obscureText: hideText,
      onFieldSubmitted: (_) => FocusScope.of(context).nextFocus(),
      onChanged: onChanged,
      validator: validator,
    );
  }
}
