import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/mock_data.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:remixicon/remixicon.dart';

import '../utils/constants.dart';

class OrderDetailsPage extends StatelessWidget {
  const OrderDetailsPage({super.key, required this.id});

  final int id;

  @override
  Widget build(BuildContext context) {
    final paymentMethod = paymentMethods[1];

    return Scaffold(
      appBar: MyAppBar(
        title: 'Order Details',
        actions: [
          MyIconButton(
            icon: Remix.more_2_fill,
            onPressed: () {
              // TODO: Add a popup menu with option: Get Receipt (Go to receipt page).
            },
          ),
        ],
      ),
      body: Stack(
        children: [
          SuperListView(
            padding: kHorizontalPadding.copyWith(top: 12.h),
            children: [
              /// Product info
              Padding(
                padding: EdgeInsets.only(bottom: 12.h),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      width: 48.h,
                      height: 48.h,
                      decoration: ShapeDecoration(
                        image: DecorationImage(
                          image: Assets.images.bnbBlender.provider(),
                          fit: BoxFit.fill,
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(8.r),
                        ),
                      ),
                    ),
                    12.horizontalSpace,
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'BNB Blender',
                            style: context.textTheme.titleSmall?.copyWith(
                              fontSize: 14.sp,
                              fontWeight: FontWeight.w500,
                              color: const Color(0xFF27272A),
                            ),
                          ),
                          Text(
                            '04-05-2024',
                            style: context.textTheme.bodySmall?.copyWith(
                              color: const Color(0xFF7F7F89),
                              fontSize: 10.sp,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                          4.verticalSpace,
                          Text(
                            'Order no: #787654JK',
                            style: context.textTheme.bodySmall?.copyWith(
                              color: const Color(0xFF27272A),
                              fontSize: 12.sp,
                              fontWeight: FontWeight.w400,
                            ),
                          ),
                          Container(
                            height: 30.h,
                            clipBehavior: Clip.antiAlias,
                            decoration: ShapeDecoration(
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(4.r),
                                side: const BorderSide(
                                  color: Color(0xFFCCCCCC),
                                ),
                              ),
                            ),
                            padding: EdgeInsets.symmetric(
                              horizontal: 12.w,
                              vertical: 3.h,
                            ),
                            margin: EdgeInsets.only(top: 8.h),
                            child: const OrderStatusWidget(
                              status: OrderStatus.ongoing,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              /// Price info
              const SectionTitle('Total Items'),
              Padding(
                padding: EdgeInsets.symmetric(horizontal: 16.w, vertical: 12.h),
                child: Column(
                  children: <Widget>[
                    const PriceBreakdownItem(
                      title: 'BNB Blender',
                      price: 43000,
                      isFirst: true,
                    ),
                    const PriceBreakdownItem(title: 'Logistics', price: 300),
                    const PriceBreakdownItem(
                      title: 'Sub total',
                      price: 43300,
                      isFinal: true,
                    ),
                  ].separatedBy(const MyDivider()),
                ),
              ),

              /// Location
              const SectionTitle(
                'Location',
                color: Color(0xFF27272A),
              ),
              LocationCard(
                onTap: () {
                  // TODO: Open bottom sheet to update location
                },
                place: 'Soja, Lekki Lagos...',
                phoneNumber: '0901 234 5678',
              ),

              /// Payment method
              const SectionTitle('Payment Method'),
              PaymentMethodInfo(
                onTap: () {
                  // TODO: Change payment method
                },
                image: paymentMethod.image,
                description: paymentMethod.description,
                balance: paymentMethod.balance,
                id: paymentMethod.id,
                isDefault: paymentMethod.isDefault,
              ),
              10.verticalSpace,
              182.verticalSpace,
            ].separatedBy(14.verticalSpace),
          ),
          BottomPanel(
            height: 182.h,
            child: Column(
              children: <Widget>[
                PrimaryOutlineButton(
                  onPressed: () =>
                      context.push(TrackOrderRoute(id: id).location),
                  text: 'Track Order',
                ),
                PrimaryButton(
                  onPressed: () {
                    // TODO: Implement Buy Again
                  },
                  text: 'Buy Again',
                ),
              ].separatedBy(17.verticalSpace),
            ),
          ),
        ],
      ),
    );
  }
}
