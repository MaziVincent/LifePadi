import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/cart_state.dart';
import 'package:lifepadi/state/location.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class CartPage extends HookConsumerWidget {
  const CartPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cartAsync = ref.watch(cartStateProvider);
    final isExpanded = useState(false);
    final locations = ref.watch(locationsProvider);

    void togglePanel() => isExpanded.value = !isExpanded.value;

    return Scaffold(
      appBar: MyAppBar(
        title: 'Cart',
        actions: [
          MyIconButton(
            icon: Remix.more_2_fill,
            onPressed: () {},
          ),
        ],
      ),
      body: cartAsync.when(
        loading: () => const Center(child: GreenyLoadingWheel()),
        error: (err, stack) => Center(child: Text('Error: $err')),
        data: (cart) => Stack(
          children: [
            SuperListView(
              padding: kHorizontalPadding.copyWith(top: 12.h),
              children: [
                const SectionTitle('Location'),
                12.verticalSpace,
                LocationCard(
                  onTap: () async {
                    await displayBottomPanel(
                      context,
                      child: EditLocationModalForm(
                        selectedLocationId: cart.deliveryLocation?.id,
                        onLocationSelected: (location) => ref
                            .read(cartStateProvider.notifier)
                            .selectDeliveryLocation(location),
                      ),
                    );
                  },
                  address: locations.whenOrNull(
                        data: (locations) => cart.deliveryLocation != null
                            ? locations
                                .where(
                                  (location) =>
                                      location.id == cart.deliveryLocation?.id,
                                )
                                .firstOrNull
                                ?.address
                            : locations.isEmpty
                                ? 'Add a delivery location'
                                : 'Select a delivery location',
                      ) ??
                      'Loading locations...',
                ),
                18.verticalSpace,
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const SectionTitle('Items in Cart'),
                    IconButton(
                      onPressed: () =>
                          ref.read(cartStateProvider.notifier).clearCart(),
                      icon: const Icon(IconsaxPlusLinear.trash),
                      iconSize: 24.sp,
                    ),
                  ],
                ),
                4.verticalSpace,
                const MyDivider(),
                16.verticalSpace,
                if (cart.products.isEmpty)
                  Padding(
                    padding: EdgeInsets.only(top: 16.w),
                    child: Center(
                      child: Text(
                        'Your cart is empty',
                        style: context.textTheme.bodyMedium?.copyWith(
                          color: kDarkPrimaryColor,
                        ),
                      ),
                    ),
                  ),
                ...cart.products
                    .map(
                      (product) => CartItem(
                        image: CachedNetworkImageProvider(product.imageUrl),
                        price: product.price * product.quantity,
                        name: product.name,
                        quantity: product.quantity,
                        onIncrement: () => ref
                            .read(cartStateProvider.notifier)
                            .incrementQuantity(product.id),
                        onDecrement: () => ref
                            .read(cartStateProvider.notifier)
                            .decrementQuantity(product.id),
                        onRemove: () => ref
                            .read(cartStateProvider.notifier)
                            .removeFromCart(product.id),
                        vendorName: product.vendor.name,
                      ),
                    )
                    .toList()
                    .separatedBy(14.verticalSpace),
                31.verticalSpace,
                if (isExpanded.value) 332.verticalSpace else 150.verticalSpace,
              ],
            ),
            BottomPanel(
              height: isExpanded.value ? 332.h : 150.h,
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      if (!isExpanded.value)
                        Expanded(
                          child: PaymentPrice(
                            title: 'Subtotal',
                            amount: cart.subtotal,
                            description:
                                'This is the total amount of all the items in your cart.',
                          ),
                        )
                      else
                        const Expanded(child: Text('Hide details')),
                      IconButton(
                        icon: Icon(
                          isExpanded.value
                              ? Icons.keyboard_double_arrow_down
                              : Icons.keyboard_double_arrow_up,
                        ),
                        onPressed: togglePanel,
                      ),
                    ],
                  ),
                  if (isExpanded.value) ...[
                    const CartDiscount(),
                    const MyDivider(),
                    12.verticalSpace,
                    if (cart.discount != null)
                      Text(
                        cart.discount!.statement,
                        style: context.textTheme.bodyMedium?.copyWith(
                          fontSize: 14.sp,
                          fontWeight: FontWeight.w400,
                          fontStyle: FontStyle.italic,
                          color: const Color(0xFF7F7F89),
                        ),
                      ),
                    PaymentPrice(
                      title: 'Delivery Fee',
                      amount: cart.deliveryFee,
                    ),
                    PaymentPrice(
                      title: 'Total',
                      amount: cart.total,
                      description: kTotalDescription,
                    ),
                  ],
                  10.verticalSpace,
                  PrimaryButton(
                    text: 'Proceed to checkout',
                    onPressed: () async {
                      if (cart.deliveryLocation == null) {
                        if (context.mounted) {
                          await displayError(
                            context,
                            title: 'No delivery location selected',
                            description: 'Please choose a delivery location',
                          );
                        } else {
                          await showToast('Please select a delivery location');
                        }
                      } else if (cart.products.isEmpty) {
                        await showToast(
                          'Your cart is empty, nothing to checkout',
                          gravity: ToastGravity.CENTER,
                        );
                      } else {
                        CheckoutRoute().go(context);
                      }
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
