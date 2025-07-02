import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/models/logistics.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/location_utils.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'logistics.g.dart';

@Riverpod(keepAlive: true)
class LogisticsState extends _$LogisticsState with LocationUtils {
  @override
  Future<Logistics?> build() async {
    return _getLogistics();
  }

  /// Get the current logistics state from shared preferences
  Future<Logistics?> _getLogistics() async {
    final logisticsJson = PreferencesHelper.getString(kLogisticsKey);
    if (logisticsJson == null) return null;
    return LogisticsMapper.fromJson(logisticsJson);
  }

  /// Calculate delivery fee between two points
  /// Note: This will be replaced with backend calculation in the future
  double calculateDeliveryFee(LocationDetails pickup, LocationDetails dropoff) {
    final distance = calculateDistance(pickup.latLng, dropoff.latLng);
    // Temporary fixed rate - will be replaced with backend call
    return distance * 300.0;
  }

  /// Clear logistics data
  Future<void> clearLogistics() async {
    await PreferencesHelper.remove(kLogisticsKey);
    state = const AsyncData(null);
  }

  /// Create new logistics data
  Future<void> saveLogistics({
    required String senderName,
    required String senderPhone,
    required LocationDetails pickupLocation,
    required String receiverName,
    required String receiverPhone,
    required LocationDetails dropoffLocation,
    required String item,
    String? description,
    double? weight,
    required bool fragile,
  }) async {
    // Calculate delivery fee based on pickup and dropoff locations
    final deliveryFee = calculateDeliveryFee(pickupLocation, dropoffLocation);

    // Create logistics object
    final logistics = Logistics(
      id: DateTime.now().millisecondsSinceEpoch,
      senderName: senderName,
      senderPhone: senderPhone,
      pickupLocation: pickupLocation,
      receiverName: receiverName,
      receiverPhone: receiverPhone,
      dropoffLocation: dropoffLocation,
      item: item,
      description: description,
      weight: weight,
      fragile: fragile,
      deliveryFee: double.parse(deliveryFee.toStringAsFixed(0)),
    );

    // Save logistics data
    await PreferencesHelper.setString(
      key: kLogisticsKey,
      value: logistics.toJson(),
    );
    state = AsyncData(logistics);

    await showToast('Logistics details saved');
  }

  /// Set isPaid to true
  /// This is called after the payment has been confirmed.
  Future<void> setAsPaid() async {
    final logistics = state.valueOrNull;
    if (logistics == null) {
      throw const ServerErrorException('Logistics data is null');
    }

    final updatedLogistics = logistics.copyWith(isPaid: true);
    await PreferencesHelper.setString(
      key: kLogisticsKey,
      value: updatedLogistics.toJson(),
    );
    state = AsyncData(updatedLogistics);
  }
}

/// Store a new logistics order.
@riverpod
Future<void> storeLogistics(
  Ref ref, {
  required int orderId,
  required Logistics logistics,
}) async {
  final client = ref.read(dioProvider());
  final requestData = logistics.toMap()
    ..remove('Id')
    ..remove('SenderAddress')
    ..remove('ReceiverAddress')
    ..addAll({
      'SenderAddressId': logistics.pickupLocation.id,
      'ReceiverAddressId': logistics.dropoffLocation.id,
      'OrderId': orderId,
    });

  final response = await client.post<String>(
    '/logistics/create',
    data: requestData,
  );
  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }
}
