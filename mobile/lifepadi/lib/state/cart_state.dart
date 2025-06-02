import 'package:lifepadi/models/cart.dart';
import 'package:lifepadi/models/discount.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/state/delivery_fee.dart';
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
      return Cart(products: [], subtotal: 0);
    }
    return CartMapper.fromJson(cartJson);
  }

  /// Calculate the cart subtotal based on the products in the cart
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

    return Cart(
      products: products,
      subtotal: subtotal,
      discount: discount ?? currentState?.discount,
      deliveryLocation: selectedLocation ?? currentState?.deliveryLocation,
    );
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
  Future<void> clearCart({bool keepDeliveryLocation = false}) async {
    await PreferencesHelper.remove(kCartKey);
    state = AsyncData(
      Cart(
        products: [],
        subtotal: 0,
        deliveryLocation:
            keepDeliveryLocation ? state.valueOrNull?.deliveryLocation : null,
      ),
    );
  }

  /// Check if a product is in the cart
  bool isInCart(int productId) {
    return state.valueOrNull?.products
            .any((product) => product.id == productId) ??
        false;
  }

  /// Add a product to the cart
  Future<void> addToCart(Product product, {int quantity = 1}) async {
    final currentProducts = state.valueOrNull?.products ?? [];
    final updatedProducts = [
      product.copyWith(quantity: quantity),
      ...currentProducts,
    ];
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
    // Invalidate the delivery fee provider to recalculate the fee
    ref.invalidate(deliveryFeeProvider);
    await showToast('Discount applied');
  }

  /// Select a location for delivery
  Future<void> selectDeliveryLocation(
    LocationDetails location, {
    bool notifyDefault = false,
  }) async {
    await _saveCart(_computeCart(selectedLocation: location));
    await showToast(
      '${notifyDefault && location.isDefault ? 'Default ' : ''}Delivery location selected',
    );
  }
}
