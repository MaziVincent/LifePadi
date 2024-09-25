import 'package:lifepadi/entities/user_role.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import 'auth_controller.dart';

part 'permissions.g.dart';

/// This provider returns the current user's role.
@riverpod
Future<UserRole> permissions(PermissionsRef ref) async {
  final user = await ref.read(authControllerProvider.future);

  return user.role;
}
