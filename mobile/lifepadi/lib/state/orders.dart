import 'dart:convert';

import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/checkout_type.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/models/receipt.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/cart_state.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/state/logistics.dart';
import 'package:lifepadi/state/wallet.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/extensions.dart';
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

  var data = List<JsonMap>.from(response.data!['orders'] as List);

  // strip auth on rider if it contains a rider key
  data = data.map((order) {
    if (order.containsKey('Rider') && order['Rider'] != null) {
      stripAuth(order['Rider'] as JsonMap, addWallet: false);
    }
    // strip auth on customer
    if (order.containsKey('Customer') && order['Customer'] != null) {
      stripAuth(order['Customer'] as JsonMap);
    }
    return order;
  }).toList();

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

  // strip auth on rider
  if (response.data!.containsKey('Rider') && response.data!['Rider'] != null) {
    stripAuth(response.data!['Rider'] as JsonMap, addWallet: false);
  }
  // strip auth on customer
  if (response.data!.containsKey('Customer') &&
      response.data!['Customer'] != null) {
    stripAuth(response.data!['Customer'] as JsonMap);
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
  required CheckoutType type,
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
    '/order/create',
    data: {
      'CustomerId': userId,
      'Instruction': instruction,
      'TotalAmount': totalAmount,
      'Type': type,
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
  final client = ref.read(dioProvider());
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
  required CheckoutType type,
}) async {
  final client = ref.read(dioProvider());
  final requestData = {
    'OrderId': orderId,
    'Amount': amount,
    'DeliveryFee': deliveryFee,
    'TotalAmount': totalAmount,
    'VoucherCode': voucherCode ?? '',
    'Type': type.toValue().toString(),
  };
  final response = await client.post<String>(
    '/transaction/MobilePaystackCheckout',
    data: requestData,
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
  required CheckoutType type,
  bool existingOrder = false,
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

  final receipt = ReceiptMapper.fromMap(response.data!);
  await resetStateAfterCheckout(ref, type: type, existingOrder: existingOrder);

  return receipt;
}

/// Create delivery
///
/// This is called after the payment has been confirmed.
@riverpod
Future<void> storeDelivery(
  Ref ref, {
  required int orderId,
  required double fee,
  int? deliveryAddressId,
  required CheckoutType type,
  int? pickupAddressId,
}) async {
  final client = ref.read(dioProvider());
  final response = await client.post<String>(
    '/delivery/create',
    data: {
      'OrderId': orderId,
      'DeliveryFee': fee,
      'DeliveryAddressId': deliveryAddressId,
      'PickupAddressId': pickupAddressId,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }
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

/// Get rider's orders
@Riverpod(keepAlive: true)
FutureOr<List<Order>> riderOrders(
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
    '/rider/$userId/getorders',
    queryParameters: {
      'pageNumber': pageNumber,
      'pageSize': pageSize,
      'SearchString': status,
    },
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  final data = List<JsonMap>.from(response.data!['result'] as List);

  ref.cache();
  return data.map(OrderMapper.fromMap).toList();
}

/// Reset the state data after a successful checkout
/// has been completed.
Future<void> resetStateAfterCheckout(
  Ref<Object?> ref, {
  required CheckoutType type,
  bool fromWallet = false,
  bool existingOrder = false,
}) async {
  if (fromWallet) {
    // Invalidate the balance provider to refresh the wallet balance
    ref.invalidate(balanceProvider);
    return;
  }

  // Invalidate the orders provider to refresh the list
  ref.invalidate(ordersProvider);

  if (!existingOrder) {
    if (type == CheckoutType.cart) {
      // Clear the cart
      await ref
          .read(cartStateProvider.notifier)
          .clearCart(keepDeliveryLocation: true);
    }

    if (type == CheckoutType.logistics) {
      // Set the logistics as paid
      await ref.read(logisticsStateProvider.notifier).setAsPaid();
    }
  }
}

/// Update the status of an order to delivered.
///
/// This is called by the rider after the order has been delivered.
/// Or by the customer to cancel a pending order.
@riverpod
Future<void> updateOrderStatus(
  Ref ref,
  int orderId, {
  required OrderStatus status,
}) async {
  final client = ref.read(dioProvider());

  await client.put<String>(
    '/order/updatestatus/$orderId',
    queryParameters: {'status': status.toValue().toString()},
  );

  ref.invalidate(ordersProvider);
}
