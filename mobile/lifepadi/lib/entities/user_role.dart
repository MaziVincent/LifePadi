import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_role.freezed.dart';

/// It is used to distinguish the logged in user permissions.
@freezed
class UserRole with _$UserRole {
  const factory UserRole.customer() = Customer;
  const factory UserRole.rider() = Rider;
  const factory UserRole.vendor() = Vendor;
  const factory UserRole.guest() = Guest;

  const UserRole._();

  factory UserRole.fromJson(String role) {
    return switch (role.toLowerCase()) {
      'rider' => const Rider(),
      'vendor' => const Vendor(),
      _ => const Customer(),
    };
  }

  static String toJson(UserRole role) {
    return switch (role) {
      const Rider() => 'Rider',
      const Vendor() => 'Vendor',
      _ => 'Customer',
    };
  }
}
