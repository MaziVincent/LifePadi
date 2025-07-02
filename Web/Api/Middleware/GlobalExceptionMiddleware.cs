using Api.DTO;
using Api.Exceptions;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace Api.Middleware
{
    /// <summary>
    /// Global exception handling middleware that converts exceptions to standardized API responses
    /// </summary>
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;
        private readonly IWebHostEnvironment _environment;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger, IWebHostEnvironment environment)
        {
            _next = next;
            _logger = logger;
            _environment = environment;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            // Generate correlation ID for tracking
            var correlationId = context.TraceIdentifier ?? Guid.NewGuid().ToString();

            // Log the exception with correlation ID
            _logger.LogError(exception, "Unhandled exception occurred. CorrelationId: {CorrelationId}", correlationId);

            // Create response based on exception type
            var response = CreateApiResponse(exception, correlationId);

            // Set response properties
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = response.StatusCode;

            // Serialize and write response
            var jsonResponse = JsonSerializer.Serialize(response, new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = !_environment.IsProduction()
            });

            await context.Response.WriteAsync(jsonResponse);
        }

        private ApiResponse<object> CreateApiResponse(Exception exception, string correlationId)
        {
            var response = new ApiResponse<object>
            {
                Success = false,
                CorrelationId = correlationId,
                Timestamp = DateTime.UtcNow
            }; switch (exception)
            {
                case BusinessException businessEx:
                    response.Message = businessEx.Message;
                    response.ErrorCode = businessEx.ErrorCode;
                    response.StatusCode = (int)businessEx.StatusCode;

                    if (businessEx is ValidationException validationEx)
                    {
                        response.ValidationErrors = validationEx.ValidationErrors;
                    }
                    break;

                case ArgumentNullException argNullEx:
                    response.Message = "Required parameter is missing.";
                    response.ErrorCode = "MISSING_PARAMETER";
                    response.StatusCode = (int)HttpStatusCode.BadRequest;

                    if (!_environment.IsProduction())
                    {
                        response.Message = $"Parameter '{argNullEx.ParamName}' is required.";
                    }
                    break;

                case ArgumentException argEx:
                    response.Message = "Invalid argument provided.";
                    response.ErrorCode = "INVALID_ARGUMENT";
                    response.StatusCode = (int)HttpStatusCode.BadRequest;

                    // Include argument details in development
                    if (!_environment.IsProduction())
                    {
                        response.Message = argEx.Message;
                    }
                    break;

                case InvalidOperationException invalidOpEx:
                    response.Message = "The requested operation is not valid in the current state.";
                    response.ErrorCode = "INVALID_OPERATION";
                    response.StatusCode = (int)HttpStatusCode.BadRequest;

                    if (!_environment.IsProduction())
                    {
                        response.Message = invalidOpEx.Message;
                    }
                    break;

                case System.UnauthorizedAccessException:
                    response.Message = "Unauthorized access.";
                    response.ErrorCode = "UNAUTHORIZED";
                    response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    break;

                case TimeoutException:
                    response.Message = "The operation timed out. Please try again.";
                    response.ErrorCode = "TIMEOUT";
                    response.StatusCode = (int)HttpStatusCode.RequestTimeout;
                    break;

                case TaskCanceledException when exception.InnerException is TimeoutException:
                    response.Message = "The request timed out. Please try again.";
                    response.ErrorCode = "REQUEST_TIMEOUT";
                    response.StatusCode = (int)HttpStatusCode.RequestTimeout;
                    break;

                case HttpRequestException httpEx:
                    response.Message = "External service is currently unavailable. Please try again later.";
                    response.ErrorCode = "EXTERNAL_SERVICE_UNAVAILABLE";
                    response.StatusCode = (int)HttpStatusCode.BadGateway;

                    if (!_environment.IsProduction())
                    {
                        response.Message = httpEx.Message;
                    }
                    break;

                default:
                    response.Message = "An unexpected error occurred. Please try again later.";
                    response.ErrorCode = "INTERNAL_SERVER_ERROR";
                    response.StatusCode = (int)HttpStatusCode.InternalServerError;

                    // Log full details for unexpected exceptions
                    _logger.LogError(exception, "Unexpected exception: {ExceptionType} - {Message}",
                        exception.GetType().Name, exception.Message);

                    // Include exception details in development
                    if (!_environment.IsProduction())
                    {
                        response.Message = exception.Message;
                        response.Metadata = new
                        {
                            ExceptionType = exception.GetType().Name,
                            StackTrace = exception.StackTrace
                        };
                    }
                    break;
            }

            return response;
        }
    }

    /// <summary>
    /// Extension method to register the global exception middleware
    /// </summary>
    public static class GlobalExceptionMiddlewareExtensions
    {
        public static IApplicationBuilder UseGlobalExceptionHandling(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<GlobalExceptionMiddleware>();
        }
    }
}
