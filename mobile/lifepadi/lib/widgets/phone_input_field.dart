import 'package:flutter/material.dart';
import 'package:intl_phone_number_input/intl_phone_number_input.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';

class PhoneInputField extends StatelessWidget {
  const PhoneInputField({
    super.key,
    required this.phone,
  });

  final ValueNotifier<String> phone;

  @override
  Widget build(BuildContext context) {
    return InternationalPhoneNumberInput(
      autoValidateMode: AutovalidateMode.onUserInteraction,
      initialValue: PhoneNumber(isoCode: 'NG'),
      onInputChanged: (PhoneNumber number) => phone.value = number.phoneNumber!,
      inputBorder: const OutlineInputBorder(),
      selectorConfig: const SelectorConfig(
        selectorType: PhoneInputSelectorType.DIALOG,
        useEmoji: true,
      ),
      autofillHints: const [
        AutofillHints.newUsername,
        AutofillHints.telephoneNumber,
      ],
      onFieldSubmitted: (_) => FocusScope.of(context).nextFocus(),
      cursorColor: kDarkPrimaryColor,
      inputDecoration: InputDecoration(
        border: inputBorder(),
        enabledBorder: inputBorder(
          color: phone.value.isNotEmpty ? const Color(0xFF21D1A5) : null,
        ),
        focusedBorder: inputBorder(color: const Color(0xFF21D1A5)),
        errorBorder: inputBorder(color: Colors.redAccent),
        hintText: 'Enter phone number',
        hintStyle: inputTextStyle(context),
        errorStyle: inputTextStyle(
          context,
          color: Colors.redAccent,
        ),
        labelStyle: inputTextStyle(
          context,
          color: const Color(0xFF858585),
        ),
        labelText: 'Phone number',
        floatingLabelStyle: floatingLabelTextStyle(),
        contentPadding: kInputPadding,
        floatingLabelBehavior: FloatingLabelBehavior.auto,
      ),
    );
  }
}
