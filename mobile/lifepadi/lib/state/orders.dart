import 'dart:convert';

import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/models/receipt.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/cart_state.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/cache_for.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'orders.g.dart';

/// Retrieves a list of orders from the server.
@Riverpod(keepAlive: true)
FutureOr<List<Order>> orders(
  Ref ref, {
  int pageSize = 5,
  int pageNumber = 1,
  required String status,
}) async {
  final user = ref.read(authControllerProvider);
  final userId = user.maybeWhen(
    data: (user) => user.id,
    orElse: () => null,
  );
  if (userId == null) {
    return [];
  }

  final client = ref.read(dioProvider());
  final response = await client.get<JsonMap>(
    '/order/customer/$userId',
    queryParameters: {
      'pageNumber': pageNumber,
      'pageSize': pageSize,
      'SearchString': status,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  final data = List<JsonMap>.from(response.data!['orders'] as List);

  ref.cache();
  return data.map(OrderMapper.fromMap).toList();
}

/// Fetches a single order from the server.
@riverpod
FutureOr<Order> order(Ref ref, int id) async {
  final client = ref.read(dioProvider());
  final response = await client.get<JsonMap>('/order/get/$id');
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  ref.cache();
  return OrderMapper.fromMap(response.data!);
}

/// Store a new order.
@riverpod
FutureOr<Order> storeOrder(
  Ref ref, {
  String? instruction,
  required double totalAmount,
}) async {
  final client =
      ref.read(dioProvider(logRequestBody: true, logResponseBody: true));
  final user = ref.read(authControllerProvider);
  final userId = user.maybeWhen(
    data: (user) => user.id,
    orElse: () => null,
  );
  if (userId == null) {
    throw const UnauthorizedException('No user found');
  }

  final response = await client.post<String>(
    '/order/create',
    data: {
      'CustomerId': userId,
      'Instruction': instruction,
      'TotalAmount': totalAmount,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  return OrderMapper.fromJson(response.data!);
}

/// Store a new order item.
@riverpod
FutureOr<void> storeOrderItem(
  Ref ref, {
  required int orderId,
  required int productId,
  required int quantity,
  required double amount,
  required String productName,
  required String description,
}) async {
  final client =
      ref.read(dioProvider(logRequestBody: true, logResponseBody: true));
  final response = await client.post<String>(
    '/orderitem/create',
    data: {
      'OrderId': orderId,
      'ProductId': productId,
      'Quantity': quantity,
      'Amount': amount,
      'Name': productName,
      'Description': description,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }
}

/// Get a payment link for the order.
@riverpod
FutureOr<String> paymentLink(
  Ref ref, {
  required int orderId,
  required double totalAmount,
  required double deliveryFee,
  required double amount,
  String? voucherCode,
}) async {
  final client =
      ref.read(dioProvider(logRequestBody: true, logResponseBody: true));
  final response = await client.post<String>(
    '/transaction/MobilePaystackCheckout',
    data: {
      'OrderId': orderId,
      'Amount': amount,
      'DeliveryFee': deliveryFee,
      'TotalAmount': totalAmount,
      'VoucherCode': voucherCode ?? '',
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }
  final data = jsonDecode(response.data!) as JsonMap;

  return data['link'] as String;
}

/// Confirm payment for an order.
///
/// This is called after the payment has been made.
@riverpod
Future<Receipt> confirmPayment(
  Ref ref, {
  required Map<String, String> queryParameters,
}) async {
  final client = ref.read(dioProvider());
  final response = await client.get<JsonMap>(
    '/transaction/paystack-confirmPayment',
    queryParameters: queryParameters,
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  if (response.data?['StatusBool'] != true) {
    throw PaymentFailedException(response.data?['message'] as String);
  }

  return ReceiptMapper.fromMap(response.data!);
}

/// Create delivery
///
/// This is called after the payment has been confirmed.
@riverpod
Future<void> storeDelivery(
  Ref ref, {
  required int orderId,
  required double fee,
  required int addressId,
}) async {
  final client = ref.read(dioProvider());
  final response = await client.post<String>(
    '/delivery/create',
    data: {
      'OrderId': orderId,
      'DeliveryFee': fee,
      'AddressId': addressId,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  // Invalidate the orders provider to refresh the list
  ref.invalidate(ordersProvider);

  // Clear cart
  await ref.read(cartStateProvider.notifier).clearCart();
}

/// Get receipt by order id
@riverpod
FutureOr<Receipt> receipt(Ref ref, int orderId) async {
  final client = ref.read(dioProvider());
  final response =
      await client.get<JsonMap>('/transaction/transactionbyorderid/$orderId');
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  return ReceiptMapper.fromMap(response.data!);
}
