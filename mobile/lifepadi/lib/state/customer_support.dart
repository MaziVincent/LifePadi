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
  final userAsync = ref.read(authControllerProvider);
  final user = userAsync.maybeWhen(
    data: (user) => user,
    orElse: () => null,
  );
  if (user == null) {
    throw const UnauthorizedException('No user found');
  }

  final response = await client.post<String>(
    '/customersupport/send',
    data: {
      'Subject': subject,
      'Message':
          'Customer support message from ${user.name} (${user.email}):<br> $message',
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }
}
