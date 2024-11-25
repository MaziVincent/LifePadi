import 'dart:math' show pi, sin, cos, sqrt, atan2;

import 'package:google_maps_flutter/google_maps_flutter.dart';

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
}
