import 'dart:async';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/state/location.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/location_utils.dart';
import 'package:lifepadi/widgets/widgets.dart';

class RiderDistanceAway extends ConsumerStatefulWidget {
  const RiderDistanceAway({
    super.key,
    required this.riderId,
  });

  final int riderId;

  @override
  ConsumerState<RiderDistanceAway> createState() => _RiderDistanceAwayState();
}

class _RiderDistanceAwayState extends ConsumerState<RiderDistanceAway>
    with LocationUtils {
  final urbanistStyle = GoogleFonts.urbanist(
    color: const Color(0xFF616161),
    fontSize: 12.05.sp,
    fontWeight: FontWeight.w500,
    letterSpacing: 0.17.r,
  );

  LatLng? riderLocation;
  StreamSubscription<RemoteMessage>? _messageSubscription;

  Future<void> setupRiderLocation() async {
    logger.d('[RDAway] Subscribing to rider ${widget.riderId} updates');
    await FirebaseMessaging.instance
        .subscribeToTopic('Tracking-${widget.riderId}');

    _messageSubscription =
        FirebaseMessaging.onMessage.listen((RemoteMessage message) {
      if (!mounted) return;

      final data = message.data;
      final latitude = double.tryParse(data['Latitude'].toString());
      final longitude = double.tryParse(data['Longitude'].toString());

      if (latitude == null || longitude == null) return;

      logger.d(
        '[Customer|RDAway] Rider ${widget.riderId} loc: $latitude, $longitude',
      );
      setState(() {
        riderLocation = LatLng(latitude, longitude);
      });
    });
  }

  @override
  void initState() {
    super.initState();
    setupRiderLocation();
  }

  @override
  void dispose() {
    FirebaseMessaging.instance
        .unsubscribeFromTopic('tracking-${widget.riderId}');
    _messageSubscription?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final currentLocation = ref.watch(currentLocationProvider);

    return currentLocation.when(
      data: (current) {
        var distanceAway = 0.0;
        if (riderLocation != null) {
          distanceAway = calculateDistance(current.latLng, riderLocation!);
        }
        if (distanceAway == 0.0) {
          return const SizedBox.shrink();
        }

        return Text(
          '${distanceAway.toStringAsFixed(1)}km away',
          style: urbanistStyle,
        );
      },
      error: (_, __) => const SizedBox.shrink(),
      loading: SizedBox.shrink,
    );
  }
}
