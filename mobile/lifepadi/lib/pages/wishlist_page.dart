import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

class WishlistPage extends StatelessWidget {
  const WishlistPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(
        title: 'Wishlist',
        actions: [
          MyIconButton(
            icon: Remix.more_2_fill,
            onPressed: () {
              // Potential actions: remove all, sort by price...
            },
          ),
        ],
      ),
      body: SuperListView(
        padding: kHorizontalPadding.copyWith(top: 5.h, bottom: 30.h),
        children: [
          for (final i in [1, 2, 3])
            ProductTile(
              id: i,
              image: Assets.images.oilPerfumes.provider(),
              name: 'Oil Perfumes',
              vendor: 'Beauty Collection',
              price: 500,
              isInWishlistInitial: true,
            ),
        ].separatedBy(11.verticalSpace),
      ),
    );
  }
}
