using System.Diagnostics;

namespace Api.Middleware
{
    /// <summary>
    /// Middleware to add correlation IDs and structured logging to all requests
    /// </summary>
    public class RequestLoggingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggingMiddleware> _logger;

        public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Generate correlation ID if not present
            var correlationId = context.TraceIdentifier ?? Guid.NewGuid().ToString();
            context.Items["CorrelationId"] = correlationId;

            // Add correlation ID to response headers
            context.Response.Headers["X-Correlation-ID"] = correlationId;

            var stopwatch = Stopwatch.StartNew();
            var request = context.Request;

            // Log request start
            _logger.LogInformation(
                "Request started: {Method} {Path} {QueryString} - CorrelationId: {CorrelationId}",
                request.Method,
                request.Path,
                request.QueryString,
                correlationId);

            try
            {
                await _next(context);
            }
            finally
            {
                stopwatch.Stop();
                var response = context.Response;

                // Log request completion
                _logger.LogInformation(
                    "Request completed: {Method} {Path} {StatusCode} - Duration: {Duration}ms - CorrelationId: {CorrelationId}",
                    request.Method,
                    request.Path,
                    response.StatusCode,
                    stopwatch.ElapsedMilliseconds,
                    correlationId);

                // Log slow requests as warnings
                if (stopwatch.ElapsedMilliseconds > 5000) // 5 seconds
                {
                    _logger.LogWarning(
                        "Slow request detected: {Method} {Path} took {Duration}ms - CorrelationId: {CorrelationId}",
                        request.Method,
                        request.Path,
                        stopwatch.ElapsedMilliseconds,
                        correlationId);
                }
            }
        }
    }

    /// <summary>
    /// Extension method to register the request logging middleware
    /// </summary>
    public static class RequestLoggingMiddlewareExtensions
    {
        public static IApplicationBuilder UseRequestLogging(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestLoggingMiddleware>();
        }
    }

    /// <summary>
    /// Helper extension for HttpContext to easily get correlation ID
    /// </summary>
    public static class HttpContextExtensions
    {
        public static string GetCorrelationId(this HttpContext context)
        {
            return context.Items["CorrelationId"]?.ToString() ?? context.TraceIdentifier ?? Guid.NewGuid().ToString();
        }
    }
}
