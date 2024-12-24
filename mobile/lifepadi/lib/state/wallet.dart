import 'dart:convert';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'wallet.g.dart';

/// Retrieves the balance of the user's wallet.
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
    throw const ServerErrorException('No data returned from the server');
  }
  final balance = response.data!;
  // Update the user's balance
  await ref.read(authControllerProvider.notifier).updateBalance(balance);

  return balance;
}

/// Get a payment link to fund the user's wallet.
@riverpod
FutureOr<String> walletDeposit(
  Ref ref, {
  required double amount,
}) async {
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
  final response = await client.post<String>(
    '/walletDeposite/initiate',
    data: {
      'WalletId': walletId,
      'Amount': amount,
    },
  );

  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }
  final data = jsonDecode(response.data!) as JsonMap;

  return data['link'] as String;
}

/// Confirm a deposit to the user's wallet.
///
/// This method is called after the user has successfully \
/// made a payment to fund their wallet.
@riverpod
FutureOr<bool> confirmDeposit(
  Ref ref, {
  required Map<String, String> queryParameters,
}) async {
  final client = ref.read(dioProvider());
  final response = await client.get<JsonMap>(
    '/walletdeposite/confirmDeposite',
    queryParameters: queryParameters,
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }
  if (response.data?['status'] != true) {
    throw PaymentFailedException(response.data?['message'] as String);
  }

  return true;
}
