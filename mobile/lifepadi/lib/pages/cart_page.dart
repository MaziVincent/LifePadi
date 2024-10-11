import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class CartPage extends HookWidget {
  const CartPage({super.key});

  @override
  Widget build(BuildContext context) {
    final selectAll = useState(false);

    return Scaffold(
      appBar: MyAppBar(
        title: 'Cart',
        actions: [
          MyIconButton(
            icon: Remix.more_2_fill,
            onPressed: () {
              // TODO: YAGNI! Just keeping this for now because it's in the design.
            },
          ),
        ],
      ),
      body: Stack(
        children: [
          SuperListView(
            padding: kHorizontalPadding.copyWith(top: 12.h),
            children: [
              const SectionTitle('Location'),
              12.verticalSpace,
              LocationCard(
                onTap: () {
                  // TODO: Open bottom sheet to update location
                },
                place: '3RD FLOOR DREAMLINK CONCEPTS',
                phoneNumber: '0701 234 5678',
              ),
              18.verticalSpace,
              const SectionTitle('Items in Cart'),
              8.verticalSpace,
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Transform.scale(
                        scale: 1.3,
                        child: SizedBox(
                          height: 24.h,
                          width: 24.h,
                          child: Checkbox.adaptive(
                            value: selectAll.value,
                            onChanged: (bool? value) =>
                                selectAll.value = value ?? false,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(4.r),
                            ),
                            side: const BorderSide(
                              color: Color(0xFFDCDCE2),
                            ),
                            activeColor: kDarkPrimaryColor,
                          ),
                        ),
                      ),
                      8.horizontalSpace,
                      Text(
                        'Select all',
                        style: context.textTheme.bodyMedium?.copyWith(
                          fontSize: 14.sp,
                          fontWeight: FontWeight.w500,
                          color: const Color(0xFF27272A),
                        ),
                      ),
                    ],
                  ),
                  IconButton(
                    onPressed: () {
                      // TODO: Clear cart
                      // Just clear cart or show a confirmation dialog first?..TBH, I don't know yet. TBD!
                    },
                    icon: const Icon(
                      IconsaxPlusLinear.trash,
                    ),
                    iconSize: 24.sp,
                  ),
                ],
              ),
              4.verticalSpace,
              const MyDivider(),
              16.verticalSpace,
              ...[
                CartItem(
                  image: Assets.images.bnbBlender.provider(),
                  price: 33000,
                  name: 'BNB Blender',
                ),
                CartItem(
                  image: Assets.images.miniBlender.provider(),
                  price: 5000,
                  name: 'Mini BNB Blender',
                ),
                CartItem(
                  image: Assets.images.miniBlender.provider(),
                  price: 5000,
                  name: 'Mini BNB Blender',
                ),
              ].separatedBy(14.verticalSpace),
              31.verticalSpace,
              247.verticalSpace,
            ],
          ),
          BottomPanel(
            child: Column(
              children: [
                const CartDiscount(),
                const MyDivider(),
                Padding(
                  padding:
                      EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
                  child: const PaymentTotal(totalPrice: 43000),
                ),
                PrimaryButton(
                  text: 'Proceed to checkout',
                  onPressed: () => CheckoutRoute().go(context),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
