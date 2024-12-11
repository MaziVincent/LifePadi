import 'dart:async';

import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:location/location.dart';

class RiderPage extends StatefulWidget {
  const RiderPage({super.key});

  @override
  State<RiderPage> createState() => _RiderPageState();
}

class _RiderPageState extends State<RiderPage> {
  Location location = Location();

  Future<void> requestForLocationPermission() async {
    bool serviceEnabled;
    PermissionStatus permissionGranted;

    // Check location services
    serviceEnabled = await location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await location.requestService();
      if (!serviceEnabled) return;
    }

    // Check permissions
    permissionGranted = await location.hasPermission();
    if (permissionGranted == PermissionStatus.denied) {
      permissionGranted = await location.requestPermission();
      if (permissionGranted != PermissionStatus.granted) return;
    }
  }

  @override
  void initState() {
    super.initState();
    requestForLocationPermission();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: MyAppBar(
          title: 'Deliveries',
          height: 126.h,
          actions: [
            /// Logout button
            Consumer(
              builder: (context, ref, child) {
                return MyIconButton(
                  icon: IconsaxPlusLinear.logout,
                  onPressed: () async {
                    await openChoiceDialog(
                      context: context,
                      title: 'Logout of Lifepadi?',
                      description: 'Are you sure you want to log out?',
                      icon: IconsaxPlusLinear.logout,
                      onYes: () async {
                        await ref
                            .read(authControllerProvider.notifier)
                            .logout()
                            .then((_) {
                          if (context.mounted) {
                            context.go(const LoginRoute().location);
                          }
                        });
                      },
                    );
                  },
                );
              },
            ),
          ],
          bottom: TabBar(
            tabs: [
              Tab(text: 'New Orders', height: 39.h),
              Tab(text: 'Completed', height: 39.h),
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
            RiderOrderList(status: OrderStatus.ongoing),
            RiderOrderList(status: OrderStatus.completed),
          ],
        ),
      ),
    );
  }
}
