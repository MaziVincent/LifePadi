import 'dart:async';

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
    required this.destinationLatitude,
    required this.destinationLongitude,
  });

  final String orderId;
  final int riderId;
  final double destinationLatitude;
  final double destinationLongitude;

  @override
  State<TrackOrderMapPage> createState() => _TrackOrderMapPageState();
}

class _TrackOrderMapPageState extends State<TrackOrderMapPage> {
  final Completer<GoogleMapController> _controller = Completer();
  LocationData? currentLocation;
  BitmapDescriptor destinationIcon = BitmapDescriptor.defaultMarker;
  BitmapDescriptor currentLocationIcon = BitmapDescriptor.defaultMarker;
  HubConnection? hubConnection;

  Future<void> setupSignalR() async {
    hubConnection = HubConnectionBuilder()
        .withUrl(kSignalRLocationUrl)
        .withAutomaticReconnect()
        .build();

    try {
      await hubConnection?.start();
      await hubConnection
          ?.invoke('SubscribeToRider', args: [widget.riderId.toString()]);

      hubConnection?.on('LocationUpdated', (List<Object?>? args) async {
        if (args != null && args.isNotEmpty && mounted) {
          final latitude = args[0]! as double;
          final longitude = args[1]! as double;
          final riderId = int.tryParse(args[2]!.toString());

          if (riderId != widget.riderId) return;

          logger.d('[Customer] LocationUpdated: $latitude, $longitude');
          setState(() {
            currentLocation = LocationData.fromMap({
              'latitude': latitude,
              'longitude': longitude,
            });
          });

          final googleMapController = await _controller.future;
          await googleMapController.animateCamera(
            CameraUpdate.newCameraPosition(
              CameraPosition(
                target: LatLng(latitude, longitude),
                zoom: 13.5,
              ),
            ),
          );
        }
      });
    } catch (e) {
      logger.e('SignalR connection error', error: e);
    }
  }

  void setCustomMarkerIcon() {
    destinationIcon = BitmapDescriptor.defaultMarkerWithHue(
      BitmapDescriptor.hueBlue,
    );

    currentLocationIcon = BitmapDescriptor.defaultMarkerWithHue(
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
      body: currentLocation == null
          ? const GreenyLoadingWheel()
          : GoogleMap(
              initialCameraPosition: CameraPosition(
                target: LatLng(
                  currentLocation!.latitude!,
                  currentLocation!.longitude!,
                ),
                zoom: 13.5,
              ),
              markers: {
                Marker(
                  markerId: const MarkerId('currentLocation'),
                  position: LatLng(
                    currentLocation!.latitude!,
                    currentLocation!.longitude!,
                  ),
                  icon: currentLocationIcon,
                ),
                Marker(
                  markerId: const MarkerId('destination'),
                  position: LatLng(
                    widget.destinationLatitude,
                    widget.destinationLongitude,
                  ),
                  icon: destinationIcon,
                ),
              },
              onMapCreated: _controller.complete,
            ),
    );
  }
}
