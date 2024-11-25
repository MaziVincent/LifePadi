import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/models/logistics.dart';
import 'package:lifepadi/utils/constants.dart';
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
  double calculateDeliveryFee(LocationDetails pickup, LocationDetails dropoff) {
    final distance = calculateDistance(pickup.latLng, dropoff.latLng);
    return distance * kDeliveryPricePerKm;
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
      deliveryFee: deliveryFee,
    );

    // Save logistics data
    await PreferencesHelper.setString(
      key: kLogisticsKey,
      value: logistics.toJson(),
    );
    state = AsyncData(logistics);

    await showToast('Logistics details saved');
  }
}
