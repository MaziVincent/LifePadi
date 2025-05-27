import 'dart:convert';

import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/payment_confirm.dart';
import 'package:lifepadi/models/receipt.dart';
import 'package:lifepadi/models/user.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/state/orders.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/extensions.dart';
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
  CheckoutType type = CheckoutType.topUp,
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
      'Type': type.toValue().toString(),
    },
  );

  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }
  final data = jsonDecode(response.data!) as JsonMap;

  return data['link'] as String;
}

/// Confirm a payment and determine if it was successful.
///
/// This method is called after the user has successfully \
/// made a payment for an order or for wallet deposit.
/// It checks whether the payment has been verified. \
/// If the payment is successful, it also returns the receipt.
@riverpod
FutureOr<PaymentConfirm> confirmPayment(
  Ref ref, {
  required String reference,
}) async {
  final client = ref.read(dioProvider());
  final response = await client.get<JsonMap>(
    '/transaction/paystack-confirmPayment?reference=$reference',
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  final confirmationResult = PaymentConfirmMapper.fromMap(response.data!);
  if (confirmationResult.status == true) {
    await resetStateAfterCheckout(ref, type: confirmationResult.receipt!.type);
  }

  return confirmationResult;
}

/// Retrieves a list of orders from the server.
@Riverpod(keepAlive: true)
FutureOr<List<Receipt>> transactionHistory(
  Ref ref, {
  int pageSize = 5,
  int pageNumber = 1,
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

  final response = await client.get<JsonMap>(
    '/wallet/transactions/$walletId',
    queryParameters: {
      'pageNumber': pageNumber,
      'pageSize': pageSize,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  final data = List<JsonMap>.from(response.data!['result'] as List);

  ref.cache();
  return data.map(ReceiptMapper.fromMap).toList();
}

/// Process payment using the user's wallet.
///
/// This method is called when the user chooses
/// to pay with their wallet.
@riverpod
Future<Receipt> walletPayment(
  Ref ref, {
  required CheckoutType type,
  required double amount,
  required int orderId,
  String? voucherCode,
  required double deliveryFee,
  required double totalAmount,
  bool existingOrder = false,
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

  final requestData = {
    'Amount': amount,
    'OrderId': orderId,
    'VoucherCode': voucherCode,
    'DeliveryFee': deliveryFee,
    'TotalAmount': totalAmount,
    'WalletId': walletId,
    'Type': type.toValue().toString(),
  };
  logger.d('Wallet payment request data: $requestData');
  final response = await client.post<JsonMap>(
    '/walletwithdrawal/withdraw/$walletId',
    data: requestData,
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }
  if (response.data?['StatusBool'] != true) {
    throw PaymentFailedException(
      response.data?['message'] as String? ?? 'Could not process payment',
    );
  }

  // Update the user's balance
  await ref.read(balanceProvider.future);

  // Return the receipt
  final receipt = ReceiptMapper.fromMap(response.data!);
  await resetStateAfterCheckout(
    ref,
    type: type,
    fromWallet: true,
    existingOrder: existingOrder,
  );

  return receipt;
}
