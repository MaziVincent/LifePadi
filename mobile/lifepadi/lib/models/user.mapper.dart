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
      VendorMapper.ensureInitialized();
      GuestMapper.ensureInitialized();
      UserRoleMapper.ensureInitialized();
    }
    return _instance!;
  }

  @override
  final String id = 'User';

  static String _$email(User v) => v.email;
  static const Field<User, String> _f$email =
      Field('email', _$email, key: 'Email');
  static String _$phoneNumber(User v) => v.phoneNumber;
  static const Field<User, String> _f$phoneNumber =
      Field('phoneNumber', _$phoneNumber, key: 'PhoneNumber');
  static int _$id(User v) => v.id;
  static const Field<User, int> _f$id = Field('id', _$id, key: 'Id');
  static UserRole _$role(User v) => v.role;
  static const Field<User, UserRole> _f$role =
      Field('role', _$role, key: 'Role');
  static String _$accessToken(User v) => v.accessToken;
  static const Field<User, String> _f$accessToken =
      Field('accessToken', _$accessToken);
  static String _$refreshToken(User v) => v.refreshToken;
  static const Field<User, String> _f$refreshToken =
      Field('refreshToken', _$refreshToken);

  @override
  final MappableFields<User> fields = const {
    #email: _f$email,
    #phoneNumber: _f$phoneNumber,
    #id: _f$id,
    #role: _f$role,
    #accessToken: _f$accessToken,
    #refreshToken: _f$refreshToken,
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
        address: data.dec(_f$address));
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
      String? address});
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
          Object? address = $none}) =>
      $apply(FieldCopyWithData({
        if (id != null) #id: id,
        if (email != null) #email: email,
        if (phoneNumber != null) #phoneNumber: phoneNumber,
        if (firstName != null) #firstName: firstName,
        if (lastName != null) #lastName: lastName,
        if (role != null) #role: role,
        if (accessToken != null) #accessToken: accessToken,
        if (refreshToken != null) #refreshToken: refreshToken,
        if (address != $none) #address: address
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
      address: data.get(#address, or: $value.address));

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

  @override
  final MappableFields<Rider> fields = const {
    #id: _f$id,
    #email: _f$email,
    #phoneNumber: _f$phoneNumber,
    #firstName: _f$firstName,
    #lastName: _f$lastName,
    #identityType: _f$identityType,
    #identityNumber: _f$identityNumber,
    #emergencyContact: _f$emergencyContact,
    #address: _f$address,
    #role: _f$role,
    #accessToken: _f$accessToken,
    #refreshToken: _f$refreshToken,
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
        identityType: data.dec(_f$identityType),
        identityNumber: data.dec(_f$identityNumber),
        emergencyContact: data.dec(_f$emergencyContact),
        address: data.dec(_f$address),
        role: data.dec(_f$role),
        accessToken: data.dec(_f$accessToken),
        refreshToken: data.dec(_f$refreshToken));
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
      String? identityType,
      String? identityNumber,
      String? emergencyContact,
      String? address,
      UserRole? role,
      String? accessToken,
      String? refreshToken});
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
          Object? identityType = $none,
          Object? identityNumber = $none,
          Object? emergencyContact = $none,
          Object? address = $none,
          UserRole? role,
          String? accessToken,
          String? refreshToken}) =>
      $apply(FieldCopyWithData({
        if (id != null) #id: id,
        if (email != null) #email: email,
        if (phoneNumber != null) #phoneNumber: phoneNumber,
        if (firstName != null) #firstName: firstName,
        if (lastName != null) #lastName: lastName,
        if (identityType != $none) #identityType: identityType,
        if (identityNumber != $none) #identityNumber: identityNumber,
        if (emergencyContact != $none) #emergencyContact: emergencyContact,
        if (address != $none) #address: address,
        if (role != null) #role: role,
        if (accessToken != null) #accessToken: accessToken,
        if (refreshToken != null) #refreshToken: refreshToken
      }));
  @override
  Rider $make(CopyWithData data) => Rider(
      id: data.get(#id, or: $value.id),
      email: data.get(#email, or: $value.email),
      phoneNumber: data.get(#phoneNumber, or: $value.phoneNumber),
      firstName: data.get(#firstName, or: $value.firstName),
      lastName: data.get(#lastName, or: $value.lastName),
      identityType: data.get(#identityType, or: $value.identityType),
      identityNumber: data.get(#identityNumber, or: $value.identityNumber),
      emergencyContact:
          data.get(#emergencyContact, or: $value.emergencyContact),
      address: data.get(#address, or: $value.address),
      role: data.get(#role, or: $value.role),
      accessToken: data.get(#accessToken, or: $value.accessToken),
      refreshToken: data.get(#refreshToken, or: $value.refreshToken));

  @override
  RiderCopyWith<$R2, Rider, $Out2> $chain<$R2, $Out2>(Then<$Out2, $R2> t) =>
      _RiderCopyWithImpl($value, $cast, t);
}

class VendorMapper extends SubClassMapperBase<Vendor> {
  VendorMapper._();

  static VendorMapper? _instance;
  static VendorMapper ensureInitialized() {
    if (_instance == null) {
      MapperContainer.globals.use(_instance = VendorMapper._());
      UserMapper.ensureInitialized().addSubMapper(_instance!);
      UserRoleMapper.ensureInitialized();
    }
    return _instance!;
  }

  @override
  final String id = 'Vendor';

  static int _$id(Vendor v) => v.id;
  static const Field<Vendor, int> _f$id = Field('id', _$id, key: 'Id');
  static String _$email(Vendor v) => v.email;
  static const Field<Vendor, String> _f$email =
      Field('email', _$email, key: 'Email');
  static String _$phoneNumber(Vendor v) => v.phoneNumber;
  static const Field<Vendor, String> _f$phoneNumber =
      Field('phoneNumber', _$phoneNumber, key: 'PhoneNumber');
  static String _$name(Vendor v) => v.name;
  static const Field<Vendor, String> _f$name =
      Field('name', _$name, key: 'Name');
  static String _$vendorType(Vendor v) => v.vendorType;
  static const Field<Vendor, String> _f$vendorType =
      Field('vendorType', _$vendorType, key: 'VendorType');
  static String _$address(Vendor v) => v.address;
  static const Field<Vendor, String> _f$address =
      Field('address', _$address, key: 'ContactAddress');
  static int? _$serviceId(Vendor v) => v.serviceId;
  static const Field<Vendor, int> _f$serviceId =
      Field('serviceId', _$serviceId, key: 'ServiceId', opt: true);
  static UserRole _$role(Vendor v) => v.role;
  static const Field<Vendor, UserRole> _f$role =
      Field('role', _$role, key: 'Role');
  static String _$accessToken(Vendor v) => v.accessToken;
  static const Field<Vendor, String> _f$accessToken =
      Field('accessToken', _$accessToken);
  static String _$refreshToken(Vendor v) => v.refreshToken;
  static const Field<Vendor, String> _f$refreshToken =
      Field('refreshToken', _$refreshToken);

  @override
  final MappableFields<Vendor> fields = const {
    #id: _f$id,
    #email: _f$email,
    #phoneNumber: _f$phoneNumber,
    #name: _f$name,
    #vendorType: _f$vendorType,
    #address: _f$address,
    #serviceId: _f$serviceId,
    #role: _f$role,
    #accessToken: _f$accessToken,
    #refreshToken: _f$refreshToken,
  };

  @override
  final String discriminatorKey = 'Role';
  @override
  final dynamic discriminatorValue = 'Vendor';
  @override
  late final ClassMapperBase superMapper = UserMapper.ensureInitialized();

  static Vendor _instantiate(DecodingData data) {
    return Vendor(
        id: data.dec(_f$id),
        email: data.dec(_f$email),
        phoneNumber: data.dec(_f$phoneNumber),
        name: data.dec(_f$name),
        vendorType: data.dec(_f$vendorType),
        address: data.dec(_f$address),
        serviceId: data.dec(_f$serviceId),
        role: data.dec(_f$role),
        accessToken: data.dec(_f$accessToken),
        refreshToken: data.dec(_f$refreshToken));
  }

  @override
  final Function instantiate = _instantiate;

  static Vendor fromMap(Map<String, dynamic> map) {
    return ensureInitialized().decodeMap<Vendor>(map);
  }

  static Vendor fromJson(String json) {
    return ensureInitialized().decodeJson<Vendor>(json);
  }
}

mixin VendorMappable {
  String toJson() {
    return VendorMapper.ensureInitialized().encodeJson<Vendor>(this as Vendor);
  }

  Map<String, dynamic> toMap() {
    return VendorMapper.ensureInitialized().encodeMap<Vendor>(this as Vendor);
  }

  VendorCopyWith<Vendor, Vendor, Vendor> get copyWith =>
      _VendorCopyWithImpl(this as Vendor, $identity, $identity);
  @override
  String toString() {
    return VendorMapper.ensureInitialized().stringifyValue(this as Vendor);
  }

  @override
  bool operator ==(Object other) {
    return VendorMapper.ensureInitialized().equalsValue(this as Vendor, other);
  }

  @override
  int get hashCode {
    return VendorMapper.ensureInitialized().hashValue(this as Vendor);
  }
}

extension VendorValueCopy<$R, $Out> on ObjectCopyWith<$R, Vendor, $Out> {
  VendorCopyWith<$R, Vendor, $Out> get $asVendor =>
      $base.as((v, t, t2) => _VendorCopyWithImpl(v, t, t2));
}

abstract class VendorCopyWith<$R, $In extends Vendor, $Out>
    implements UserCopyWith<$R, $In, $Out> {
  @override
  $R call(
      {int? id,
      String? email,
      String? phoneNumber,
      String? name,
      String? vendorType,
      String? address,
      int? serviceId,
      UserRole? role,
      String? accessToken,
      String? refreshToken});
  VendorCopyWith<$R2, $In, $Out2> $chain<$R2, $Out2>(Then<$Out2, $R2> t);
}

class _VendorCopyWithImpl<$R, $Out> extends ClassCopyWithBase<$R, Vendor, $Out>
    implements VendorCopyWith<$R, Vendor, $Out> {
  _VendorCopyWithImpl(super.value, super.then, super.then2);

  @override
  late final ClassMapperBase<Vendor> $mapper = VendorMapper.ensureInitialized();
  @override
  $R call(
          {int? id,
          String? email,
          String? phoneNumber,
          String? name,
          String? vendorType,
          String? address,
          Object? serviceId = $none,
          UserRole? role,
          String? accessToken,
          String? refreshToken}) =>
      $apply(FieldCopyWithData({
        if (id != null) #id: id,
        if (email != null) #email: email,
        if (phoneNumber != null) #phoneNumber: phoneNumber,
        if (name != null) #name: name,
        if (vendorType != null) #vendorType: vendorType,
        if (address != null) #address: address,
        if (serviceId != $none) #serviceId: serviceId,
        if (role != null) #role: role,
        if (accessToken != null) #accessToken: accessToken,
        if (refreshToken != null) #refreshToken: refreshToken
      }));
  @override
  Vendor $make(CopyWithData data) => Vendor(
      id: data.get(#id, or: $value.id),
      email: data.get(#email, or: $value.email),
      phoneNumber: data.get(#phoneNumber, or: $value.phoneNumber),
      name: data.get(#name, or: $value.name),
      vendorType: data.get(#vendorType, or: $value.vendorType),
      address: data.get(#address, or: $value.address),
      serviceId: data.get(#serviceId, or: $value.serviceId),
      role: data.get(#role, or: $value.role),
      accessToken: data.get(#accessToken, or: $value.accessToken),
      refreshToken: data.get(#refreshToken, or: $value.refreshToken));

  @override
  VendorCopyWith<$R2, Vendor, $Out2> $chain<$R2, $Out2>(Then<$Out2, $R2> t) =>
      _VendorCopyWithImpl($value, $cast, t);
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

  @override
  final MappableFields<Guest> fields = const {
    #accessToken: _f$accessToken,
    #refreshToken: _f$refreshToken,
    #id: _f$id,
    #email: _f$email,
    #phoneNumber: _f$phoneNumber,
    #role: _f$role,
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
