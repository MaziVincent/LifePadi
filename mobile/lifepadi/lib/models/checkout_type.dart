import 'package:dart_mappable/dart_mappable.dart';

part 'checkout_type.mapper.dart';

/// Enum for different checkout types
@MappableEnum(defaultValue: CheckoutType.cart)
enum CheckoutType {
  /// For cart checkout
  @MappableValue('Normal')
  cart,

  /// For logistics checkout
  @MappableValue('Logistics')
  logistics,

  /// For wallet top-up
  @MappableValue('Deposit')
  topUp;

  /// Getter that returns human-readable page name based on the checkout type
  /// This is used for displaying the name of the page in the UI
  String get pageName => switch (this) {
        CheckoutType.cart || CheckoutType.logistics => 'Orders',
        CheckoutType.topUp => 'Top Up',
      };
}
