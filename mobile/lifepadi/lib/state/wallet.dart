import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'wallet.g.dart';

@riverpod
Future<double> balance(Ref ref) async {
  final client = ref.read(dioProvider());
  final user = ref.read(authControllerProvider);
  final walletId = user.maybeWhen(
    data: (user) => user is Customer ? user.wallet.id : -1,
    orElse: () => null,
  );
  if (walletId == null) {
    throw const UnauthorizedException('No user found');
  }
  if (walletId == -1) {
    throw const WalletException('This user is not a customer');
  }
  final response = await client.get<double>('/wallet/balance/$walletId');

  if (response.data == null) {
    throw const WalletException("Couldn't retrieve wallet balance");
  }

  return response.data!;
}
