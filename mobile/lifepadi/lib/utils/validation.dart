import 'package:form_validator/form_validator.dart';

StringValidationCallback buildEmailValidator() {
  return ValidationBuilder(
    requiredMessage: 'Email is required',
  ).email('Email is invalid').build();
}

StringValidationCallback buildPasswordValidator() {
  return ValidationBuilder(
    requiredMessage: 'Password is required',
  )
      .minLength(
        6,
        'Password must be at least 6 characters',
      )
      .maxLength(
        20,
        'Password must not exceed 20 characters',
      )
      .regExp(
        RegExp('[A-Z]'),
        'Password must contain at least one uppercase letter',
      )
      .regExp(
        RegExp('[a-z]'),
        'Password must contain at least one lowercase letter',
      )
      .regExp(
        RegExp('[0-9]'),
        'Password must contain at least one digit',
      )
      .regExp(
        RegExp(r'[!@#$%^&*(),.?":{}|<>]'),
        'Password must contain at least one special character',
      )
      .build();
}
