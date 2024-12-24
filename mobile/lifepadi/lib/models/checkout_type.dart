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
  topUp,
}
