import 'package:dart_mappable/dart_mappable.dart';
import 'package:lifepadi/models/user_role.dart';

part 'user.mapper.dart';

/// Represents the current user's authentication state.
@MappableClass(discriminatorKey: 'Role')
sealed class User with UserMappable {
  const User({
    required this.id,
    required this.email,
    required this.phoneNumber,
    required this.role,
    required this.accessToken,
    required this.refreshToken,
    required this.firstName,
    required this.lastName,
    this.address,
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
  @MappableField(key: 'FirstName')
  final String firstName;
  @MappableField(key: 'LastName')
  final String lastName;
  @MappableField(key: 'ContactAddress')
  final String? address;

  bool get isAuth => switch (this) {
        Guest() => false,
        _ => true,
      };

  static const fromMap = UserMapper.fromMap;
  static const fromJson = UserMapper.fromJson;

  String get name => '$firstName $lastName';
}

@MappableClass(discriminatorValue: 'Customer')
class Customer extends User with CustomerMappable {
  const Customer({
    required super.id,
    required super.email,
    required super.phoneNumber,
    required super.firstName,
    required super.lastName,
    required super.role,
    required super.accessToken,
    required super.refreshToken,
    super.address,
  });
}

@MappableClass(discriminatorValue: 'Rider')
class Rider extends User with RiderMappable {
  const Rider({
    required super.id,
    required super.email,
    required super.phoneNumber,
    required super.firstName,
    required super.lastName,
    super.address,
    required super.role,
    required super.accessToken,
    required super.refreshToken,
    required this.identityType,
    required this.identityNumber,
    this.emergencyContact,
  });

  @MappableField(key: 'IdentityType')
  final String? identityType;
  @MappableField(key: 'IdentityNumber')
  final String? identityNumber;
  @MappableField(key: 'EmergencyContact')
  final String? emergencyContact;
}

@MappableClass(discriminatorValue: 'Guest')
class Guest extends User with GuestMappable {
  const Guest()
      : super(
          id: 0,
          email: '',
          phoneNumber: '',
          role: UserRole.guest,
          accessToken: '',
          refreshToken: '',
          firstName: '',
          lastName: '',
        );
}
