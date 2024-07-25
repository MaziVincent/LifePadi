import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../entities/user_role.dart';
import 'auth_controller.dart';

part 'permissions.g.dart';

/// If our user is signed out, this provider returns [UserRole.guest]
/// Otherwise, it mocks a network request and gives out some [UserRole].
@riverpod
Future<UserRole> permissions(PermissionsRef ref) async {
  final userId = await ref.watch(
    authControllerProvider.selectAsync(
      (value) => value.map(
        signedIn: (signedIn) => signedIn.id,
        signedOut: (signedOut) => null,
      ),
    ),
  );

  if (userId == null) return const UserRole.guest();

  //TODO: Get the user role from the auth model later on

  return const UserRole.user();
}
