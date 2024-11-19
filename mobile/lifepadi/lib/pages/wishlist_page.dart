import 'package:flutter_material_design_icons/flutter_material_design_icons.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/state/wishlist.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';

class WishlistPage extends ConsumerWidget {
  const WishlistPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final wishlistAsync = ref.watch(wishlistProvider);

    return Scaffold(
      appBar: const MyAppBar(title: 'Wishlist'),
      body: wishlistAsync.when(
        loading: () => const Center(child: GreenyLoadingWheel()),
        error: (err, stack) => Center(child: Text('Error: $err')),
        data: (products) => SuperListView(
          padding: kHorizontalPadding.copyWith(top: 5.h, bottom: 30.h),
          children: [
            if (products.isEmpty)
              Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      MdiIcons.heart,
                      size: 60.sp,
                      color: kDarkPrimaryColor,
                    ),
                    20.verticalSpace,
                    Text(
                      'No items in your wishlist',
                      style: context.textTheme.bodyMedium?.copyWith(
                        color: const Color(0xFF27272A),
                        fontSize: 14.sp,
                        fontWeight: FontWeight.w400,
                      ),
                    ),
                  ],
                ),
              )
            else
              ...products.map((product) => ProductTile(product: product)),
          ].separatedBy(11.verticalSpace),
        ),
      ),
    );
  }
}
