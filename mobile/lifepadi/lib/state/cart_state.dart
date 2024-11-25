import 'package:lifepadi/models/cart.dart';
import 'package:lifepadi/models/discount.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/location_utils.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'cart_state.g.dart';

@Riverpod(keepAlive: true)
class CartState extends _$CartState with LocationUtils {
  @override
  Future<Cart> build() async {
    return _getCart();
  }

  /// Get the current cart state from shared preferences
  Future<Cart> _getCart() async {
    final cartJson = PreferencesHelper.getString(kCartKey);
    if (cartJson == null) {
      return Cart(products: [], total: 0, subtotal: 0, deliveryFee: 0);
    }
    return CartMapper.fromJson(cartJson);
  }

  /// Calculate the cart total based on the products in the cart
  Cart _computeCart({
    List<Product>? products,
    Discount? discount,
    LocationDetails? selectedLocation,
  }) {
    // Get the current state value safely
    final currentState = state.valueOrNull;
    if (discount == null && currentState?.discount != null) {
      discount = currentState?.discount;
    }
    if (selectedLocation == null && currentState?.deliveryLocation != null) {
      selectedLocation = currentState?.deliveryLocation;
    }
    products ??= currentState?.products ?? [];

    final subtotal = products.fold<double>(
      0,
      (sum, product) => sum + (product.price * product.quantity),
    );
    final locations = _getUniqueLocations(products);
    var deliveryFee = _calculateDeliveryFee(locations, selectedLocation);
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

    deliveryFee = double.parse(deliveryFee.toStringAsFixed(1));
    var total = subtotal + (deliveryFee - discountPrice);
    total = double.parse(total.toStringAsFixed(1));

    return Cart(
      products: products,
      subtotal: subtotal,
      total: total,
      deliveryFee: deliveryFee,
      discount: discount ?? currentState?.discount,
      deliveryLocation: selectedLocation ?? currentState?.deliveryLocation,
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
  double _calculateDeliveryFee(
    Set<LocationDetails> locations,
    LocationDetails? deliveryLocation,
  ) {
    if (locations.isEmpty) return 0;

    final points = locations.toList();

    // Get current delivery location from state
    if (deliveryLocation == null) return 0;

    // Find route between vendor locations
    final route = _findNearestNeighborRoute(points)
      // Add delivery location as final destination
      ..add(deliveryLocation);

    // Calculate total distance along route including to delivery location
    var totalDistance = 0.0;
    for (var i = 0; i < route.length - 1; i++) {
      totalDistance += calculateDistance(
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
        final distance = calculateDistance(
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

  /// Save the cart to shared preferences
  /// and update the state
  Future<void> _saveCart(Cart cart) async {
    await PreferencesHelper.setString(
      key: kCartKey,
      value: cart.toJson(),
    );
    state = AsyncData(cart);
  }

  /// Clear the cart
  ///
  /// Remove it from shared preferences
  /// and update the state.
  Future<void> clearCart() async {
    await PreferencesHelper.remove(kCartKey);
    state = AsyncData(
      Cart(products: [], total: 0, subtotal: 0, deliveryFee: 0),
    );
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
    await _saveCart(_computeCart(products: updatedProducts));
    await showToast('Added ${product.name} to cart');
  }

  /// Remove a product from the cart
  Future<void> removeFromCart(int productId) async {
    final currentState = state.valueOrNull;
    if (currentState == null) return;

    final product = currentState.products.firstWhere((p) => p.id == productId);
    final updatedProducts =
        currentState.products.where((p) => p.id != productId).toList();
    await _saveCart(_computeCart(products: updatedProducts));
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
    await _saveCart(_computeCart(products: updatedProducts));
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
    await _saveCart(_computeCart(products: updatedProducts));
  }

  /// Check if a voucher code is valid
  /// and apply the discount to the cart
  Future<void> applyDiscount({required String voucherCode}) async {
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

    await _saveCart(_computeCart(discount: discount));
    await showToast('Discount applied');
  }

  /// Select a location for delivery
  /// and update the delivery fee
  Future<void> selectDeliveryLocation(LocationDetails location) async {
    await _saveCart(_computeCart(selectedLocation: location));
    await showToast('Delivery location selected');
  }
}
