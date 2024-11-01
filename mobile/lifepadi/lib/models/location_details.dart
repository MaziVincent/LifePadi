import 'package:google_maps_flutter/google_maps_flutter.dart';

class LocationDetails {
  LocationDetails({
    required this.latitude,
    required this.longitude,
    required this.address,
    required this.city,
    required this.state,
    required this.country,
    required this.postalCode,
  });
  final double latitude;
  final double longitude;
  final String address;
  final String city;
  final String state;
  final String country;
  final String postalCode;

  LatLng get latLng => LatLng(latitude, longitude);
}
