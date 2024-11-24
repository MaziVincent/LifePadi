import 'package:dart_mappable/dart_mappable.dart';

part 'delivery.mapper.dart';

@MappableClass()
class Delivery with DeliveryMappable {
  Delivery({
    required this.id,
    required this.fee,
    required this.status,
    required this.orderId,
    required this.addressId,
    this.pickupAddressId,
  });

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'DeliveryFee')
  final double fee;
  @MappableField(key: 'Status')
  final String status;
  @MappableField(key: 'OrderId')
  final int orderId;
  @MappableField(key: 'AddressId')
  final int addressId;
  final int? pickupAddressId;
}
