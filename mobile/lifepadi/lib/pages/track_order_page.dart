import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

import '../utils/constants.dart';

class TrackOrderPage extends StatelessWidget {
  const TrackOrderPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context) {
    final urbanistStyle = GoogleFonts.urbanist(
      color: const Color(0xFF616161),
      fontSize: 12.05.sp,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.17.r,
    );

    return Scaffold(
      appBar: MyAppBar(
        title: 'Track Order',
        actions: [
          /// QR code button
          MyIconButton(
            iconWidget: Assets.icons.scan.svg(
              height: 18.h,
              width: 18.h,
            ),
            onPressed: () {
              // Implement tracking order with QR code scan
            },
          ),
          // TODO: Only show this button if the order is ongoing
          MyIconButton(
            icon: Remix.map_pin_5_line,
            iconColor: kDarkPrimaryColor,
            onPressed: () => context.push(TrackOrderMapRoute(id: id).location),
          ),
        ],
      ),
      body: Stack(
        children: [
          SuperListView(
            padding: kHorizontalPadding.copyWith(top: 12.h),
            children: [
              TrackTile(
                title: 'Order no: #787654JK',
                subtitle: 'Order Placed: 04-05-2024',
                icon: Assets.icons.boxClosed.path,
              ),
              TrackTile(
                title: 'Order Placed',
                subtitle: '05-05-2024',
                icon: Assets.icons.boxOpen.path,
              ),
              TrackTile(
                title: 'Order Confirmed',
                subtitle: '05-05-2024',
                icon: Assets.icons.successCheckOpen.path,
              ),
              TrackTile(
                title: 'Order Procurement',
                subtitle: '05-05-2024',
                icon: Assets.icons.pathToLocation.path,
              ),
              TrackTile(
                title: 'Out for Delivery',
                subtitle: 'Pending',
                icon: Assets.icons.speedBus.path,
                status: TrackStatus.pending,
              ),
              TrackTile(
                title: 'Order Delivered',
                subtitle: 'Pending',
                icon: Assets.icons.emptyTrolley.path,
                status: TrackStatus.pending,
              ),
              128.verticalSpace,
            ].separatedBy(14.verticalSpace),
          ),
          BottomPanel(
            height: 128.h,
            child: Padding(
              padding: EdgeInsets.symmetric(vertical: 6.h),
              child: Row(
                children: [
                  Container(
                    width: 77.h,
                    height: 77.h,
                    decoration: ShapeDecoration(
                      image: DecorationImage(
                        image: Assets.images.johnBayo.provider(),
                        fit: BoxFit.fill,
                      ),
                      shape: RoundedRectangleBorder(
                        side: BorderSide(
                          width: 1.60,
                          color: Colors.black.withOpacity(0.05),
                        ),
                        borderRadius: BorderRadius.circular(12.83.r),
                      ),
                    ),
                  ),
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: EdgeInsets.only(top: 4.h),
                          child: Text(
                            'John Bayo',
                            style: context.textTheme.bodyMedium?.copyWith(
                              color: const Color(0xFF27272A),
                              fontSize: 14.sp,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                        Text(
                          'Rider',
                          style: context.textTheme.bodySmall?.copyWith(
                            color: const Color(0xFF7F7F89),
                            fontSize: 10.sp,
                            fontWeight: FontWeight.w400,
                          ),
                        ),
                        Row(
                          children: [
                            Text(
                              '1.2 km away |',
                              style: urbanistStyle,
                            ),
                            Assets.icons.star.image(
                              height: 12.05.h,
                              width: 12.05.h,
                            ),
                            Text(
                              '4.9',
                              style: urbanistStyle,
                            ),
                          ].separatedBy(5.16.horizontalSpace),
                        ),
                      ],
                    ),
                  ),
                  MyOutlineIconButton(
                    onPressed: () =>
                        context.push(const SingleChatRoute(id: 1).location),
                    icon: IconsaxPlusLinear.messages_2,
                  ),
                  MyOutlineIconButton(
                    onPressed: () {
                      // TODO: Use url_launcher to open phone call with rider's number
                    },
                    icon: IconsaxPlusLinear.call,
                  ),
                ].separatedBy(12.horizontalSpace),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
