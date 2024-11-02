import 'dart:async';

import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/widgets/widgets.dart';
import 'package:location/location.dart';

class TrackOrderMapPage extends StatefulWidget {
  const TrackOrderMapPage({super.key, required this.id});

  final int id;

  @override
  State<TrackOrderMapPage> createState() => _TrackOrderMapPageState();
}

class _TrackOrderMapPageState extends State<TrackOrderMapPage> {
  final Completer<GoogleMapController> _controller = Completer();
  StreamSubscription<LocationData>? locationSubscription;

  static const LatLng sourceLocation = LatLng(37.4220541, -122.0853242);
  static const LatLng destination = LatLng(37.4116103, -122.0713127);

  List<LatLng> polylineCoordinates = [];
  LocationData? currentLocation;

  BitmapDescriptor sourceIcon = BitmapDescriptor.defaultMarker;
  BitmapDescriptor destinationIcon = BitmapDescriptor.defaultMarker;
  BitmapDescriptor currentLocationIcon = BitmapDescriptor.defaultMarker;

  Future<void> getCurrentLocation() async {
    final location = Location();

    try {
      final currentLoc = await location.getLocation();
      if (mounted) {
        setState(() {
          currentLocation = currentLoc;
        });
      }

      final googleMapController = await _controller.future;

      locationSubscription = location.onLocationChanged.listen((newLocation) {
        if (!mounted) return;

        setState(() {
          currentLocation = newLocation;
        });

        googleMapController
            .animateCamera(
          CameraUpdate.newCameraPosition(
            CameraPosition(
              target: LatLng(newLocation.latitude!, newLocation.longitude!),
              zoom: 13.5,
            ),
          ),
        )
            .catchError((dynamic error) {
          logger.e('Map controller error', error: error);
        });
      });
    } catch (e) {
      logger.e('Location error', error: e);
    }
  }

  Future<void> getPolyPoints() async {
    final polylinePoints = PolylinePoints();

    final result = await polylinePoints.getRouteBetweenCoordinates(
      request: PolylineRequest(
        origin: PointLatLng(sourceLocation.latitude, sourceLocation.longitude),
        destination: PointLatLng(destination.latitude, destination.longitude),
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
    sourceIcon = BitmapDescriptor.defaultMarkerWithHue(
      BitmapDescriptor.hueBlue,
    );

    destinationIcon = BitmapDescriptor.defaultMarkerWithHue(
      BitmapDescriptor.hueMagenta,
    );

    currentLocationIcon = BitmapDescriptor.defaultMarkerWithHue(
      BitmapDescriptor.hueRed,
    );

    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    getCurrentLocation();
    setCustomMarkerIcon();
    getPolyPoints();
  }

  @override
  void dispose() {
    locationSubscription?.cancel();
    _controller.future.then(
      (controller) => controller.dispose(),
      onError: (dynamic e) => logger.e('Controller dispose error', error: e),
    );
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: MyAppBar(title: 'Track Order #${widget.id}'),
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
                  markerId: const MarkerId('currentLocation'),
                  position: LatLng(
                    currentLocation!.latitude!,
                    currentLocation!.longitude!,
                  ),
                  icon: currentLocationIcon,
                ),
                Marker(
                  markerId: const MarkerId('source'),
                  position: sourceLocation,
                  icon: sourceIcon,
                ),
                Marker(
                  markerId: const MarkerId('destination'),
                  position: destination,
                  icon: destinationIcon,
                ),
              },
              onMapCreated: _controller.complete,
            ),
    );
  }
}
