import 'package:dart_mappable/dart_mappable.dart';

part 'api_error_response.mapper.dart';

/// Represents an API v2 error response structure
@MappableClass()
class ApiErrorResponse with ApiErrorResponseMappable {
  const ApiErrorResponse({
    required this.success,
    this.message,
    this.errorCode,
    this.statusCode,
    this.correlationId,
    this.timestamp,
    this.metadata,
    this.validationErrors,
    this.data,
  });

  @MappableField(key: 'success')
  final bool success;

  @MappableField(key: 'message')
  final String? message;

  @MappableField(key: 'errorCode')
  final String? errorCode;

  @MappableField(key: 'statusCode')
  final int? statusCode;

  @MappableField(key: 'correlationId')
  final String? correlationId;

  @MappableField(key: 'timestamp')
  final String? timestamp;

  @MappableField(key: 'metadata')
  final Map<String, dynamic>? metadata;

  @MappableField(key: 'validationErrors')
  final List<ValidationError>? validationErrors;

  @MappableField(key: 'data')
  final dynamic data;

  static const fromMap = ApiErrorResponseMapper.fromMap;
  static const fromJson = ApiErrorResponseMapper.fromJson;

  /// Get user-friendly error message
  String get userFriendlyMessage {
    // If we have validation errors, format them nicely
    if (validationErrors != null && validationErrors!.isNotEmpty) {
      final errors = validationErrors!.map((e) => e.message).join(', ');
      return errors;
    }

    // Use the message field if available
    if (message != null && message!.isNotEmpty) {
      return message!;
    }

    // Fallback based on error code
    return _getMessageFromErrorCode(errorCode);
  }

  /// Get appropriate title based on error code
  String get errorTitle {
    return switch (errorCode?.toUpperCase()) {
      'UNAUTHORIZED' => 'Authentication Failed',
      'FORBIDDEN' => 'Access Denied',
      'VALIDATION_ERROR' => 'Invalid Input',
      'NOT_FOUND' => 'Not Found',
      'CONFLICT' => 'Conflict',
      'INTERNAL_SERVER_ERROR' => 'Server Error',
      'BAD_REQUEST' => 'Invalid Request',
      'PAYMENT_FAILED' => 'Payment Failed',
      'INSUFFICIENT_FUNDS' => 'Insufficient Funds',
      'NETWORK_ERROR' => 'Network Error',
      _ => 'An error occurred',
    };
  }

  String _getMessageFromErrorCode(String? code) {
    return switch (code?.toUpperCase()) {
      'UNAUTHORIZED' => 'Invalid email or password. Please check your credentials and try again.',
      'FORBIDDEN' => 'You do not have permission to perform this action.',
      'VALIDATION_ERROR' => 'Please check your input and try again.',
      'NOT_FOUND' => 'The requested resource was not found.',
      'CONFLICT' => 'This action conflicts with existing data.',
      'INTERNAL_SERVER_ERROR' => 'Something went wrong on our end. Please try again later.',
      'BAD_REQUEST' => 'Invalid request. Please check your input.',
      'PAYMENT_FAILED' => 'Payment could not be processed. Please try again.',
      'INSUFFICIENT_FUNDS' => 'Insufficient funds in your wallet.',
      'NETWORK_ERROR' => 'Please check your internet connection and try again.',
      _ => 'An unexpected error occurred. Please try again.',
    };
  }
}

/// Represents a validation error in the API response
@MappableClass()
class ValidationError with ValidationErrorMappable {
  const ValidationError({
    required this.field,
    required this.message,
  });

  @MappableField(key: 'field')
  final String field;

  @MappableField(key: 'message')
  final String message;

  static const fromMap = ValidationErrorMapper.fromMap;
  static const fromJson = ValidationErrorMapper.fromJson;
}
