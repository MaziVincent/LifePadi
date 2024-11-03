import 'package:dart_mappable/dart_mappable.dart';

part 'vendor.mapper.dart';

@MappableClass(discriminatorValue: 'Vendor')
class Vendor with VendorMappable {
  const Vendor({
    required this.id,
    required this.name,
    required this.address,
    required this.phoneNumber,
    this.imageUrl,
    this.openingHours,
    this.closingHours,
  });

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'Name')
  final String name;
  @MappableField(key: 'ContactAddress')
  final String address;
  @MappableField(key: 'PhoneNumber')
  final String phoneNumber;
  @MappableField(key: 'VendorImgUrl')
  final String? imageUrl;
  @MappableField(key: 'OpeningHours')
  final String? openingHours;
  @MappableField(key: 'ClosingHours')
  final String? closingHours;
}
