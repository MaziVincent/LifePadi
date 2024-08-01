import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/my_app_bar.dart';
import 'package:lifepadi/widgets/my_icon_button.dart';

class OrdersPage extends StatelessWidget {
  const OrdersPage({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
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
              onPressed: () {
                // TODO: Go to cart page.
              },
            ),
          ],
          height: 126.h,
          bottom: TabBar(
            tabs: [
              Tab(text: 'Ongoing', height: 39.h),
              Tab(text: 'Completed', height: 39.h),
            ],
            dividerHeight: 0,
            tabAlignment: TabAlignment.fill,
            indicator: BoxDecoration(
              color: const Color(0xFFF1F1FD),
              borderRadius: BorderRadius.circular(6.r),
            ),
            padding: EdgeInsets.only(left: 10.w, top: 10.h),
            labelColor: const Color(0xFF139D01),
            unselectedLabelColor: const Color(0xFFBDBDBD),
            labelPadding: EdgeInsets.zero,
            splashFactory: NoSplash.splashFactory,
            labelStyle: TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w600),
            unselectedLabelStyle:
                TextStyle(fontSize: 14.sp, fontWeight: FontWeight.w600),
            indicatorSize: TabBarIndicatorSize.tab,
          ),
        ),
        body: TabBarView(
          children: [
            Column(
              children: [
                16.verticalSpace,
                const Text('Ongoing Orders'),
              ],
            ),
            const Center(child: Text('Completed Orders')),
          ],
        ),
      ),
    );
  }
}
