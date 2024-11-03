// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, unnecessary_cast, override_on_non_overriding_member
// ignore_for_file: strict_raw_type, inference_failure_on_untyped_parameter

part of 'user_role.dart';

class UserRoleMapper extends EnumMapper<UserRole> {
  UserRoleMapper._();

  static UserRoleMapper? _instance;
  static UserRoleMapper ensureInitialized() {
    if (_instance == null) {
      MapperContainer.globals.use(_instance = UserRoleMapper._());
    }
    return _instance!;
  }

  static UserRole fromValue(dynamic value) {
    ensureInitialized();
    return MapperContainer.globals.fromValue(value);
  }

  @override
  UserRole decode(dynamic value) {
    switch (value) {
      case 'Customer':
        return UserRole.customer;
      case 'Rider':
        return UserRole.rider;
      case 'Guest':
        return UserRole.guest;
      default:
        return UserRole.values[0];
    }
  }

  @override
  dynamic encode(UserRole self) {
    switch (self) {
      case UserRole.customer:
        return 'Customer';
      case UserRole.rider:
        return 'Rider';
      case UserRole.guest:
        return 'Guest';
    }
  }
}

extension UserRoleMapperExtension on UserRole {
  dynamic toValue() {
    UserRoleMapper.ensureInitialized();
    return MapperContainer.globals.toValue<UserRole>(this);
  }
}
