import 'dart:async';

import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:go_router/go_router.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:iconsax_plus/iconsax_plus.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/router/routes.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:location/location.dart';
import 'package:signalr_netcore/signalr_client.dart';

class RiderPage extends ConsumerStatefulWidget {
  const RiderPage({super.key});

  @override
  ConsumerState<RiderPage> createState() => _RiderPageState();
}

class _RiderPageState extends ConsumerState<RiderPage> {
  StreamSubscription<LocationData>? locationSubscription;
  HubConnection? hubConnection;
  Location location = Location();
  DateTime? lastUpdatedAt;

  /// Update rider location with a PUT request
  ///
  /// This is used to update the rider's location in the database
  /// once the app is opened and then every 10 minutes.
  Future<void> updateRiderLocationWithPutRequest({
    required int riderId,
    required double latitude,
    required double longitude,
  }) async {
    if (lastUpdatedAt != null &&
        DateTime.now().difference(lastUpdatedAt!) <
            const Duration(minutes: 10)) {
      return;
    }

    final client = ref.read(dioProvider());
    await client.put<dynamic>(
      '/rider/updateLocation/$riderId',
      data: {
        'RiderId': riderId,
        'Latitude': latitude,
        'Longitude': longitude,
      },
    );
  }

  /// Setup location tracking with SignalR
  Future<void> setupLocationTracking() async {
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

    // Setup SignalR
    hubConnection = HubConnectionBuilder()
        .withUrl(kSignalRLocationUrl)
        .withAutomaticReconnect()
        .build();

    try {
      await hubConnection?.start();

      // Start location tracking
      locationSubscription =
          location.onLocationChanged.listen((locationData) async {
        if (locationData.latitude == null || locationData.longitude == null) {
          return;
        }
        final rider = await ref.read(authControllerProvider.future);
        logger.d(
          '[Rider ${rider.id}#] (${locationData.latitude}, ${locationData.longitude})',
        );
        updateRiderLocationWithPutRequest(
          riderId: rider.id,
          latitude: locationData.latitude!,
          longitude: locationData.longitude!,
        ).ignore();

        await hubConnection?.invoke(
          'UpdateLocation',
          args: [
            rider.id.toString(),
            locationData.latitude! as Object,
            locationData.longitude! as Object,
          ],
        ).catchError((dynamic error) {
          logger.e('Error sending location update', error: error);
          return error;
        });
      });
    } catch (e) {
      logger.e('SignalR connection error', error: e);
    }
  }

  @override
  void initState() {
    super.initState();
    setupLocationTracking();
  }

  @override
  void dispose() {
    locationSubscription?.cancel();
    hubConnection?.stop();
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
