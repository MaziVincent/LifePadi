import 'package:dio/dio.dart';
import 'package:geocoding/geocoding.dart' as geocoding;
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/cache_for.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:location/location.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'location.g.dart';

@riverpod
class CurrentLocation extends _$CurrentLocation {
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
      localGovernmentArea: '${placemark.subAdministrativeArea}',
    );
  }

  Future<void> refreshLocation() async {
    ref.invalidateSelf();
  }
}

@riverpod
FutureOr<List<LocationDetails>> locations(Ref ref) async {
  final client = ref.watch(dioProvider());
  final user = ref.read(authControllerProvider);
  final userId = user.maybeWhen(
    data: (user) => user.id,
    orElse: () => null,
  );
  if (userId == null) {
    return [];
  }
  final response =
      await client.get<List<dynamic>>('/customer/addresses/$userId');

  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  final data = List<JsonMap>.from(response.data!);

  ref.cache();
  return data.map(LocationDetailsMapper.fromMap).toList();
}

@riverpod
FutureOr<LocationDetails> storeLocation(
  Ref ref, {
  required LocationDetails location,
}) async {
  final client = ref.watch(dioProvider());
  final user = ref.read(authControllerProvider);
  final userId = user.maybeWhen(
    data: (user) => user.id,
    orElse: () => null,
  );
  if (userId == null) {
    throw const UnauthorizedException('No user found');
  }
  final requestData = location.toMap()
    ..addAll({'UserId': userId})
    ..remove('Id');
  final response = await client.post<JsonMap>(
    '/address/create',
    data: FormData.fromMap(requestData),
  );

  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  final newLocation = LocationDetailsMapper.fromMap(response.data!);

  // Invalidate the locations provider to refresh the list
  ref.invalidate(locationsProvider);

  return newLocation;
}
