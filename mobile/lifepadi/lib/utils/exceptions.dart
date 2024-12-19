/// Base exception class for all app exceptions
abstract class AppException implements Exception {
  const AppException(this.message);
  final String message;
}

/// Exception thrown when a request returns 401.
class UnauthorizedException extends AppException {
  const UnauthorizedException(super.message);
}

/// Exception thrown when a request returns 500.
class ServerErrorException extends AppException {
  const ServerErrorException(super.message);
}

/// Phone number verification failed.
class PhoneVerificationFailedException extends AppException {
  const PhoneVerificationFailedException(super.message);
}

/// Exception thrown when there is error in location service.
class LocationServiceException extends AppException {
  const LocationServiceException(super.message);
}

/// Exception thrown when location permission is denied.
class LocationPermissionException extends AppException {
  const LocationPermissionException(super.message);
}

/// Exception thrown when location details could not be fetched.
class LocationDetailsException extends AppException {
  const LocationDetailsException(super.message);
}

/// Exception thrown when a discount code is invalid.
class InvalidDiscountCodeException extends AppException {
  const InvalidDiscountCodeException(super.message);
}

/// Exception thrown when payment fails.
class PaymentFailedException extends AppException {
  const PaymentFailedException(super.message);
}

/// Exception thrown when biometric authentication fails.
class BiometricAuthenticationException extends AppException {
  const BiometricAuthenticationException(super.message);
}
