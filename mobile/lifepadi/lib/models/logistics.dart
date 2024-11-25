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
    this.deliveryFee = 0,
  });

  final int id;
  final String senderName;
  final String senderPhone;
  final LocationDetails pickupLocation;
  final String receiverName;
  final String receiverPhone;
  final LocationDetails dropoffLocation;
  final String item;
  final String? description;
  final double? weight;
  final bool fragile;
  final double deliveryFee;
}
