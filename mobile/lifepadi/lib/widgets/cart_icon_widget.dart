import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/cart_state.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/widgets/widgets.dart';

class CartIconWidget extends ConsumerWidget {
  const CartIconWidget({
    super.key,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cartAsync = ref.watch(cartStateProvider);

    return Badge(
      label: Text(
        cartAsync.when(
          data: (cart) =>
              '${cart.products.length < 99 ? cart.products.length : '99+'}',
          error: (_, __) => '0',
          loading: () => '0',
        ),
      ),
      backgroundColor: kDarkPrimaryColor,
      child: MyIconButton(
        icon: IconsaxPlusLinear.shopping_cart,
        onPressed: () => context.go(CartRoute().location),
      ),
    );
  }
}
