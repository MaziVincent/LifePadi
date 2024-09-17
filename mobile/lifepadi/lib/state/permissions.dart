import 'package:lifepadi/entities/user_role.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import 'auth_controller.dart';

part 'permissions.g.dart';

/// If our user is signed out, this provider returns [UserRole.guest]
/// Otherwise, it returns the current user's [UserRole].
@riverpod
Future<UserRole> permissions(PermissionsRef ref) async {
  final role = await ref.watch(
    authControllerProvider.selectAsync(
      (value) => value.map(
        signedIn: (signedIn) => signedIn.role,
        signedOut: (signedOut) => const UserRole.guest(),
      ),
    ),
  );

  return role;
}
