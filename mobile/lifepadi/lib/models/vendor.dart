import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/utils/helpers.dart';

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
  @MappableField(key: 'Addresses', hook: VendorAddressHook())
  final LocationDetails address;
  @MappableField(key: 'PhoneNumber')
  final String phoneNumber;
  @MappableField(key: 'VendorImgUrl')
  final String? imageUrl;
  @MappableField(key: 'OpeningHours')
  final String? openingHours;
  @MappableField(key: 'ClosingHours')
  final String? closingHours;
}

class VendorAddressHook extends MappingHook {
  const VendorAddressHook();

  /// Decode the address from a list of json objects
  /// Return the first address from the list
  @override
  LocationDetails beforeDecode(Object? value) {
    final addresses = value! as List;
    return LocationDetailsMapper.fromMap(JsonMap.from(addresses.first as Map));
  }

  /// Encode the address to a list of json objects
  /// Return the address as a list
  @override
  Object? beforeEncode(Object? value) {
    final address = value! as LocationDetails;
    return [address.toMap()];
  }
}
