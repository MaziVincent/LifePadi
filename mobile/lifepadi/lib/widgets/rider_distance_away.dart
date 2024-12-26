import 'dart:async';

import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/state/location.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/location_utils.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:signalr_netcore/signalr_client.dart';

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
  LatLng? riderLocation;
  HubConnection? hubConnection;

  Future<void> setupRiderLocation() async {
    hubConnection = HubConnectionBuilder()
        .withUrl(kSignalRLocationUrl)
        .withAutomaticReconnect(
      retryDelays: const [0, 100, 200, 300, 400, 500, 1000, 2000, 4000],
    ).build();

    try {
      await hubConnection?.start();
      await hubConnection
          ?.invoke('SubscribeToRider', args: [widget.riderId.toString()]);

      hubConnection?.on('LocationUpdated', (List<Object?>? args) async {
        if (args != null && args.isNotEmpty && mounted) {
          logger.i('[Customer|RDA]: $args');
          final latitude = args[0]! as double;
          final longitude = args[1]! as double;

          logger.d('[Customer] LocationUpdated: $latitude, $longitude');
          setState(() {
            riderLocation = LatLng(latitude, longitude);
          });
        }
      });
    } catch (e) {
      logger.e('SignalR connection error', error: e);
    }
  }

  @override
  void initState() {
    super.initState();
    setupRiderLocation();
  }

  @override
  void dispose() {
    hubConnection
        ?.invoke('UnsubscribeFromRider', args: [widget.riderId.toString()]);
    hubConnection?.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final currentLocation =
        ref.read(currentLocationProvider.notifier).currentLatLng();
    final urbanistStyle = GoogleFonts.urbanist(
      color: const Color(0xFF616161),
      fontSize: 12.05.sp,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.17.r,
    );

    return FutureBuilder<LatLng>(
      future: currentLocation,
      builder: (context, snapshot) {
        if (!snapshot.hasData || riderLocation == null) {
          return const SizedBox.shrink();
        }

        final currentLatLng = snapshot.data!;
        final distance = calculateDistance(
          currentLatLng,
          riderLocation!,
        );

        return Text(
          '${distance.toStringAsFixed(2)} km away',
          style: urbanistStyle,
        );
      },
    );
  }
}
