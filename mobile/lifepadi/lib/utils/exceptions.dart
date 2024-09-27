/// Exception thrown when a request is unauthorized.
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
