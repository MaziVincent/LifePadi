// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, unnecessary_cast, override_on_non_overriding_member
// ignore_for_file: strict_raw_type, inference_failure_on_untyped_parameter

part of 'user.dart';

class UserMapper extends ClassMapperBase<User> {
  UserMapper._();

  static UserMapper? _instance;
  static UserMapper ensureInitialized() {
    if (_instance == null) {
      MapperContainer.globals.use(_instance = UserMapper._());
      CustomerMapper.ensureInitialized();
      RiderMapper.ensureInitialized();
      GuestMapper.ensureInitialized();
      UserRoleMapper.ensureInitialized();
    }
    return _instance!;
  }

  @override
  final String id = 'User';

  static int _$id(User v) => v.id;
  static const Field<User, int> _f$id = Field('id', _$id, key: 'Id');
  static String _$email(User v) => v.email;
  static const Field<User, String> _f$email =
      Field('email', _$email, key: 'Email');
  static String _$phoneNumber(User v) => v.phoneNumber;
  static const Field<User, String> _f$phoneNumber =
      Field('phoneNumber', _$phoneNumber, key: 'PhoneNumber');
  static UserRole _$role(User v) => v.role;
  static const Field<User, UserRole> _f$role =
      Field('role', _$role, key: 'Role');
  static String _$accessToken(User v) => v.accessToken;
  static const Field<User, String> _f$accessToken =
      Field('accessToken', _$accessToken);
  static String _$refreshToken(User v) => v.refreshToken;
  static const Field<User, String> _f$refreshToken =
      Field('refreshToken', _$refreshToken);
  static String _$firstName(User v) => v.firstName;
  static const Field<User, String> _f$firstName =
      Field('firstName', _$firstName, key: 'FirstName');
  static String _$lastName(User v) => v.lastName;
  static const Field<User, String> _f$lastName =
      Field('lastName', _$lastName, key: 'LastName');
  static String? _$address(User v) => v.address;
  static const Field<User, String> _f$address =
      Field('address', _$address, key: 'ContactAddress', opt: true);

  @override
  final MappableFields<User> fields = const {
    #id: _f$id,
    #email: _f$email,
    #phoneNumber: _f$phoneNumber,
    #role: _f$role,
    #accessToken: _f$accessToken,
    #refreshToken: _f$refreshToken,
    #firstName: _f$firstName,
    #lastName: _f$lastName,
    #address: _f$address,
  };

  static User _instantiate(DecodingData data) {
    throw MapperException.missingSubclass(
        'User', 'Role', '${data.value['Role']}');
  }

  @override
  final Function instantiate = _instantiate;

  static User fromMap(Map<String, dynamic> map) {
    return ensureInitialized().decodeMap<User>(map);
  }

  static User fromJson(String json) {
    return ensureInitialized().decodeJson<User>(json);
  }
}

mixin UserMappable {
  String toJson();
  Map<String, dynamic> toMap();
  UserCopyWith<User, User, User> get copyWith;
}

abstract class UserCopyWith<$R, $In extends User, $Out>
    implements ClassCopyWith<$R, $In, $Out> {
  $R call();
  UserCopyWith<$R2, $In, $Out2> $chain<$R2, $Out2>(Then<$Out2, $R2> t);
}

class CustomerMapper extends SubClassMapperBase<Customer> {
  CustomerMapper._();

  static CustomerMapper? _instance;
  static CustomerMapper ensureInitialized() {
    if (_instance == null) {
      MapperContainer.globals.use(_instance = CustomerMapper._());
      UserMapper.ensureInitialized().addSubMapper(_instance!);
      UserRoleMapper.ensureInitialized();
    }
    return _instance!;
  }

  @override
  final String id = 'Customer';

