using System.Net;

namespace Api.Exceptions
{
    /// <summary>
    /// Base exception for all business logic exceptions
    /// </summary>
    public abstract class BusinessException : Exception
    {
        public string ErrorCode { get; }
        public HttpStatusCode StatusCode { get; }

        protected BusinessException(string message, string errorCode, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
            : base(message)
        {
            ErrorCode = errorCode;
            StatusCode = statusCode;
        }

        protected BusinessException(string message, string errorCode, Exception innerException, HttpStatusCode statusCode = HttpStatusCode.BadRequest)
            : base(message, innerException)
        {
            ErrorCode = errorCode;
            StatusCode = statusCode;
        }
    }

    /// <summary>
    /// Exception for when a requested resource is not found
    /// </summary>
    public class ResourceNotFoundException : BusinessException
    {
        public ResourceNotFoundException(string resourceName, object resourceId)
            : base($"{resourceName} with ID '{resourceId}' was not found.", "RESOURCE_NOT_FOUND", HttpStatusCode.NotFound)
        {
        }

        public ResourceNotFoundException(string message)
            : base(message, "RESOURCE_NOT_FOUND", HttpStatusCode.NotFound)
        {
        }
    }

    /// <summary>
    /// Exception for validation errors
    /// </summary>
    public class ValidationException : BusinessException
    {
        public Dictionary<string, string[]> ValidationErrors { get; }

        public ValidationException(string message, Dictionary<string, string[]> validationErrors)
            : base(message, "VALIDATION_ERROR", HttpStatusCode.BadRequest)
        {
            ValidationErrors = validationErrors;
        }

        public ValidationException(Dictionary<string, string[]> validationErrors)
            : base("One or more validation errors occurred.", "VALIDATION_ERROR", HttpStatusCode.BadRequest)
        {
            ValidationErrors = validationErrors;
        }

        public ValidationException(string message)
            : base(message, "VALIDATION_ERROR", HttpStatusCode.BadRequest)
        {
            ValidationErrors = new Dictionary<string, string[]>();
        }
    }

    /// <summary>
    /// Exception for business rule violations
    /// </summary>
    public class BusinessRuleException : BusinessException
    {
        public BusinessRuleException(string message, string errorCode = "BUSINESS_RULE_VIOLATION")
            : base(message, errorCode, HttpStatusCode.BadRequest)
        {
        }
    }

    /// <summary>
    /// Exception for unauthorized access attempts
    /// </summary>
    public class UnauthorizedAccessException : BusinessException
    {
        public UnauthorizedAccessException(string message = "Unauthorized access")
            : base(message, "UNAUTHORIZED", HttpStatusCode.Unauthorized)
        {
        }
    }

    /// <summary>
    /// Exception for forbidden operations
    /// </summary>
    public class ForbiddenException : BusinessException
    {
        public ForbiddenException(string message = "Access to this resource is forbidden")
            : base(message, "FORBIDDEN", HttpStatusCode.Forbidden)
        {
        }
    }

    /// <summary>
    /// Exception for when a resource already exists
    /// </summary>
    public class ResourceExistsException : BusinessException
    {
        public ResourceExistsException(string resourceName, object identifier)
            : base($"{resourceName} with identifier '{identifier}' already exists.", "RESOURCE_EXISTS", HttpStatusCode.Conflict)
        {
        }

        public ResourceExistsException(string message)
            : base(message, "RESOURCE_EXISTS", HttpStatusCode.Conflict)
        {
        }
    }

    /// <summary>
    /// Exception for external service failures
    /// </summary>
    public class ExternalServiceException : BusinessException
    {
        public string ServiceName { get; }

        public ExternalServiceException(string serviceName, string message)
            : base($"External service '{serviceName}' error: {message}", "EXTERNAL_SERVICE_ERROR", HttpStatusCode.BadGateway)
        {
            ServiceName = serviceName;
        }

        public ExternalServiceException(string serviceName, string message, Exception innerException)
            : base($"External service '{serviceName}' error: {message}", "EXTERNAL_SERVICE_ERROR", innerException, HttpStatusCode.BadGateway)
        {
            ServiceName = serviceName;
        }
    }

    /// <summary>
    /// Exception for database operation failures
    /// </summary>
    public class DatabaseException : BusinessException
    {
        public DatabaseException(string message)
            : base(message, "DATABASE_ERROR", HttpStatusCode.InternalServerError)
        {
        }

        public DatabaseException(string message, Exception innerException)
            : base(message, "DATABASE_ERROR", innerException, HttpStatusCode.InternalServerError)
        {
        }
    }

    /// <summary>
    /// Exception for payment processing failures
    /// </summary>
    public class PaymentException : BusinessException
    {
        public PaymentException(string message)
            : base(message, "PAYMENT_ERROR", HttpStatusCode.BadRequest)
        {
        }

        public PaymentException(string message, Exception innerException)
            : base(message, "PAYMENT_ERROR", innerException, HttpStatusCode.BadRequest)
        {
        }
    }

    /// <summary>
    /// Exception for insufficient wallet balance
    /// </summary>
    public class InsufficientBalanceException : BusinessException
    {
        public decimal RequiredAmount { get; }
        public decimal AvailableAmount { get; }

        public InsufficientBalanceException(decimal requiredAmount, decimal availableAmount)
            : base($"Insufficient balance. Required: {requiredAmount:C}, Available: {availableAmount:C}", "INSUFFICIENT_BALANCE", HttpStatusCode.BadRequest)
        {
            RequiredAmount = requiredAmount;
            AvailableAmount = availableAmount;
        }
    }
}
