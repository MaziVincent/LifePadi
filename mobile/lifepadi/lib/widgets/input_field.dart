import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';

/// A custom input field widget
class InputField extends StatelessWidget {
  const InputField({
    super.key,
    this.child,
    this.onChildTap,
    required this.hintText,
    required this.labelText,
    required this.keyboardType,
    required this.hasValue,
    this.textInputAction = TextInputAction.next,
    this.hideText = false,
    this.onChanged,
    this.validator,
    this.autofillHints,
    this.maxLines = 1,
    this.maxLength,
  });

  /// The child widget to be displayed as the suffix icon
  final Widget? child;

  /// Callback to be executed when the suffix icon is tapped
  final VoidCallback? onChildTap;

  /// The hint and label texts to be displayed in the input field
  final String hintText, labelText;

  /// The type of keyboard to be displayed
  final TextInputType keyboardType;

  /// The action to be performed when the user submits the input field
  final TextInputAction textInputAction;

  /// Check if the input field should hide the text
  final bool hideText;

  /// Check if the input field has a value
  final bool hasValue;

  /// Callback to be executed when the value changes
  final ValueChanged<String>? onChanged;

  /// Validator to be executed when the value changes
  final String? Function(String?)? validator;

  /// Autofill hints to be displayed in the input field
  final Iterable<String>? autofillHints;

  /// The maximum number of lines and characters allowed in the input field
  final int? maxLines, maxLength;

  @override
  Widget build(BuildContext context) {
    TextStyle? inputTextStyle({Color? color, double? fontSize}) {
      return context.textTheme.bodySmall?.copyWith(
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
        enabledBorder: inputBorder(
          color: hasValue ? const Color(0xFF21D1A5) : null,
        ),
        focusedBorder: inputBorder(color: const Color(0xFF21D1A5)),
        errorBorder: inputBorder(color: Colors.redAccent),
        hintText: hintText,
        hintStyle: inputTextStyle(),
        errorStyle: inputTextStyle(color: Colors.redAccent),
        labelStyle: inputTextStyle(
          color: const Color(0xFF858585),
        ),
        labelText: labelText,
        floatingLabelStyle: GoogleFonts.roboto(
          color: const Color(0xFF21D1A5),
          fontSize: 14.sp,
          fontWeight: FontWeight.w400,
          letterSpacing: 0.33.r,
        ),
        contentPadding: EdgeInsets.only(
          top: 13.h,
          left: 13.01.w,
          right: 9.76.w,
          bottom: 13.h,
        ),
        suffixIcon: child != null
            ? GestureDetector(
                onTap: onChildTap,
                child: child,
              )
            : null,
        floatingLabelBehavior: FloatingLabelBehavior.auto,
      ),
      keyboardType: keyboardType,
      textInputAction: textInputAction,
      style: context.textTheme.bodyLarge?.copyWith(
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
      autofillHints: autofillHints,
      maxLength: maxLength,
      maxLines: maxLines,
    );
  }
}
