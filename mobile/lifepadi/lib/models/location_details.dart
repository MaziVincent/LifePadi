import 'package:dart_mappable/dart_mappable.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

part 'location_details.mapper.dart';

@MappableClass()
class LocationDetails {
  LocationDetails({
    this.id,
    required this.latitude,
    required this.longitude,
    required this.address,
    required this.city,
    required this.state,
    this.country = 'Nigeria',
    required this.postalCode,
    required this.sublocality,
    required this.localGovernmentArea,
  });

  @MappableField(key: 'Id')
  final int? id;
  @MappableField(key: 'Latitude')
  final double latitude;
  @MappableField(key: 'Longitude')
  final double longitude;
  @MappableField(key: 'Name')
  final String address;
  @MappableField(key: 'City')
  final String city;
  @MappableField(key: 'State')
  final String state;
  @MappableField(key: 'PostalCode')
  final String postalCode;
  @MappableField(key: 'Town')
  final String sublocality;
  final String country;
  @MappableField(key: 'LocalGovt')
  final String localGovernmentArea;

  LatLng get latLng => LatLng(latitude, longitude);

  /// Returns the full address of the location
  String get fullAddress => '$address, $sublocality, $city, $state, $country';

  /// Returns the short address of the location
  String get shortAddress =>
      '$address${sublocality.isNotEmpty ? ', $sublocality' : ''}, $city';
}
