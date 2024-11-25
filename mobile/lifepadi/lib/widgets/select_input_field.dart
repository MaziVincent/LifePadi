import 'package:flutter/material.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';

/// A reusable select input field widget
class SelectInputField<T> extends StatelessWidget {
  const SelectInputField({
    super.key,
    required this.hintText,
    required this.labelText,
    required this.items,
    required this.onChanged,
    this.value,
  });

  /// The hint and label texts to be displayed in the input field
  final String hintText, labelText;

  /// The list of items to be displayed in the dropdown
  final List<T> items;

  /// The currently selected value
  final T? value;

  /// Callback to be executed when the value changes
  final ValueChanged<T?> onChanged;

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<T>(
      decoration: InputDecoration(
        border: inputBorder(),
        enabledBorder: inputBorder(),
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
        floatingLabelBehavior: FloatingLabelBehavior.auto,
      ),
      value: value,
      items: items.map((item) {
        return DropdownMenuItem<T>(
          value: item,
          child: Text(item.toString()),
        );
      }).toList(),
      onChanged: onChanged,
      isExpanded: true,
      dropdownColor: const Color(0xFFF5F5F5),
      style: inputTextStyle(context, forUserEnteredText: true),
      validator: (value) =>
          value == null ? 'Please select ${labelText.toLowerCase()}' : null,
    );
  }
}
