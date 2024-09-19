import 'package:flutter/material.dart';
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
        hintStyle: inputTextStyle(context),
        errorStyle: inputTextStyle(context, color: Colors.redAccent),
        labelStyle: inputTextStyle(
          context,
          color: const Color(0xFF858585),
        ),
        labelText: labelText,
        floatingLabelStyle: floatingLabelTextStyle(),
        contentPadding: kInputPadding,
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
      style: inputTextStyle(context, forUserEnteredText: true),
      onTapOutside: (e) => FocusScope.of(context).unfocus(),
      obscureText: hideText,
      onFieldSubmitted: (_) => FocusScope.of(context).nextFocus(),
      onChanged: onChanged,
      validator: validator,
      autofillHints: autofillHints,
      maxLength: maxLength,
      maxLines: maxLines,
      autovalidateMode: AutovalidateMode.onUserInteraction,
    );
  }
}
