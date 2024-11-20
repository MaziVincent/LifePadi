import 'dart:math' show pi, sin, cos, sqrt, atan2;

import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:lifepadi/models/cart.dart';
import 'package:lifepadi/models/discount.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/cache_for.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'cart_state.g.dart';

@Riverpod(keepAlive: true)
class CartState extends _$CartState {
  @override
  Future<Cart> build() async {
    return _getCart();
  }

  /// Get the current cart state from shared preferences
  Future<Cart> _getCart() async {
    final products = PreferencesHelper.getStringList(kCartKey)
            ?.map(ProductMapper.fromJson)
            .toList() ??
        [];
    return _calculateCart(products);
  }

  /// Calculate the cart total based on the products in the cart
  Cart _calculateCart(List<Product> products, {Discount? discount}) {
    final subtotal = products.fold<double>(
      0,
      (sum, product) => sum + (product.price * product.quantity),
    );

    final locations = _getUniqueLocations(products);
    var deliveryFee = _calculateDeliveryFee(locations);
    var discountPrice = 0.0;
    if (discount != null) {
      if (discount.amount != null) {
        discountPrice = discount.amount!;
      } else if (discount.percentage != null) {
        discountPrice = (discount.percentage! / 100) * deliveryFee;
      }
      // Apply discount to delivery fee
      deliveryFee -= discountPrice;
    }

    // Get the current state value safely
    final currentState = state.valueOrNull;

    ref.cache();
    return Cart(
      products: products,
      subtotal: subtotal,
      total: subtotal + (deliveryFee - discountPrice),
      deliveryFee: deliveryFee,
      discount: discount ?? currentState?.discount,
      selectedLocationId: currentState?.selectedLocationId ?? 0,
    );
  }

  /// Get unique vendor locations from the products in the cart
  Set<LocationDetails> _getUniqueLocations(List<Product> products) {
    final locations = <LocationDetails>{};

    // Add all vendor locations
    for (final product in products) {
      locations.add(product.vendor.address);
    }

    return locations;
  }

  /// Calculate delivery fee based on the Travelling Salesman Problem (TSP)
  double _calculateDeliveryFee(Set<LocationDetails> locations) {
    if (locations.isEmpty) return 0;

    final points = locations.toList();
    final route = _findNearestNeighborRoute(points);

    // Calculate total distance along route
    var totalDistance = 0.0;
    for (var i = 0; i < route.length - 1; i++) {
      totalDistance += _calculateDistance(
        route[i].latLng,
        route[i + 1].latLng,
      );
    }

    return totalDistance * kDeliveryPricePerKm;
  }

  /// Find the nearest neighbor route using the Nearest Neighbor algorithm
  List<LocationDetails> _findNearestNeighborRoute(
    List<LocationDetails> points,
  ) {
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

  /// Convert degrees to radians
  double _getRadians(double degrees) => degrees * pi / 180;

  /// Use the Haversine formula to calculate distance in km
  /// between two points
  double _calculateDistance(LatLng start, LatLng end) {
    const earthRadiusKm = 6371;
    final startLatRadians = _getRadians(start.latitude);
    final endLatRadians = _getRadians(end.latitude);
    final latitudeDiffRadians = _getRadians(end.latitude - start.latitude);
    final longitudeDiffRadians = _getRadians(end.longitude - start.longitude);

    final haversineA =
        sin(latitudeDiffRadians / 2) * sin(latitudeDiffRadians / 2) +
            cos(startLatRadians) *
                cos(endLatRadians) *
                sin(longitudeDiffRadians / 2) *
                sin(longitudeDiffRadians / 2);

    final greatCircleDistance =
        2 * atan2(sqrt(haversineA), sqrt(1 - haversineA));
    return earthRadiusKm * greatCircleDistance;
  }

  /// Save the cart to shared preferences
  Future<void> _saveCart(List<Product> products) async {
    await PreferencesHelper.setStringList(
      key: kCartKey,
      value: products.map((product) => product.toJson()).toList(),
    );
    state = AsyncData(_calculateCart(products));
  }

  /// Check if a product is in the cart
  bool isInCart(int productId) {
    return state.valueOrNull?.products
            .any((product) => product.id == productId) ??
        false;
  }

  /// Add a product to the cart
  Future<void> addToCart(Product product) async {
    if (isInCart(product.id)) {
      await incrementQuantity(product.id);
      return;
    }

    final currentProducts = state.valueOrNull?.products ?? [];
    final updatedProducts = [product, ...currentProducts];
    await _saveCart(updatedProducts);
    await showToast('Added ${product.name} to cart');
  }

  /// Remove a product from the cart
  Future<void> removeFromCart(int productId) async {
    final currentState = state.valueOrNull;
    if (currentState == null) return;

    final product = currentState.products.firstWhere((p) => p.id == productId);
    final updatedProducts =
        currentState.products.where((p) => p.id != productId).toList();
    await _saveCart(updatedProducts);
    await showToast('Removed ${product.name} from cart');
  }

  /// Increment the quantity of a product in the cart
  Future<void> incrementQuantity(int productId) async {
    final currentProducts = state.valueOrNull?.products ?? [];
    final updatedProducts = currentProducts.map((product) {
      if (product.id == productId) {
        return product.copyWith(quantity: product.quantity + 1);
      }
      return product;
    }).toList();
    await _saveCart(updatedProducts);
  }

  /// Decrement the quantity of a product in the cart
  Future<void> decrementQuantity(int productId) async {
    final currentProducts = state.valueOrNull?.products ?? [];
    final product = currentProducts.firstWhere((p) => p.id == productId);

    if (product.quantity == 1) {
      await removeFromCart(productId);
      return;
    }

    final updatedProducts = currentProducts.map((p) {
      if (p.id == productId) {
        return p.copyWith(quantity: p.quantity - 1);
      }
      return p;
    }).toList();
    await _saveCart(updatedProducts);
  }

  /// Clear the cart
  Future<void> clearCart() async {
    await PreferencesHelper.setStringList(key: kCartKey, value: []);
    state = AsyncData(
      Cart(
        products: [],
        subtotal: 0,
        total: 0,
        deliveryFee: 0,
      ),
    );
    await showToast('Cart cleared');
  }

  /// Check if a voucher code is valid
  /// and apply the discount to the cart
  Future<void> applyDiscount({required String voucherCode}) async {
    final currentState = state.valueOrNull;
    if (currentState == null) return;

    final user = ref.read(authControllerProvider);
    final userId = user.maybeWhen(
      data: (user) => user.id,
      orElse: () => null,
    );
    if (userId == null) {
      await showToast('Please login to apply discount');
      return;
    }

    final client = ref.read(dioProvider());
    final response = await client.put<String>(
      '/voucher/use',
      queryParameters: {
        'voucherCode': voucherCode,
        'customerId': userId,
      },
    );

    if (response.data == null) {
      throw const InvalidDiscountCodeException('Invalid discount code');
    }

    if (response.statusCode != 200) {
      throw InvalidDiscountCodeException(response.data!);
    }

    final discount = DiscountMapper.fromJson(response.data!);

    final updatedCart =
        _calculateCart(currentState.products, discount: discount);
    state = AsyncData(updatedCart);
    await showToast('Discount applied');
  }
}
