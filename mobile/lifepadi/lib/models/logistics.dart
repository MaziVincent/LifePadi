import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/location_details.dart';

part 'logistics.mapper.dart';

@MappableClass()
class Logistics with LogisticsMappable {
  const Logistics({
    required this.id,
    required this.senderName,
    required this.senderPhone,
    required this.pickupLocation,
    required this.receiverName,
    required this.receiverPhone,
    required this.dropoffLocation,
    required this.item,
    this.description,
    this.weight,
    required this.fragile,
    this.deliveryFee = 0.0,
    this.isPaid = false,
  });

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'SenderName')
  final String senderName;
  @MappableField(key: 'SenderPhone')
  final String senderPhone;
  @MappableField(key: 'SenderAddress')
  final LocationDetails pickupLocation;
  @MappableField(key: 'ReceiverName')
  final String receiverName;
  @MappableField(key: 'ReceiverPhone')
  final String receiverPhone;
  @MappableField(key: 'ReceiverAddress')
  final LocationDetails dropoffLocation;
  @MappableField(key: 'Item')
  final String item;
  @MappableField(key: 'ItemDescription')
  final String? description;
  @MappableField(key: 'ItemWeight')
  final double? weight;
  @MappableField(key: 'IsFragile')
  final bool fragile;
  @MappableField(key: 'DeliveryFee')
  final double deliveryFee;
  final bool isPaid;
}
