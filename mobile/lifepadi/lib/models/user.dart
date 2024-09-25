import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/user_role.dart';

part 'user.mapper.dart';

/// Represents the current user's authentication state.
@MappableClass(discriminatorKey: 'Role')
sealed class User with UserMappable {
  const User({
    required this.accessToken,
    required this.refreshToken,
    required this.email,
    required this.phoneNumber,
    required this.id,
    required this.role,
  });

  @MappableField()
  final String accessToken;
  @MappableField()
  final String refreshToken;
  @MappableField(key: 'Id')
  final int id;
  @MappableField(key: 'Email')
  final String email;
  @MappableField(key: 'PhoneNumber')
  final String phoneNumber;
  @MappableField(key: 'Role')
  final UserRole role;

  bool get isAuth => switch (this) {
        Guest() => false,
        _ => true,
      };

  static const fromMap = UserMapper.fromMap;
  static const fromJson = UserMapper.fromJson;
}

@MappableClass(discriminatorValue: 'Customer')
class Customer extends User with CustomerMappable {
  const Customer({
    required super.accessToken,
    required super.refreshToken,
    required super.id,
    required super.email,
    required super.phoneNumber,
    required super.role,
    required this.firstName,
    required this.lastName,
    this.address,
  });

  @MappableField(key: 'FirstName')
  final String firstName;
  @MappableField(key: 'LastName')
  final String lastName;
  @MappableField(key: 'ContactAddress')
  final String? address;

  String get name => '$firstName $lastName';
}

@MappableClass(discriminatorValue: 'Rider')
class Rider extends User with RiderMappable {
  const Rider({
    required super.accessToken,
    required super.refreshToken,
    required super.id,
    required super.email,
    required super.phoneNumber,
    required this.firstName,
    required this.lastName,
    required this.identityType,
    required this.identityNumber,
    required super.role,
    this.emergencyContact,
    this.address,
  });

  @MappableField(key: 'FirstName')
  final String firstName;
  @MappableField(key: 'LastName')
  final String lastName;
  @MappableField(key: 'IdentityType')
  final String? identityType;
  @MappableField(key: 'IdentityNumber')
  final String? identityNumber;
  @MappableField(key: 'EmergencyContact')
  final String? emergencyContact;
  @MappableField(key: 'ContactAddress')
  final String? address;

  String get name => '$firstName $lastName';
}

@MappableClass(discriminatorValue: 'Vendor')
class Vendor extends User with VendorMappable {
  const Vendor({
    required super.accessToken,
    required super.refreshToken,
    required super.id,
    required super.email,
    required super.phoneNumber,
    required this.name,
    required this.vendorType,
    required this.address,
    required super.role,
    this.serviceId,
  });

  @MappableField(key: 'Name')
  final String name;
  @MappableField(key: 'VendorType')
  final String vendorType;
  @MappableField(key: 'ContactAddress')
  final String address;
  @MappableField(key: 'ServiceId')
  final int? serviceId;
}

@MappableClass(discriminatorValue: 'Guest')
class Guest extends User with GuestMappable {
  const Guest()
      : super(
          accessToken: '',
          refreshToken: '',
          email: '',
          phoneNumber: '',
          id: 0,
          role: UserRole.guest,
        );
}