  static int _$id(Customer v) => v.id;
  static const Field<Customer, int> _f$id = Field('id', _$id, key: 'Id');
  static String _$email(Customer v) => v.email;
  static const Field<Customer, String> _f$email =
      Field('email', _$email, key: 'Email');
  static String _$phoneNumber(Customer v) => v.phoneNumber;
  static const Field<Customer, String> _f$phoneNumber =
      Field('phoneNumber', _$phoneNumber, key: 'PhoneNumber');
  static String _$firstName(Customer v) => v.firstName;
  static const Field<Customer, String> _f$firstName =
      Field('firstName', _$firstName, key: 'FirstName');
  static String _$lastName(Customer v) => v.lastName;
  static const Field<Customer, String> _f$lastName =
      Field('lastName', _$lastName, key: 'LastName');
  static UserRole _$role(Customer v) => v.role;
  static const Field<Customer, UserRole> _f$role =
      Field('role', _$role, key: 'Role');
  static String _$accessToken(Customer v) => v.accessToken;
  static const Field<Customer, String> _f$accessToken =
      Field('accessToken', _$accessToken);
  static String _$refreshToken(Customer v) => v.refreshToken;
  static const Field<Customer, String> _f$refreshToken =
      Field('refreshToken', _$refreshToken);
  static String? _$address(Customer v) => v.address;
  static const Field<Customer, String> _f$address =
      Field('address', _$address, key: 'ContactAddress', opt: true);
  static DateTime? _$dateOfBirth(Customer v) => v.dateOfBirth;
  static const Field<Customer, DateTime> _f$dateOfBirth =
      Field('dateOfBirth', _$dateOfBirth, key: 'DateOfBirth', opt: true);
  static String? _$gender(Customer v) => v.gender;
  static const Field<Customer, String> _f$gender =
      Field('gender', _$gender, key: 'Gender', opt: true);

  @override
  final MappableFields<Customer> fields = const {
    #id: _f$id,
    #email: _f$email,
    #phoneNumber: _f$phoneNumber,
    #firstName: _f$firstName,
    #lastName: _f$lastName,
    #role: _f$role,
    #accessToken: _f$accessToken,
    #refreshToken: _f$refreshToken,
    #address: _f$address,
    #dateOfBirth: _f$dateOfBirth,
    #gender: _f$gender,
  };

  @override
  final String discriminatorKey = 'Role';
  @override
  final dynamic discriminatorValue = 'Customer';
  @override
  late final ClassMapperBase superMapper = UserMapper.ensureInitialized();

  static Customer _instantiate(DecodingData data) {
    return Customer(
        id: data.dec(_f$id),
        email: data.dec(_f$email),
        phoneNumber: data.dec(_f$phoneNumber),
        firstName: data.dec(_f$firstName),
        lastName: data.dec(_f$lastName),
        role: data.dec(_f$role),
        accessToken: data.dec(_f$accessToken),
        refreshToken: data.dec(_f$refreshToken),
        address: data.dec(_f$address),
        dateOfBirth: data.dec(_f$dateOfBirth),
        gender: data.dec(_f$gender));
  }

  @override
  final Function instantiate = _instantiate;

  static Customer fromMap(Map<String, dynamic> map) {
    return ensureInitialized().decodeMap<Customer>(map);
  }

  static Customer fromJson(String json) {
    return ensureInitialized().decodeJson<Customer>(json);
  }
}

mixin CustomerMappable {
  String toJson() {
    return CustomerMapper.ensureInitialized()
        .encodeJson<Customer>(this as Customer);
  }

  Map<String, dynamic> toMap() {
    return CustomerMapper.ensureInitialized()
        .encodeMap<Customer>(this as Customer);
  }

  CustomerCopyWith<Customer, Customer, Customer> get copyWith =>
      _CustomerCopyWithImpl(this as Customer, $identity, $identity);
  @override
  String toString() {
    return CustomerMapper.ensureInitialized().stringifyValue(this as Customer);
  }

  @override
  bool operator ==(Object other) {
    return CustomerMapper.ensureInitialized()
        .equalsValue(this as Customer, other);
  }

  @override
  int get hashCode {
    return CustomerMapper.ensureInitialized().hashValue(this as Customer);
  }
}

