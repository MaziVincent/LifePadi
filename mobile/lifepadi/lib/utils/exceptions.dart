/// Exception thrown when a request returns 401.
class UnauthorizedException implements Exception {
  const UnauthorizedException(this.message);
  final String message;
}

/// Exception thrown when a request returns 500.
class ServerErrorException implements Exception {
  const ServerErrorException(this.message);
  final String message;
}

/// Phone number verification failed.
class PhoneVerificationFailedException implements Exception {
  const PhoneVerificationFailedException(this.message);
  final String message;
}

/// Exception thrown when there is error in location service.
class LocationServiceException implements Exception {
  const LocationServiceException(this.message);
  final String message;
}

/// Exception thrown when location permission is denied.
class LocationPermissionException implements Exception {
  const LocationPermissionException(this.message);
  final String message;
}

/// Exception thrown when location details could not be fetched.
class LocationDetailsException implements Exception {
  const LocationDetailsException(this.message);
  final String message;
}

/// Exception thrown when a discount code is invalid.
class InvalidDiscountCodeException implements Exception {
  const InvalidDiscountCodeException(this.message);
  final String message;
}

/// Exception thrown when payment fails.
class PaymentFailedException implements Exception {
  const PaymentFailedException(this.message);
  final String message;
}
