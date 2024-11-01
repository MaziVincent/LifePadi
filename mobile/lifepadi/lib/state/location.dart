import 'package:geocoding/geocoding.dart' as geocoding;
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:location/location.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'location.g.dart';

@riverpod
class LocationInfo extends _$LocationInfo {
  @override
  Future<LocationDetails> build() async {
    return _getCurrentLocation();
  }

  Future<LocationDetails> _getCurrentLocation() async {
    final location = Location();

    bool serviceEnabled;
    PermissionStatus permissionGranted;

    // Check if location services are enabled
    serviceEnabled = await location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await location.requestService();
      if (!serviceEnabled) {
        throw const LocationServiceException('Location services are disabled');
      }
    }

    // Check location permissions
    permissionGranted = await location.hasPermission();
    if (permissionGranted == PermissionStatus.denied) {
      permissionGranted = await location.requestPermission();
      if (permissionGranted != PermissionStatus.granted) {
        throw const LocationPermissionException('Location permission denied');
      }
    }

    // Get current location
    final currentLocation = await location.getLocation();

    // Get address details using geocoding
    final placemarks = await geocoding.placemarkFromCoordinates(
      currentLocation.latitude!,
      currentLocation.longitude!,
    );

    if (placemarks.isEmpty) {
      throw const LocationDetailsException(
        'Could not determine location details',
      );
    }

    final placemark = placemarks.first;

    return LocationDetails(
      latitude: currentLocation.latitude!,
      longitude: currentLocation.longitude!,
      address: '${placemark.street}',
      city: '${placemark.locality}',
      state: '${placemark.administrativeArea}',
      country: '${placemark.country}',
      postalCode: '${placemark.postalCode}',
      sublocality: '${placemark.subLocality}',
    );
  }

  Future<void> refreshLocation() async {
    ref.invalidateSelf();
  }
}
