import 'dart:async';

import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:location/location.dart';
import 'package:signalr_netcore/signalr_client.dart';

class TrackOrderMapPage extends StatefulWidget {
  const TrackOrderMapPage({
    super.key,
    required this.riderId,
    required this.orderId,
    required this.destination,
  });

  final String orderId;
  final int riderId;
  final LatLng destination;

  @override
  State<TrackOrderMapPage> createState() => _TrackOrderMapPageState();
}

class _TrackOrderMapPageState extends State<TrackOrderMapPage> {
  final Completer<GoogleMapController> _controller = Completer();
  LocationData? riderLocation;
  BitmapDescriptor destinationIcon = BitmapDescriptor.defaultMarker;
  BitmapDescriptor riderLocationIcon = BitmapDescriptor.defaultMarker;
  HubConnection? hubConnection;
  List<LatLng> polylineCoordinates = [];

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
            riderLocation = LocationData.fromMap({
              'latitude': latitude,
              'longitude': longitude,
            });
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
        origin:
            PointLatLng(riderLocation!.latitude!, riderLocation!.longitude!),
        destination: PointLatLng(
          widget.destination.latitude,
          widget.destination.longitude,
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

  void setCustomMarkerIcon() {
    destinationIcon = BitmapDescriptor.defaultMarkerWithHue(
      BitmapDescriptor.hueBlue,
    );

    riderLocationIcon = BitmapDescriptor.defaultMarkerWithHue(
      BitmapDescriptor.hueRed,
    );

    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    setCustomMarkerIcon();
    setupSignalR();
  }

  @override
  void dispose() {
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
      appBar: MyAppBar(title: 'Track Order #${widget.orderId}'),
      body: riderLocation == null
          ? const GreenyLoadingWheel()
          : GoogleMap(
              initialCameraPosition: CameraPosition(
                target: LatLng(
                  riderLocation!.latitude!,
                  riderLocation!.longitude!,
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
                    riderLocation!.latitude!,
                    riderLocation!.longitude!,
                  ),
                  icon: riderLocationIcon,
                ),
                Marker(
                  markerId: const MarkerId('destination'),
                  position: LatLng(
                    widget.destination.latitude,
                    widget.destination.longitude,
                  ),
                  icon: destinationIcon,
                ),
              },
              onMapCreated: _controller.complete,
            ),
    );
  }
}
