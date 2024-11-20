import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/utils/extensions.dart';

part 'discount.mapper.dart';

@MappableClass()
class Discount with DiscountMappable {
  Discount({
    required this.id,
    required this.code,
    this.amount,
    this.percentage,
    required this.isActive,
  });

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'Code')
  final String code;
  @MappableField(key: 'DiscountAmount')
  final double? amount;
  @MappableField(key: 'DiscountPercentage')
  final int? percentage;
  @MappableField(key: 'IsActive')
  final bool isActive;

  /// Get the discount statement
  String get statement {
    if (amount != null) {
      return 'You have a discount of ${amount!.currency} on this order';
    } else if (percentage != null) {
      return 'You have a discount of $percentage% on this order';
    }
    return '';
  }
}
