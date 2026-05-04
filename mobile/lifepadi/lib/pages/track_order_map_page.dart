import 'dart:async';

import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/order.dart';
import 'package:lifepadi/state/orders.dart';
import 'package:lifepadi/utils/assets.gen.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:signalr_netcore/signalr_client.dart';

class TrackOrderMapPage extends ConsumerStatefulWidget {
  const TrackOrderMapPage({
    super.key,
    required this.riderId,
    required this.orderId,
    required this.order,
  });

  final int orderId;
  final int riderId;
  final Order order;

  @override
  ConsumerState<TrackOrderMapPage> createState() => _TrackOrderMapPageState();
}

class _TrackOrderMapPageState extends ConsumerState<TrackOrderMapPage> {
  final Completer<GoogleMapController> _controller = Completer();
  LatLng? riderLocation;
  BitmapDescriptor destinationIcon = BitmapDescriptor.defaultMarker;
  BitmapDescriptor riderLocationIcon = BitmapDescriptor.defaultMarker;
  HubConnection? hubConnection;
  List<LatLng> polylineCoordinates = [];
  Timer? _orderRefreshTimer;

  Future<void> setupPeriodicOrderDetailsUpdate() async {
    if (riderLocation == null &&
        widget.order.rider?.latitude != null &&
        widget.order.rider?.longitude != null) {
      setState(() {
        riderLocation = LatLng(
          widget.order.rider!.latitude!,
          widget.order.rider!.longitude!,
        );
      });
      return;
    }

    // Initial fetch
    await refreshOrderDetails();

    // Setup periodic refresh every 10 minutes
    _orderRefreshTimer = Timer.periodic(
      10.minutes,
      (_) => refreshOrderDetails(),
    );
  }

  Future<void> refreshOrderDetails() async {
    ref.invalidate(orderProvider(widget.orderId));
    final order = await ref.read(orderProvider(widget.orderId).future);
    if (order.rider?.latitude != null && order.rider?.longitude != null) {
      setState(() {
        riderLocation = LatLng(order.rider!.latitude!, order.rider!.longitude!);
      });
    }
  }

  Future<void> setupSignalR() async {
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
          final latitude = args[0]! as double;
          final longitude = args[1]! as double;

          logger.d('[Customer] LocationUpdated: $latitude, $longitude');
          setState(() {
            riderLocation = LatLng(latitude, longitude);
            if (polylineCoordinates.isEmpty) {
              getPolyPoints();
            }
          });

          final googleMapController = await _controller.future;
          await googleMapController.animateCamera(
            CameraUpdate.newCameraPosition(
              CameraPosition(
                target: LatLng(latitude, longitude),
                zoom: 15,
              ),
            ),
          );
        }
      });
    } catch (e) {
      logger.e('SignalR connection error', error: e);
    }
  }

  Future<void> getPolyPoints() async {
    final polylinePoints = PolylinePoints();

    final result = await polylinePoints.getRouteBetweenCoordinates(
      request: PolylineRequest(
        origin: PointLatLng(riderLocation!.latitude, riderLocation!.longitude),
        destination: PointLatLng(
          widget.order.deliveryLocation!.latitude,
          widget.order.deliveryLocation!.longitude,
        ),
        mode: TravelMode.driving,
      ),
      googleApiKey: kGoogleMapsApiKey,
    );

    if (result.points.isNotEmpty) {
      for (final point in result.points) {
        polylineCoordinates.add(LatLng(point.latitude, point.longitude));
      }
      setState(() {});
    }
  }

  Future<void> setCustomMarkerIcon() async {
    destinationIcon = BitmapDescriptor.defaultMarkerWithHue(
      BitmapDescriptor.hueBlue,
    );

    riderLocationIcon = await BitmapDescriptor.asset(
      const ImageConfiguration(size: Size(32, 48)),
      Assets.icons.riderPin.path,
    );

    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    setCustomMarkerIcon();
    setupPeriodicOrderDetailsUpdate();
    setupSignalR();
  }

  @override
  void dispose() {
    _orderRefreshTimer?.cancel();
    hubConnection
        ?.invoke('UnsubscribeFromRider', args: [widget.riderId.toString()]);
    hubConnection?.stop();
    _controller.future.then(
      (controller) => controller.dispose(),
      onError: (dynamic e) => logger.e('Controller dispose error', error: e),
    );
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(title: 'Track Order #${widget.order.orderId}'),
      body: riderLocation == null
          ? const GreenyLoadingWheel()
          : GoogleMap(
              initialCameraPosition: CameraPosition(
                target: LatLng(
                  riderLocation!.latitude,
                  riderLocation!.longitude,
                ),
                zoom: 15,
              ),
              polylines: {
                Polyline(
                  polylineId: const PolylineId('route'),
                  points: polylineCoordinates,
                  color: kDarkPrimaryColor,
                  width: 6,
                ),
              },
              markers: {
                Marker(
                  markerId: const MarkerId('riderLocation'),
                  position: LatLng(
                    riderLocation!.latitude,
                    riderLocation!.longitude,
                  ),
                  icon: riderLocationIcon,
                ),
                Marker(
                  markerId: const MarkerId('destination'),
                  position: LatLng(
                    widget.order.deliveryLocation!.latitude,
                    widget.order.deliveryLocation!.longitude,
                  ),
                  icon: destinationIcon,
                ),
              },
              onMapCreated: _controller.complete,
            ),
    );
  }
}
