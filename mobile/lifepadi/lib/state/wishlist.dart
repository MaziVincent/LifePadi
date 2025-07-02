import 'package:lifepadi/models/product.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/preferences_helper.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'wishlist.g.dart';

@Riverpod(keepAlive: true)
class Wishlist extends _$Wishlist {
  @override
  Future<List<Product>> build() async {
    return _getWishlist();
  }

  Future<List<Product>> _getWishlist() async {
    ref.cache();
    return PreferencesHelper.getStringList(kWishlistKey)
            ?.map(ProductMapper.fromJson)
            .toList() ??
        [];
  }

  /// Check if a product is in wishlist
  bool isInWishlist(int productId) {
    return state.valueOrNull?.any(
          (product) => product.id == productId,
        ) ??
        false;
  }

  /// Add item to wishlist
  Future<void> addToWishlist(Product product) async {
    if (isInWishlist(product.id)) return;

    final currentProducts = state.valueOrNull ?? [];
    final updatedWishlist = [product, ...currentProducts];
    await PreferencesHelper.setStringList(
      key: kWishlistKey,
      value: updatedWishlist.map((product) => product.toJson()).toList(),
    );
    state = AsyncData(updatedWishlist);
  }

  /// Remove item from wishlist
  Future<void> removeFromWishlist(int productId) async {
    final currentProducts = state.valueOrNull ?? [];
    final updatedWishlist =
        currentProducts.where((product) => product.id != productId).toList();
    await PreferencesHelper.setStringList(
      key: kWishlistKey,
      value: updatedWishlist.map((product) => product.toJson()).toList(),
    );
    state = AsyncData(updatedWishlist);
  }

  /// Toggle item in wishlist
  Future<void> toggle(Product product) async {
    if (isInWishlist(product.id)) {
      await removeFromWishlist(product.id);
      await showToast('Removed ${product.name} from wishlist');
    } else {
      await addToWishlist(product);
      await showToast('Added ${product.name} to wishlist');
    }
  }

  /// Clear wishlist
  Future<void> clearWishlist() async {
    await PreferencesHelper.setStringList(key: kWishlistKey, value: []);
    state = const AsyncData([]);
  }
}