extension CustomerValueCopy<$R, $Out> on ObjectCopyWith<$R, Customer, $Out> {
  CustomerCopyWith<$R, Customer, $Out> get $asCustomer =>
      $base.as((v, t, t2) => _CustomerCopyWithImpl(v, t, t2));
}

abstract class CustomerCopyWith<$R, $In extends Customer, $Out>
    implements UserCopyWith<$R, $In, $Out> {
  @override
  $R call(
      {int? id,
      String? email,
      String? phoneNumber,
      String? firstName,
      String? lastName,
      UserRole? role,
      String? accessToken,
      String? refreshToken,
      String? address,
      DateTime? dateOfBirth,
      String? gender});
  CustomerCopyWith<$R2, $In, $Out2> $chain<$R2, $Out2>(Then<$Out2, $R2> t);
}

class _CustomerCopyWithImpl<$R, $Out>
    extends ClassCopyWithBase<$R, Customer, $Out>
    implements CustomerCopyWith<$R, Customer, $Out> {
  _CustomerCopyWithImpl(super.value, super.then, super.then2);

  @override
  late final ClassMapperBase<Customer> $mapper =
      CustomerMapper.ensureInitialized();
  @override
  $R call(
          {int? id,
          String? email,
          String? phoneNumber,
          String? firstName,
          String? lastName,
          UserRole? role,
          String? accessToken,
          String? refreshToken,
          Object? address = $none,
          Object? dateOfBirth = $none,
          Object? gender = $none}) =>
      $apply(FieldCopyWithData({
        if (id != null) #id: id,
        if (email != null) #email: email,
        if (phoneNumber != null) #phoneNumber: phoneNumber,
        if (firstName != null) #firstName: firstName,
        if (lastName != null) #lastName: lastName,
        if (role != null) #role: role,
        if (accessToken != null) #accessToken: accessToken,
        if (refreshToken != null) #refreshToken: refreshToken,
        if (address != $none) #address: address,
        if (dateOfBirth != $none) #dateOfBirth: dateOfBirth,
        if (gender != $none) #gender: gender
      }));
  @override
  Customer $make(CopyWithData data) => Customer(
      id: data.get(#id, or: $value.id),
      email: data.get(#email, or: $value.email),
      phoneNumber: data.get(#phoneNumber, or: $value.phoneNumber),
      firstName: data.get(#firstName, or: $value.firstName),
      lastName: data.get(#lastName, or: $value.lastName),
      role: data.get(#role, or: $value.role),
      accessToken: data.get(#accessToken, or: $value.accessToken),
      refreshToken: data.get(#refreshToken, or: $value.refreshToken),
      address: data.get(#address, or: $value.address),
      dateOfBirth: data.get(#dateOfBirth, or: $value.dateOfBirth),
      gender: data.get(#gender, or: $value.gender));

  @override
  CustomerCopyWith<$R2, Customer, $Out2> $chain<$R2, $Out2>(
          Then<$Out2, $R2> t) =>
      _CustomerCopyWithImpl($value, $cast, t);
}

class RiderMapper extends SubClassMapperBase<Rider> {
  RiderMapper._();

  static RiderMapper? _instance;
  static RiderMapper ensureInitialized() {
    if (_instance == null) {
      MapperContainer.globals.use(_instance = RiderMapper._());
      UserMapper.ensureInitialized().addSubMapper(_instance!);
      UserRoleMapper.ensureInitialized();
    }
    return _instance!;
  }

  @override
  final String id = 'Rider';

  static int _$id(Rider v) => v.id;
  static const Field<Rider, int> _f$id = Field('id', _$id, key: 'Id');
  static String _$email(Rider v) => v.email;
  static const Field<Rider, String> _f$email =
      Field('email', _$email, key: 'Email');
  static String _$phoneNumber(Rider v) => v.phoneNumber;
  static const Field<Rider, String> _f$phoneNumber =
      Field('phoneNumber', _$phoneNumber, key: 'PhoneNumber');
  static String _$firstName(Rider v) => v.firstName;
  static const Field<Rider, String> _f$firstName =
      Field('firstName', _$firstName, key: 'FirstName');
  static String _$lastName(Rider v) => v.lastName;
  static const Field<Rider, String> _f$lastName =
      Field('lastName', _$lastName, key: 'LastName');
  static String? _$address(Rider v) => v.address;
  static const Field<Rider, String> _f$address =
      Field('address', _$address, key: 'ContactAddress', opt: true);
  static UserRole _$role(Rider v) => v.role;
  static const Field<Rider, UserRole> _f$role =
      Field('role', _$role, key: 'Role');
  static String _$accessToken(Rider v) => v.accessToken;
  static const Field<Rider, String> _f$accessToken =
      Field('accessToken', _$accessToken);
  static String _$refreshToken(Rider v) => v.refreshToken;
  static const Field<Rider, String> _f$refreshToken =
      Field('refreshToken', _$refreshToken);
  static String? _$identityType(Rider v) => v.identityType;
  static const Field<Rider, String> _f$identityType =
      Field('identityType', _$identityType, key: 'IdentityType');
  static String? _$identityNumber(Rider v) => v.identityNumber;
  static const Field<Rider, String> _f$identityNumber =
      Field('identityNumber', _$identityNumber, key: 'IdentityNumber');
  static String? _$emergencyContact(Rider v) => v.emergencyContact;
  static const Field<Rider, String> _f$emergencyContact = Field(
      'emergencyContact', _$emergencyContact,
      key: 'EmergencyContact', opt: true);

  @override
  final MappableFields<Rider> fields = const {
    #id: _f$id,
    #email: _f$email,
    #phoneNumber: _f$phoneNumber,
    #firstName: _f$firstName,
    #lastName: _f$lastName,
    #address: _f$address,
    #role: _f$role,
    #accessToken: _f$accessToken,
    #refreshToken: _f$refreshToken,
    #identityType: _f$identityType,
    #identityNumber: _f$identityNumber,
    #emergencyContact: _f$emergencyContact,
  };

  @override
  final String discriminatorKey = 'Role';
  @override
  final dynamic discriminatorValue = 'Rider';
  @override
  late final ClassMapperBase superMapper = UserMapper.ensureInitialized();

  static Rider _instantiate(DecodingData data) {
    return Rider(
        id: data.dec(_f$id),
        email: data.dec(_f$email),
        phoneNumber: data.dec(_f$phoneNumber),
        firstName: data.dec(_f$firstName),
        lastName: data.dec(_f$lastName),
        address: data.dec(_f$address),
        role: data.dec(_f$role),
        accessToken: data.dec(_f$accessToken),
        refreshToken: data.dec(_f$refreshToken),
        identityType: data.dec(_f$identityType),
        identityNumber: data.dec(_f$identityNumber),
        emergencyContact: data.dec(_f$emergencyContact));
  }

  @override
  final Function instantiate = _instantiate;

  static Rider fromMap(Map<String, dynamic> map) {
    return ensureInitialized().decodeMap<Rider>(map);
  }

  static Rider fromJson(String json) {
    return ensureInitialized().decodeJson<Rider>(json);
  }
}

mixin RiderMappable {
  String toJson() {
    return RiderMapper.ensureInitialized().encodeJson<Rider>(this as Rider);
  }

  Map<String, dynamic> toMap() {
    return RiderMapper.ensureInitialized().encodeMap<Rider>(this as Rider);
  }

  RiderCopyWith<Rider, Rider, Rider> get copyWith =>
      _RiderCopyWithImpl(this as Rider, $identity, $identity);
  @override
  String toString() {
    return RiderMapper.ensureInitialized().stringifyValue(this as Rider);
  }

  @override
  bool operator ==(Object other) {
    return RiderMapper.ensureInitialized().equalsValue(this as Rider, other);
  }

  @override
  int get hashCode {
    return RiderMapper.ensureInitialized().hashValue(this as Rider);
  }
}

extension RiderValueCopy<$R, $Out> on ObjectCopyWith<$R, Rider, $Out> {
  RiderCopyWith<$R, Rider, $Out> get $asRider =>
      $base.as((v, t, t2) => _RiderCopyWithImpl(v, t, t2));
}

abstract class RiderCopyWith<$R, $In extends Rider, $Out>
    implements UserCopyWith<$R, $In, $Out> {
  @override
  $R call(
      {int? id,
      String? email,
      String? phoneNumber,
      String? firstName,
      String? lastName,
      String? address,
      UserRole? role,
      String? accessToken,
      String? refreshToken,
      String? identityType,
      String? identityNumber,
      String? emergencyContact});
  RiderCopyWith<$R2, $In, $Out2> $chain<$R2, $Out2>(Then<$Out2, $R2> t);
}

class _RiderCopyWithImpl<$R, $Out> extends ClassCopyWithBase<$R, Rider, $Out>
    implements RiderCopyWith<$R, Rider, $Out> {
  _RiderCopyWithImpl(super.value, super.then, super.then2);

  @override
  late final ClassMapperBase<Rider> $mapper = RiderMapper.ensureInitialized();
  @override
  $R call(
          {int? id,
          String? email,
          String? phoneNumber,
          String? firstName,
          String? lastName,
          Object? address = $none,
          UserRole? role,
          String? accessToken,
          String? refreshToken,
          Object? identityType = $none,
          Object? identityNumber = $none,
          Object? emergencyContact = $none}) =>
      $apply(FieldCopyWithData({
        if (id != null) #id: id,
        if (email != null) #email: email,
        if (phoneNumber != null) #phoneNumber: phoneNumber,
        if (firstName != null) #firstName: firstName,
        if (lastName != null) #lastName: lastName,
        if (address != $none) #address: address,
        if (role != null) #role: role,
        if (accessToken != null) #accessToken: accessToken,
        if (refreshToken != null) #refreshToken: refreshToken,
        if (identityType != $none) #identityType: identityType,
        if (identityNumber != $none) #identityNumber: identityNumber,
        if (emergencyContact != $none) #emergencyContact: emergencyContact
      }));
  @override
  Rider $make(CopyWithData data) => Rider(
      id: data.get(#id, or: $value.id),
      email: data.get(#email, or: $value.email),
      phoneNumber: data.get(#phoneNumber, or: $value.phoneNumber),
      firstName: data.get(#firstName, or: $value.firstName),
      lastName: data.get(#lastName, or: $value.lastName),
      address: data.get(#address, or: $value.address),
      role: data.get(#role, or: $value.role),
      accessToken: data.get(#accessToken, or: $value.accessToken),
      refreshToken: data.get(#refreshToken, or: $value.refreshToken),
      identityType: data.get(#identityType, or: $value.identityType),
      identityNumber: data.get(#identityNumber, or: $value.identityNumber),
      emergencyContact:
          data.get(#emergencyContact, or: $value.emergencyContact));

  @override
  RiderCopyWith<$R2, Rider, $Out2> $chain<$R2, $Out2>(Then<$Out2, $R2> t) =>
      _RiderCopyWithImpl($value, $cast, t);
}

class GuestMapper extends SubClassMapperBase<Guest> {
  GuestMapper._();

  static GuestMapper? _instance;
  static GuestMapper ensureInitialized() {
    if (_instance == null) {
      MapperContainer.globals.use(_instance = GuestMapper._());
      UserMapper.ensureInitialized().addSubMapper(_instance!);
    }
    return _instance!;
  }

  @override
  final String id = 'Guest';

  static String _$accessToken(Guest v) => v.accessToken;
  static const Field<Guest, String> _f$accessToken =
      Field('accessToken', _$accessToken);
  static String _$refreshToken(Guest v) => v.refreshToken;
  static const Field<Guest, String> _f$refreshToken =
      Field('refreshToken', _$refreshToken);
  static int _$id(Guest v) => v.id;
  static const Field<Guest, int> _f$id = Field('id', _$id, key: 'Id');
  static String _$email(Guest v) => v.email;
  static const Field<Guest, String> _f$email =
      Field('email', _$email, key: 'Email');
  static String _$phoneNumber(Guest v) => v.phoneNumber;
  static const Field<Guest, String> _f$phoneNumber =
      Field('phoneNumber', _$phoneNumber, key: 'PhoneNumber');
  static UserRole _$role(Guest v) => v.role;
  static const Field<Guest, UserRole> _f$role =
      Field('role', _$role, key: 'Role');
  static String _$firstName(Guest v) => v.firstName;
  static const Field<Guest, String> _f$firstName =
      Field('firstName', _$firstName, key: 'FirstName');
  static String _$lastName(Guest v) => v.lastName;
  static const Field<Guest, String> _f$lastName =
      Field('lastName', _$lastName, key: 'LastName');
  static String? _$address(Guest v) => v.address;
  static const Field<Guest, String> _f$address =
      Field('address', _$address, key: 'ContactAddress');

  @override
  final MappableFields<Guest> fields = const {
    #accessToken: _f$accessToken,
    #refreshToken: _f$refreshToken,
    #id: _f$id,
    #email: _f$email,
    #phoneNumber: _f$phoneNumber,
    #role: _f$role,
    #firstName: _f$firstName,
    #lastName: _f$lastName,
    #address: _f$address,
  };

  @override
  final String discriminatorKey = 'Role';
  @override
  final dynamic discriminatorValue = 'Guest';
  @override
  late final ClassMapperBase superMapper = UserMapper.ensureInitialized();

  static Guest _instantiate(DecodingData data) {
    return Guest();
  }

  @override
  final Function instantiate = _instantiate;

  static Guest fromMap(Map<String, dynamic> map) {
    return ensureInitialized().decodeMap<Guest>(map);
  }

  static Guest fromJson(String json) {
    return ensureInitialized().decodeJson<Guest>(json);
  }
}

mixin GuestMappable {
  String toJson() {
    return GuestMapper.ensureInitialized().encodeJson<Guest>(this as Guest);
  }

  Map<String, dynamic> toMap() {
    return GuestMapper.ensureInitialized().encodeMap<Guest>(this as Guest);
  }

  GuestCopyWith<Guest, Guest, Guest> get copyWith =>
      _GuestCopyWithImpl(this as Guest, $identity, $identity);
  @override
  String toString() {
    return GuestMapper.ensureInitialized().stringifyValue(this as Guest);
  }

  @override
  bool operator ==(Object other) {
    return GuestMapper.ensureInitialized().equalsValue(this as Guest, other);
  }

  @override
  int get hashCode {
    return GuestMapper.ensureInitialized().hashValue(this as Guest);
  }
}

extension GuestValueCopy<$R, $Out> on ObjectCopyWith<$R, Guest, $Out> {
  GuestCopyWith<$R, Guest, $Out> get $asGuest =>
      $base.as((v, t, t2) => _GuestCopyWithImpl(v, t, t2));
}

abstract class GuestCopyWith<$R, $In extends Guest, $Out>
    implements UserCopyWith<$R, $In, $Out> {
  @override
  $R call();
  GuestCopyWith<$R2, $In, $Out2> $chain<$R2, $Out2>(Then<$Out2, $R2> t);
}

class _GuestCopyWithImpl<$R, $Out> extends ClassCopyWithBase<$R, Guest, $Out>
    implements GuestCopyWith<$R, Guest, $Out> {
  _GuestCopyWithImpl(super.value, super.then, super.then2);

  @override
  late final ClassMapperBase<Guest> $mapper = GuestMapper.ensureInitialized();
  @override
  $R call() => $apply(FieldCopyWithData({}));
  @override
  Guest $make(CopyWithData data) => Guest();

  @override
  GuestCopyWith<$R2, Guest, $Out2> $chain<$R2, $Out2>(Then<$Out2, $R2> t) =>
      _GuestCopyWithImpl($value, $cast, t);
}
