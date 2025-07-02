using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace Api.Authorization
{
    /// <summary>
    /// Ensures that users can only access their own resources or admins can access any resource
    /// </summary>
    public class ResourceOwnerOrAdminAttribute : Attribute, IAuthorizationFilter
    {
        private readonly string _userIdParameterName;

        public ResourceOwnerOrAdminAttribute(string userIdParameterName = "id")
        {
            _userIdParameterName = userIdParameterName;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;
            
            // Check if user is authenticated
            if (!user.Identity?.IsAuthenticated ?? true)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            // Admin can access any resource
            if (user.IsInRole("Admin"))
            {
                return;
            }

            // Get the current user's ID from claims
            var currentUserId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(currentUserId))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            // Get the requested resource user ID from route parameters
            var requestedUserId = context.RouteData.Values[_userIdParameterName]?.ToString();
            if (string.IsNullOrEmpty(requestedUserId))
            {
                context.Result = new BadRequestObjectResult(new { error = "User ID parameter is required" });
                return;
            }

            // Check if the current user is trying to access their own resource
            if (currentUserId != requestedUserId)
            {
                context.Result = new ForbidResult();
                return;
            }
        }
    }

    /// <summary>
    /// Ensures that vendors can only access their own resources
    /// </summary>
    public class VendorResourceOwnerAttribute : Attribute, IAuthorizationFilter
    {
        private readonly string _vendorIdParameterName;

        public VendorResourceOwnerAttribute(string vendorIdParameterName = "vendorId")
        {
            _vendorIdParameterName = vendorIdParameterName;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;
            
            // Check if user is authenticated
            if (!user.Identity?.IsAuthenticated ?? true)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            // Admin can access any resource
            if (user.IsInRole("Admin"))
            {
                return;
            }

            // Only vendors can use this attribute
            if (!user.IsInRole("Vendor"))
            {
                context.Result = new ForbidResult();
                return;
            }

            // Get the current user's ID from claims
            var currentUserId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(currentUserId))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            // Get the requested vendor ID from route parameters
            var requestedVendorId = context.RouteData.Values[_vendorIdParameterName]?.ToString();
            if (string.IsNullOrEmpty(requestedVendorId))
            {
                context.Result = new BadRequestObjectResult(new { error = "Vendor ID parameter is required" });
                return;
            }

            // Check if the current vendor is trying to access their own resource
            if (currentUserId != requestedVendorId)
            {
                context.Result = new ForbidResult();
                return;
            }
        }
    }

    /// <summary>
    /// Ensures that riders can only access their assigned deliveries
    /// </summary>
    public class RiderResourceAccessAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;
            
            // Check if user is authenticated
            if (!user.Identity?.IsAuthenticated ?? true)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            // Admin can access any resource
            if (user.IsInRole("Admin"))
            {
                return;
            }

            // Only riders can use this attribute
            if (!user.IsInRole("Rider"))
            {
                context.Result = new ForbidResult();
                return;
            }

            // Additional logic for checking rider-specific resources would go here
            // For now, we just ensure the user is a rider
        }
    }

    /// <summary>
    /// Rate limiting attribute for sensitive endpoints
    /// </summary>
    public class RateLimitAttribute : Attribute, IActionFilter
    {
        private readonly string _policyName;

        public RateLimitAttribute(string policyName = "default")
        {
            _policyName = policyName;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            // Rate limiting logic would be implemented here
            // For now, this is a placeholder for future implementation
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // Post-action logic if needed
        }
    }

    /// <summary>
    /// Audit logging attribute for sensitive operations
    /// </summary>
    public class AuditLogAttribute : Attribute, IActionFilter
    {
        private readonly string _operation;

        public AuditLogAttribute(string operation)
        {
            _operation = operation;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            // Log the action being performed
            var user = context.HttpContext.User;
            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = user.FindFirst(ClaimTypes.Role)?.Value;
            
            // TODO: Implement proper audit logging
            Console.WriteLine($"AUDIT: User {userId} ({userRole}) performing {_operation} at {DateTime.UtcNow}");
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // Log the result of the action
            var statusCode = context.HttpContext.Response.StatusCode;
            Console.WriteLine($"AUDIT: Operation {_operation} completed with status {statusCode}");
        }
    }
}
