import 'dart:math' show pi, sin, cos, sqrt, atan2;

import 'package:dio/dio.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:lifepadi/models/location_details.dart';
import 'package:lifepadi/utils/constants.dart';
import 'package:lifepadi/utils/exceptions.dart';
import 'package:lifepadi/utils/helpers.dart';

mixin LocationUtils {
  /// Convert degrees to radians
  double _getRadians(double degrees) => degrees * pi / 180;

  /// Use the Haversine formula to calculate distance in km
  /// between two points
  double calculateDistance(LatLng start, LatLng end) {
    const earthRadiusKm = 6371;
    final startLatRadians = _getRadians(start.latitude);
    final endLatRadians = _getRadians(end.latitude);
    final latitudeDiffRadians = _getRadians(end.latitude - start.latitude);
    final longitudeDiffRadians = _getRadians(end.longitude - start.longitude);

    final haversineA =
        sin(latitudeDiffRadians / 2) * sin(latitudeDiffRadians / 2) +
            cos(startLatRadians) *
                cos(endLatRadians) *
                sin(longitudeDiffRadians / 2) *
                sin(longitudeDiffRadians / 2);

    final greatCircleDistance =
        2 * atan2(sqrt(haversineA), sqrt(1 - haversineA));
    return earthRadiusKm * greatCircleDistance;
  }

  /// Get location details from a latitude and longitude
  /// using the Google maps geocoding API
  Future<LocationDetails> locationDetailsFromLatLng(
    LatLng position,
  ) async {
    final dio = Dio();
    const url = 'https://maps.googleapis.com/maps/api/geocode/json';
    final queryParams = {
      'latlng': '${position.latitude},${position.longitude}',
      'key': kGoogleMapsApiKey,
    };

    logger.d('Fetching location details from: $url with params: $queryParams');

    try {
      final response = await dio.get<JsonMap>(
        url,
        queryParameters: queryParams,
      );

      final data = response.data;
      if (data == null) {
        logger.e('Location API returned null data');
        throw const LocationDetailsException('Location API returned null data');
      }

      logger.d('Location API status: ${data['status']}');

      if (data['status'] == 'OK' && (data['results'] as List).isNotEmpty) {
        final result = (data['results'] as List)[0] as JsonMap;
        final addressComponents =
            List<JsonMap>.from(result['address_components'] as List);

        String? city,
            state,
            country,
            postalCode,
            sublocality,
            localGovernmentArea;

        for (final component in addressComponents) {
          final types = component['types'] as List;

          if (types.contains('locality')) {
            city = component['long_name'] as String?;
          } else if (types.contains('administrative_area_level_1')) {
            state = component['long_name'] as String?;
          } else if (types.contains('country')) {
            country = component['long_name'] as String?;
          } else if (types.contains('postal_code')) {
            postalCode = component['long_name'] as String?;
          } else if (types.contains('sublocality')) {
            sublocality = component['long_name'] as String?;
          } else if (types.contains('administrative_area_level_2')) {
            localGovernmentArea = component['long_name'] as String?;
          }
        }

        return LocationDetails(
          latitude: position.latitude,
          longitude: position.longitude,
          address: result['formatted_address'] as String,
          city: city ?? '',
          state: state ?? '',
          country: country ?? '',
          postalCode: postalCode ?? '',
          sublocality: sublocality ?? '',
          localGovernmentArea: localGovernmentArea ?? '',
        );
      } else {
        final errorMessage =
            'Could not determine location details. Status: ${data['status'] ?? 'unknown'}';
        logger.e(
          errorMessage,
          error: data['error_message'] ?? 'No specific error message',
        );
        throw LocationDetailsException(errorMessage);
      }
    } catch (e) {
      const errorMessage = 'Error fetching location details';
      logger.e(errorMessage, error: e);
      if (e is DioException) {
        final dioError = e;
        final statusCode = dioError.response?.statusCode;
        final responseData = dioError.response?.data;
        logger.e(
          'DioException: Status code: $statusCode, Response data: $responseData',
        );
        throw LocationDetailsException('Network error: ${dioError.message}');
      }
      throw LocationDetailsException(e.toString());
    }
  }
}
