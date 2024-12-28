import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'customer_support.g.dart';

/// Store a new customer support ticket.
@riverpod
FutureOr<void> customerSupport(
  Ref ref, {
  required String subject,
  required String message,
}) async {
  final client = ref.read(dioProvider());
  final user = ref.read(authControllerProvider);
  final userId = user.maybeWhen(
    data: (user) => user.id,
    orElse: () => null,
  );
  if (userId == null) {
    throw const UnauthorizedException('No user found');
  }

  final response = await client.post<String>(
    '/customersupport/create',
    data: {
      'CustomerId': userId,
      'Subject': subject,
      'Message': message,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }
}
