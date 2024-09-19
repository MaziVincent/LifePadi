import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';

class OrdersPage extends StatelessWidget {
  const OrdersPage({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 4,
      child: Scaffold(
        appBar: MyAppBar(
          title: Text(
            'Orders',
            style: context.textTheme.titleLarge?.copyWith(
              fontSize: 20.sp,
              fontWeight: FontWeight.w700,
            ),
          ),
          actions: [
            MyIconButton(
              icon: IconsaxPlusLinear.shopping_cart,
              onPressed: () => context.push(CartRoute().location),
            ),
          ],
          height: 126.h,
          bottom: TabBar(
            tabs: [
              Tab(text: 'Pending', height: 39.h),
              Tab(text: 'Ongoing', height: 39.h),
              Tab(text: 'Completed', height: 39.h),
              Tab(text: 'Canceled', height: 39.h),
            ],
            dividerHeight: 0,
            tabAlignment: TabAlignment.fill,
            indicator: BoxDecoration(
              color: const Color(0xFFF1F1FD),
              borderRadius: BorderRadius.circular(6.r),
            ),
            padding: EdgeInsets.only(left: 10.w, top: 10.h),
            labelColor: kBrightGreen,
            unselectedLabelColor: const Color(0xFFBDBDBD),
            labelPadding: EdgeInsets.zero,
            splashFactory: NoSplash.splashFactory,
            labelStyle: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w600),
            unselectedLabelStyle:
                TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w600),
            indicatorSize: TabBarIndicatorSize.tab,
          ),
        ),
        body: const TabBarView(
          children: [
            MyOrderList(
              status: OrderStatus.pending,
              numberOfOrders: 2,
            ),
            MyOrderList(
              status: OrderStatus.ongoing,
              numberOfOrders: 3,
            ),
            MyOrderList(
              status: OrderStatus.completed,
              numberOfOrders: 4,
            ),
            MyOrderList(
              status: OrderStatus.canceled,
              numberOfOrders: 1,
            ),
          ],
        ),
      ),
    );
  }
}
