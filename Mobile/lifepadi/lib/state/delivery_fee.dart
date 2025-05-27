import 'dart:math' show pi, sin, cos, sqrt, atan2;

import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/cart.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/state/cart_state.dart';
import 'package:lifepadi/state/client.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'delivery_fee.g.dart';

/// Provider to fetch delivery fee from backend
@riverpod
Future<DeliveryFeeResponse> deliveryFee(
  Ref ref,
) async {
  final cart = ref.read(cartStateProvider).valueOrNull;
  if (cart == null) {
    throw Exception('Cart is not initialized');
  }
  if (cart.products.isEmpty || cart.deliveryLocation == null) {
    return const DeliveryFeeResponse(deliveryFee: 0, total: 0);
  }

  // Calculate total distance using TSP algorithm
  final distance = _calculateTotalDistance(cart);

  final client = ref.read(dioProvider());

  // Prepare request parameters
  final params = <String, dynamic>{
    'Distance': distance,
  };

  // Add discount parameters if discount is available
  if (cart.discount != null) {
    final discount = cart.discount;

    if (discount!.amount != null) {
      params['DiscountAmount'] = discount.amount;
    } else if (discount.percentage != null) {
      params['DiscountPercentage'] = discount.percentage;
    }
  }

  final response = await client.get<Map<String, dynamic>>(
    '/delivery/getfee',
    queryParameters: params,
  );

  if (response.data == null) {
    throw Exception('Failed to fetch delivery fee');
  }

  final deliveryFee =
      double.parse((response.data!['DeliveryFee'] as num).toStringAsFixed(2));
  final total = cart.subtotal + deliveryFee;

  return DeliveryFeeResponse(
    deliveryFee: deliveryFee,
    total: total,
  );
}

/// Provider to fetch delivery fee for logistics based on distance only
@riverpod
Future<double> deliveryFeeForDistance(
  Ref ref, {
  required double distance,
}) async {
  final client = ref.read(dioProvider());

  // Prepare request parameters with just distance
  final params = <String, dynamic>{
    'Distance': distance,
  };

  final response = await client.get<Map<String, dynamic>>(
    '/delivery/getfee',
    queryParameters: params,
  );

  if (response.data == null) {
    throw Exception('Failed to fetch delivery fee');
  }

  return double.parse(
      (response.data!['DeliveryFee'] as num).toStringAsFixed(2));
}

/// Calculate total distance using TSP algorithm like the original implementation
double _calculateTotalDistance(Cart cart) {
  if (cart.products.isEmpty || cart.deliveryLocation == null) {
    return 0;
  }

  // Get unique vendor locations from the products in the cart
  final locations = <LocationDetails>{};
  for (final product in cart.products) {
    if (product.vendor.address != null) {
      locations.add(product.vendor.address!);
    }
  }

  if (locations.isEmpty) return 0;

  final points = locations.toList();
  final deliveryLocation = cart.deliveryLocation!;

  // Find route between vendor locations using Nearest Neighbor algorithm
  final route = _findNearestNeighborRoute(points)
    ..add(deliveryLocation); // Add delivery location as final destination

  // Calculate total distance along route including to delivery location
  var totalDistance = 0.0;
  for (var i = 0; i < route.length - 1; i++) {
    totalDistance += _calculateDistance(
      route[i].latLng,
      route[i + 1].latLng,
    );
  }

  return totalDistance;
}

/// Find the nearest neighbor route using the Nearest Neighbor algorithm
List<LocationDetails> _findNearestNeighborRoute(List<LocationDetails> points) {
  if (points.isEmpty) return [];
  if (points.length == 1) return points;

  final route = <LocationDetails>[points.first];
  final unvisited = points.skip(1).toList();

  while (unvisited.isNotEmpty) {
    final current = route.last;
    var nearestIdx = 0;
    var minDistance = double.infinity;

    // Find nearest unvisited point
    for (var i = 0; i < unvisited.length; i++) {
      final distance = _calculateDistance(
        current.latLng,
        unvisited[i].latLng,
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestIdx = i;
      }
    }

    route.add(unvisited[nearestIdx]);
    unvisited.removeAt(nearestIdx);
  }

  return route;
}

/// Response model for delivery fee calculation
class DeliveryFeeResponse {
  const DeliveryFeeResponse({
    required this.deliveryFee,
    required this.total,
  });

  final double deliveryFee;
  final double total;
}

/// Helper function to calculate distance between two points using Haversine formula
double _calculateDistance(LatLng start, LatLng end) {
  const earthRadiusKm = 6371;
  final startLatRadians = start.latitude * pi / 180;
  final endLatRadians = end.latitude * pi / 180;
  final latitudeDiffRadians = (end.latitude - start.latitude) * pi / 180;
  final longitudeDiffRadians = (end.longitude - start.longitude) * pi / 180;

  final haversineA =
      sin(latitudeDiffRadians / 2) * sin(latitudeDiffRadians / 2) +
          cos(startLatRadians) *
              cos(endLatRadians) *
              sin(longitudeDiffRadians / 2) *
              sin(longitudeDiffRadians / 2);

  final greatCircleDistance = 2 * atan2(sqrt(haversineA), sqrt(1 - haversineA));
  return earthRadiusKm * greatCircleDistance;
}
