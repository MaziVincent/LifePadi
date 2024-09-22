import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:lifepadi/entities/user_role.dart';
import 'package:lifepadi/utils/helpers.dart' show JsonMap;

part 'user.freezed.dart';
part 'user.g.dart';

/// Represents the current user's authentication state.
@Freezed(unionKey: 'type', unionValueCase: FreezedUnionCase.pascal)
sealed class User with _$User {
  const factory User.signedIn({
    required String accessToken,
    required String refreshToken,
    @JsonKey(name: 'Id') required int id,
    @JsonKey(name: 'Email') required String email,
    @JsonKey(name: 'FirstName') required String firstName,
    @JsonKey(name: 'LastName') required String lastName,
    @JsonKey(
      name: 'Role',
      fromJson: UserRole.fromJson,
      toJson: UserRole.toJson,
    )
    required UserRole role,
  }) = SignedIn;

  const User._();

  const factory User.signedOut() = SignedOut;

  factory User.fromJson(JsonMap json) => _$UserFromJson(json);

  bool get isAuth => switch (this) {
        SignedIn() => true,
        SignedOut() => false,
      };

  String get name => map(
        signedIn: (SignedIn user) => '${user.firstName} ${user.lastName}',
        signedOut: (_) => '',
      );
}
