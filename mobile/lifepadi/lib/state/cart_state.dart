import 'package:lifepadi/models/cart.dart';
import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'cart_state.g.dart';

@Riverpod(keepAlive: true)
class CartState extends _$CartState {
  @override
  Cart build() {
    return _getCart();
  }

  Cart _getCart() {
    final products = PreferencesHelper.getStringList(kCartKey)
            ?.map(ProductMapper.fromJson)
            .toList() ??
        [];
    return _calculateCart(products);
  }

  Cart _calculateCart(List<Product> products) {
    final subtotal = products.fold<double>(
      0,
      (sum, product) => sum + (product.price * product.quantity),
    );

    // You can adjust these values based on your business logic
    const deliveryFee = 0.0;
    const discountCode = 0.0;

    return Cart(
      products: products,
      subtotal: subtotal,
      total: subtotal + (deliveryFee - discountCode),
      deliveryFee: deliveryFee,
      discount: discountCode,
    );
  }

  void _saveCart(List<Product> products) {
    PreferencesHelper.setStringList(
      key: kCartKey,
      value: products.map((product) => product.toJson()).toList(),
    );
    state = _calculateCart(products);
  }

  bool isInCart(int productId) {
    return state.products.any((product) => product.id == productId);
  }

  void addToCart(Product product) {
    if (isInCart(product.id)) {
      incrementQuantity(product.id);
      return;
    }

    final updatedProducts = [product, ...state.products];
    _saveCart(updatedProducts);
    showToast('Added ${product.name} to cart');
  }

  void removeFromCart(int productId) {
    final product = state.products.firstWhere((p) => p.id == productId);
    final updatedProducts =
        state.products.where((product) => product.id != productId).toList();
    _saveCart(updatedProducts);
    showToast('Removed ${product.name} from cart');
  }

  void incrementQuantity(int productId) {
    final updatedProducts = state.products.map((product) {
      if (product.id == productId) {
        return Product(
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          vendor: product.vendor,
          quantity: product.quantity + 1,
        );
      }
      return product;
    }).toList();
    _saveCart(updatedProducts);
  }

  void decrementQuantity(int productId) {
    final product = state.products.firstWhere((p) => p.id == productId);
    if (product.quantity == 1) {
      removeFromCart(productId);
      return;
    }

    final updatedProducts = state.products.map((product) {
      if (product.id == productId) {
        return Product(
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          imageUrl: product.imageUrl,
          vendor: product.vendor,
          quantity: product.quantity - 1,
        );
      }
      return product;
    }).toList();
    _saveCart(updatedProducts);
  }

  void clearCart() {
    PreferencesHelper.setStringList(key: kCartKey, value: []);
    state = Cart(
      products: [],
      subtotal: 0,
      total: 0,
      deliveryFee: 0,
      discount: 0,
    );
    showToast('Cart cleared');
  }
}
