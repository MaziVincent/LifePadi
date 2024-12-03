import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/widgets/rider_distance_away.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';
import 'package:url_launcher/url_launcher.dart';

import '../utils/constants.dart';

class TrackOrderPage extends StatelessWidget {
  const TrackOrderPage({super.key, required this.order});

  final Order order;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(
        title: 'Track Order',
        actions: [
          if (order.status == OrderStatus.ongoing && order.rider != null)
            MyIconButton(
              icon: Remix.map_pin_5_line,
              iconColor: kDarkPrimaryColor,
              onPressed: () => context.push(
                TrackOrderMapRoute(
                  orderId: order.orderId,
                  riderId: order.rider!.id,
                  latitude: order.deliveryLocation.latitude,
                  longitude: order.deliveryLocation.longitude,
                ).location,
              ),
            ),
        ],
      ),
      body: Stack(
        children: [
          SuperListView(
            padding: kHorizontalPadding.copyWith(top: 12.h),
            children: [
              TrackTile(
                title: 'Order no: #${order.orderId}',
                subtitle: 'Order Placed: ${order.createdAt.readable}',
                icon: Assets.icons.boxClosed.path,
              ),
              TrackTile(
                title: 'Order Placed',
                subtitle: order.createdAt.readable,
                icon: Assets.icons.boxOpen.path,
              ),
              TrackTile(
                title: 'Order Confirmed',
                subtitle: order.createdAt.readable,
                icon: Assets.icons.successCheckOpen.path,
              ),
              TrackTile(
                title: 'Order Ongoing',
                subtitle: order.createdAt.readable,
                icon: Assets.icons.pathToLocation.path,
              ),
              TrackTile(
                title: 'Rider Assigned',
                subtitle:
                    order.rider != null ? order.createdAt.readable : 'Pending',
                icon: Assets.icons.speedBus.path,
                status: order.rider != null
                    ? TrackStatus.completed
                    : TrackStatus.pending,
              ),
              TrackTile(
                title: 'Order Delivered',
                subtitle: order.status == OrderStatus.completed
                    ? order.createdAt.readable
                    : 'Pending',
                icon: Assets.icons.emptyTrolley.path,
                status: order.status == OrderStatus.completed
                    ? TrackStatus.completed
                    : TrackStatus.pending,
              ),
              128.verticalSpace,
            ].separatedBy(14.verticalSpace),
          ),
          if (order.rider != null)
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
                              order.rider!.name,
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
                          RiderDistanceAway(riderId: order.rider!.id),
                        ],
                      ),
                    ),
                    MyOutlineIconButton(
                      onPressed: () async => launchUrl(
                        Uri.parse(
                          'https://wa.me/${order.rider!.internationalPhone}',
                        ),
                      ),
                      icon: IconsaxPlusLinear.messages_2,
                    ),
                    MyOutlineIconButton(
                      onPressed: () async => launchUrl(
                        Uri.parse(
                          'tel:${order.rider!.internationalPhone}',
                        ),
                      ),
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
