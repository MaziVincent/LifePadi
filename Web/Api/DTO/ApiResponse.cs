using System.Net;
using System.Text.Json.Serialization;

namespace Api.DTO
{
    /// <summary>
    /// Standardized API response wrapper for all API endpoints
    /// </summary>
    /// <typeparam name="T">The type of data being returned</typeparam>
    public class ApiResponse<T>
    {
        /// <summary>
        /// Indicates if the request was successful
        /// </summary>
        public bool Success { get; set; }

        /// <summary>
        /// The main data payload of the response
        /// </summary>
        public T? Data { get; set; }

        /// <summary>
        /// Human-readable message describing the result
        /// </summary>
        public string Message { get; set; } = string.Empty;

        /// <summary>
        /// Application-specific error code for programmatic handling
        /// </summary>
        public string? ErrorCode { get; set; }

        /// <summary>
        /// HTTP status code
        /// </summary>
        public int StatusCode { get; set; }

        /// <summary>
        /// Unique identifier for request tracking and debugging
        /// </summary>
        public string? CorrelationId { get; set; }

        /// <summary>
        /// Timestamp when the response was generated
        /// </summary>
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// Additional metadata (pagination info, etc.)
        /// </summary>
        public object? Metadata { get; set; }

        /// <summary>
        /// Validation errors (if any)
        /// </summary>
        public Dictionary<string, string[]>? ValidationErrors { get; set; }

        /// <summary>
        /// Creates a successful response
        /// </summary>
        public static ApiResponse<T> CreateSuccess(T data, string message = "Operation completed successfully", object? metadata = null)
        {
            return new ApiResponse<T>
            {
                Success = true,
                Data = data,
                Message = message,
                StatusCode = (int)HttpStatusCode.OK,
                Metadata = metadata
            };
        }

        /// <summary>
        /// Creates an error response
        /// </summary>
        public static ApiResponse<T> CreateError(string message, string? errorCode = null, HttpStatusCode statusCode = HttpStatusCode.BadRequest, Dictionary<string, string[]>? validationErrors = null)
        {
            return new ApiResponse<T>
            {
                Success = false,
                Message = message,
                ErrorCode = errorCode,
                StatusCode = (int)statusCode,
                ValidationErrors = validationErrors
            };
        }

        /// <summary>
        /// Creates a not found response
        /// </summary>
        public static ApiResponse<T> CreateNotFound(string message = "Resource not found")
        {
            return new ApiResponse<T>
            {
                Success = false,
                Message = message,
                ErrorCode = "RESOURCE_NOT_FOUND",
                StatusCode = (int)HttpStatusCode.NotFound
            };
        }

        /// <summary>
        /// Creates an unauthorized response
        /// </summary>
        public static ApiResponse<T> CreateUnauthorized(string message = "Unauthorized access")
        {
            return new ApiResponse<T>
            {
                Success = false,
                Message = message,
                ErrorCode = "UNAUTHORIZED",
                StatusCode = (int)HttpStatusCode.Unauthorized
            };
        }

        /// <summary>
        /// Creates a forbidden response
        /// </summary>
        public static ApiResponse<T> CreateForbidden(string message = "Access forbidden")
        {
            return new ApiResponse<T>
            {
                Success = false,
                Message = message,
                ErrorCode = "FORBIDDEN",
                StatusCode = (int)HttpStatusCode.Forbidden
            };
        }

        /// <summary>
        /// Creates a validation error response
        /// </summary>
        public static ApiResponse<T> CreateValidationError(Dictionary<string, string[]> validationErrors, string message = "Validation failed")
        {
            return new ApiResponse<T>
            {
                Success = false,
                Message = message,
                ErrorCode = "VALIDATION_ERROR",
                StatusCode = (int)HttpStatusCode.BadRequest,
                ValidationErrors = validationErrors
            };
        }
    }

    /// <summary>
    /// Non-generic API response for operations that don't return data
    /// </summary>
    public class ApiResponse : ApiResponse<object>
    {
        /// <summary>
        /// Creates a successful response without data
        /// </summary>
        public static ApiResponse CreateSuccess(string message = "Operation completed successfully")
        {
            return new ApiResponse
            {
                Success = true,
                Message = message,
                StatusCode = (int)HttpStatusCode.OK
            };
        }

        /// <summary>
        /// Creates an error response without data
        /// </summary>
        public static ApiResponse CreateError(string message, string? errorCode = null, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
        {
            return new ApiResponse
            {
                Success = false,
                Message = message,
                ErrorCode = errorCode,
                StatusCode = (int)statusCode
            };
        }
    }
}
