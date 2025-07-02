import 'package:dart_mappable/dart_mappable.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

part 'location_details.mapper.dart';

@MappableClass()
class LocationDetails with LocationDetailsMappable {
  LocationDetails({
    this.id,
    required this.latitude,
    required this.longitude,
    required this.address,
    required this.city,
    required this.state,
    this.country = 'Nigeria',
    this.postalCode,
    this.sublocality,
    this.localGovernmentArea,
    this.isDefault = false,
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
  final String? postalCode;
  @MappableField(key: 'Town')
  final String? sublocality;
  final String country;
  @MappableField(key: 'LocalGovt')
  final String? localGovernmentArea;
  @MappableField(key: 'DefaultAddress')
  final bool isDefault;

  LatLng get latLng => LatLng(latitude, longitude);
}
