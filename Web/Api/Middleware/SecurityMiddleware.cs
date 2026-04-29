using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;

namespace Api.Middleware
{
    public static class SecurityMiddleware
    {
        public static IServiceCollection AddSecurityServices(this IServiceCollection services)
        {
            // Add rate limiting
            services.AddRateLimiter(options =>
            {
                // Global rate limiter
                options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
                    RateLimitPartition.GetFixedWindowLimiter(
                        partitionKey: context.User.Identity?.Name ?? context.Request.Headers.Host.ToString(),
                        factory: partition => new FixedWindowRateLimiterOptions
                        {
                            AutoReplenishment = true,
                            PermitLimit = 100,
                            Window = TimeSpan.FromMinutes(1)
                        }));

                // Specific endpoint rate limiters
                options.AddPolicy("login", httpContext =>
                    RateLimitPartition.GetFixedWindowLimiter(
                        partitionKey: httpContext.Request.Headers.Host.ToString(),
                        factory: partition => new FixedWindowRateLimiterOptions
                        {
                            AutoReplenishment = true,
                            PermitLimit = 5,
                            Window = TimeSpan.FromMinutes(1)
                        }));

                options.OnRejected = async (context, token) =>
                {
                    context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                    await context.HttpContext.Response.WriteAsJsonAsync(new
                    {
                        error = "Too many requests. Please try again later."
                    }, token);
                };
            });

            // Add CORS with secure configuration
            services.AddCors(options =>
            {
                options.AddPolicy("SecureCorsPolicy", builder =>
                {
                    builder.WithOrigins(
                        Environment.GetEnvironmentVariable("FRONTEND_LOCAL_URL") ?? "http://localhost:5173",
                        Environment.GetEnvironmentVariable("FRONTEND_REMOTE_URL") ?? "https://lifepadi.com",
                        Environment.GetEnvironmentVariable("FRONTEND_REMOTE_SUBDOMAIN_URL") ?? "https://www.lifepadi.com",
                        Environment.GetEnvironmentVariable("YONKO_URL") ?? "https://www.yonkomktp.com",
                        "https://www.lifepadi.com"
                    )
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithExposedHeaders("X-Rate-Limit-Remaining", "X-Rate-Limit-Reset", "X-Total-Count", "X-Total-Pages", "X-Current-Page", "X-Page-Size");
                });
            });

            return services;
        }

        public static IApplicationBuilder UseSecurityHeaders(this IApplicationBuilder app)
        {
            return app.Use(async (context, next) =>
            {
                // Check if this is an API request (vs web request)
                var isApiRequest = context.Request.Path.StartsWithSegments("/api");
                
                // Add security headers
                context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
                context.Response.Headers.Append("X-Frame-Options", "DENY");
                context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");
                context.Response.Headers.Append("Referrer-Policy", "strict-origin-when-cross-origin");

                // More relaxed CSP for API endpoints to allow testing tools
                if (isApiRequest)
                {
                    context.Response.Headers.Append("Content-Security-Policy",
                        "default-src 'self'; " +
                        "script-src 'self'; " +
                        "style-src 'self'; " +
                        "img-src 'self' data: https:; " +
                        "font-src 'self' data:; " +
                        "connect-src 'self' https:; " +
                        "frame-src 'none'; " +
                        "media-src 'self'; " +
                        "object-src 'none'; " +
                        "base-uri 'self'; " +
                        "form-action 'self'; " +
                        "frame-ancestors 'none';");
                }
                else
                {
                    // Enhanced Content Security Policy for web requests
                    context.Response.Headers.Append("Content-Security-Policy",
                        "default-src 'self'; " +
                        "script-src 'self' https://maps.googleapis.com; " +
                        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                        "img-src 'self' data: https: https://res.cloudinary.com https://maps.googleapis.com https://maps.gstatic.com; " +
                        "font-src 'self' data: https://fonts.gstatic.com; " +
                        "connect-src 'self' https://api.paystack.co https://v3.api.termii.com https://maps.googleapis.com https://maps.gstatic.com; " +
                        "frame-src 'self' https://checkout.paystack.com; " +
                        "media-src 'self'; " +
                        "object-src 'none'; " +
                        "base-uri 'self'; " +
                        "form-action 'self'; " +
                        "frame-ancestors 'none'; " +
                        "upgrade-insecure-requests;");
                }

                // Enhanced Permissions Policy
                context.Response.Headers.Append("Permissions-Policy",
                    "accelerometer=(), " +
                    "camera=(), " +
                    "geolocation=(self), " +
                    "gyroscope=(), " +
                    "magnetometer=(), " +
                    "microphone=(), " +
                    "payment=(self), " +
                    "usb=(), " +
                    "interest-cohort=()");

                // Enhanced HSTS
                context.Response.Headers.Append("Strict-Transport-Security",
                    "max-age=31536000; includeSubDomains; preload");

                // Additional security headers
                context.Response.Headers.Append("X-Permitted-Cross-Domain-Policies", "none");
                
                // More relaxed cross-origin policies for API endpoints
                if (isApiRequest)
                {
                    context.Response.Headers.Append("Cross-Origin-Embedder-Policy", "unsafe-none");
                    context.Response.Headers.Append("Cross-Origin-Opener-Policy", "unsafe-none");
                    context.Response.Headers.Append("Cross-Origin-Resource-Policy", "cross-origin");
                }
                else
                {
                    context.Response.Headers.Append("Cross-Origin-Embedder-Policy", "require-corp");
                    context.Response.Headers.Append("Cross-Origin-Opener-Policy", "same-origin");
                    context.Response.Headers.Append("Cross-Origin-Resource-Policy", "same-origin");
                }

                await next();
            });
        }
    }
}