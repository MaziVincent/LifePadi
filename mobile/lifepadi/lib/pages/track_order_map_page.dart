import 'dart:async';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:location/location.dart';

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
  StreamSubscription<RemoteMessage>? _messageSubscription;

  Future<void> setupLocationTracking() async {
    await FirebaseMessaging.instance
        .subscribeToTopic('tracking-${widget.riderId}');

    _messageSubscription =
        FirebaseMessaging.onMessage.listen((RemoteMessage message) async {
      logger.d('[Customer] LocationUpdated lis: ${message.data}');
      if (!mounted) return;

      final data = message.data;
      final latitude = double.tryParse(data['Latitude'].toString());
      final longitude = double.tryParse(data['Longitude'].toString());

      if (latitude == null || longitude == null) return;

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
    });
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
    setupLocationTracking();
  }

  @override
  void dispose() {
    FirebaseMessaging.instance
        .unsubscribeFromTopic('tracking-${widget.riderId}');
    _messageSubscription?.cancel();
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
