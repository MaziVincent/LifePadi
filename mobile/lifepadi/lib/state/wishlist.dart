import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'wishlist.g.dart';

@Riverpod(keepAlive: true)
class Wishlist extends _$Wishlist {
  @override
  List<Product> build() {
    return _getWishlist();
  }

  List<Product> _getWishlist() {
    return PreferencesHelper.getStringList(kWishlistKey)
            ?.map(ProductMapper.fromJson)
            .toList() ??
        [];
  }

  /// Check if a product is in wishlist
  bool isInWishlist(int productId) {
    return state.any((product) => product.id == productId);
  }

  /// Add item to wishlist
  void addToWishlist(Product product) {
    if (isInWishlist(product.id)) return;

    final updatedWishlist = [product, ...state];
    PreferencesHelper.setStringList(
      key: kWishlistKey,
      value: updatedWishlist.map((product) => product.toJson()).toList(),
    );
    state = updatedWishlist;
  }

  /// Remove item from wishlist
  void removeFromWishlist(int productId) {
    final updatedWishlist =
        state.where((product) => product.id != productId).toList();
    PreferencesHelper.setStringList(
      key: kWishlistKey,
      value: updatedWishlist.map((product) => product.toJson()).toList(),
    );
    state = updatedWishlist;
  }

  /// Toggle item in wishlist
  /// If the item is in wishlist, remove it
  /// If the item is not in wishlist, add it
  void toggle(Product product) {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      showToast('Removed from wishlist');
    } else {
      addToWishlist(product);
      showToast('Added to wishlist');
    }
  }

  /// Clear wishlist
  void clearWishlist() {
    PreferencesHelper.setStringList(key: kWishlistKey, value: []);
    state = [];
  }
}
