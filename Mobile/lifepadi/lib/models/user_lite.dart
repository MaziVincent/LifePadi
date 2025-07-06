import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/utils/extensions.dart';

part 'user_lite.mapper.dart';

/// Lite version of Customer model without authentication fields.
/// Used in contexts where auth tokens are not needed (e.g., order displays, public profiles).
@MappableClass()
class CustomerLite with CustomerLiteMappable {
  const CustomerLite({
    required this.id,
    required this.email,
    required this.phoneNumber,
    required this.firstName,
    required this.lastName,
    this.address,
    this.dateOfBirth,
    this.gender,
  });

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'Email')
  final String email;
  @MappableField(key: 'PhoneNumber')
  final String phoneNumber;
  @MappableField(key: 'FirstName')
  final String firstName;
  @MappableField(key: 'LastName')
  final String lastName;
  @MappableField(key: 'ContactAddress')
  final String? address;
  @MappableField(key: 'DateOfBirth')
  final DateTime? dateOfBirth;
  @MappableField(key: 'Gender')
  final String? gender;

  String get name => '${firstName.capitalize()} ${lastName.capitalize()}';

  static const fromMap = CustomerLiteMapper.fromMap;
  static const fromJson = CustomerLiteMapper.fromJson;
}

/// Lite version of Rider model without authentication fields.
/// Used in contexts where auth tokens are not needed (e.g., order displays, tracking).
@MappableClass()
class RiderLite with RiderLiteMappable {
  const RiderLite({
    required this.id,
    required this.email,
    required this.phoneNumber,
    required this.firstName,
    required this.lastName,
    this.address,
    required this.identityType,
    required this.identityNumber,
    this.emergencyContact,
    this.latitude,
    this.longitude,
  });

  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'Email')
  final String email;
  @MappableField(key: 'PhoneNumber')
  final String phoneNumber;
  @MappableField(key: 'FirstName')
  final String firstName;
  @MappableField(key: 'LastName')
  final String lastName;
  @MappableField(key: 'ContactAddress')
  final String? address;
  @MappableField(key: 'IdentityType')
  final String? identityType;
  @MappableField(key: 'IdentityNumber')
  final String? identityNumber;
  @MappableField(key: 'EmergencyContact')
  final String? emergencyContact;
  final double? latitude, longitude;

  String get name => '${firstName.capitalize()} ${lastName.capitalize()}';
  String get internationalPhone => '+234${phoneNumber.substring(1)}';

  static const fromMap = RiderLiteMapper.fromMap;
  static const fromJson = RiderLiteMapper.fromJson;
}
