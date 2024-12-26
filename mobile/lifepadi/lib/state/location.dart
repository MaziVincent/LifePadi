import 'package:dio/dio.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/state/auth_controller.dart';
import 'package:lifepadi/state/client.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/extensions.dart';
import 'package:lifepadi/utils/helpers.dart';
import 'package:lifepadi/utils/location_utils.dart';
import 'package:location/location.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'location.g.dart';

/// Get the current location of the user
@riverpod
class CurrentLocation extends _$CurrentLocation with LocationUtils {
  @override
  Future<LocationDetails> build() async {
    return _currentLocation();
  }

  Future<LocationDetails> _currentLocation() async {
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

    return locationDetailsFromLatLng(
      LatLng(currentLocation.latitude!, currentLocation.longitude!),
    );
  }

  Future<void> refreshLocation() async {
    ref.invalidateSelf();
  }
}

/// Get a list of locations for the current user
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
  // FIXME: Remove this when default location issue is resolved
  data.firstOrNull?['isDefault'] = true;

  ref.cache();
  return data.map(LocationDetailsMapper.fromMap).toList();
}

/// Store a new location
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

/// Get a single location by its ID
@riverpod
FutureOr<LocationDetails> location(Ref ref, {required int id}) async {
  final client = ref.watch(dioProvider());
  final response = await client.get<JsonMap>('/address/get/$id');

  if (response.data == null) {
    throw const ServerErrorException('No data retur`ned from the server');
  }

  return LocationDetailsMapper.fromMap(response.data!);
}

/// Update an existing location
@riverpod
FutureOr<LocationDetails> updateLocation(
  Ref ref, {
  required LocationDetails location,
}) async {
  final client = ref.watch(dioProvider());
  final requestData = location.toMap();

  final response = await client.put<JsonMap>(
    '/address/update/${location.id}',
    data: FormData.fromMap(requestData),
  );

  if (response.data == null) {
    throw const ServerErrorException('No data returned from the server');
  }

  final updatedLocation = LocationDetailsMapper.fromMap(response.data!);

  // Invalidate the locations provider to refresh the list
  ref.invalidate(locationsProvider);

  return updatedLocation;
}

/// Delete a location
@riverpod
Future<void> deleteLocation(Ref ref, {required int id}) async {
  final client = ref.watch(dioProvider());
  await client.delete<dynamic>('/address/delete/$id');

  // Invalidate the locations provider to refresh the list
  ref.invalidate(locationsProvider);
}

final pickupLocationProvider = StateProvider<LocationDetails?>((ref) => null);

final dropoffLocationProvider = StateProvider<LocationDetails?>((ref) => null);
