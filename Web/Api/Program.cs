using Api.Chat;
using Api.DTO;
using Api.Interfaces;
using Api.Models;
using Api.Services;
using Api.Middleware;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using System.Text;
using System.Security.Claims;
using DotNetEnv;
using Microsoft.OpenApi.Models;
using System.Reflection;

// Load environment variables
Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Configure Kestrel for Cloud Run compatibility
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port) && int.TryParse(port, out int portNumber))
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{portNumber}");
}
else
{
    // Fallback for local development
    builder.WebHost.UseUrls("http://0.0.0.0:8080");
}

// Add environment variables configuration
builder.Configuration.AddEnvironmentVariables();

// Register security services
builder.Services.AddSecurityServices();

// Add services to the container.


//DB context
builder.Services.AddDbContext<DBContext>(option =>
{
    string connectionString;

    // Check if environment variables are available for database connection
    var dbServer = Environment.GetEnvironmentVariable("DB_SERVER");
    var dbPort = Environment.GetEnvironmentVariable("DB_PORT");
    var dbName = Environment.GetEnvironmentVariable("DB_NAME");
    var dbUsername = Environment.GetEnvironmentVariable("DB_USERNAME");
    var dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");

    if (!string.IsNullOrEmpty(dbServer) && !string.IsNullOrEmpty(dbName) &&
        !string.IsNullOrEmpty(dbUsername) && !string.IsNullOrEmpty(dbPassword))
    {
        // Use environment variables with fallback port
        var portToUse = !string.IsNullOrEmpty(dbPort) ? dbPort : "5432";
        connectionString = $"Server={dbServer};Port={portToUse};Database={dbName};Username={dbUsername};Password={dbPassword};";
        Console.WriteLine($"Using environment variables for DB connection. Server: {dbServer}, Port: {portToUse}, Database: {dbName}");
    }
    else
    {
        // Build connection string manually from individual environment variables or use hardcoded fallback
        // This avoids the ${} placeholder issue in appsettings.json
        var fallbackServer = Environment.GetEnvironmentVariable("DB_SERVER") ?? "lifepadi.cjkuw0skw142.us-east-1.rds.amazonaws.com";
        var fallbackPort = Environment.GetEnvironmentVariable("DB_PORT") ?? "5432";
        var fallbackDatabase = Environment.GetEnvironmentVariable("DB_NAME") ?? "lifepadi_db";
        var fallbackUsername = Environment.GetEnvironmentVariable("DB_USERNAME") ?? "postgres";
        var fallbackPassword = Environment.GetEnvironmentVariable("DB_PASSWORD") ?? "Esomchi92";

        connectionString = $"Server={fallbackServer};Port={fallbackPort};Database={fallbackDatabase};Username={fallbackUsername};Password={fallbackPassword};";
        Console.WriteLine($"Using fallback DB connection. Server: {fallbackServer}, Port: {fallbackPort}, Database: {fallbackDatabase}");
    }

    option.UseNpgsql(connectionString);
});

builder.Services.AddHttpClient<CustomerService>();
builder.Services.AddHttpClient<TransactionService>();

//SignalR
builder.Services.AddSignalR();

//Automaper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//jwt
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = !builder.Environment.IsDevelopment(); // Require HTTPS in production
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "LifePadi-API",
            ValidateAudience = true,
            ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "LifePadi-Client",
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero, // No clock skew tolerance for security
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                Environment.GetEnvironmentVariable("JWT_KEY") ?? builder.Configuration["Jwt:Key"]!)),
            RequireExpirationTime = true,
            RequireSignedTokens = true,
            // Map the role claim correctly
            RoleClaimType = ClaimTypes.Role,
            NameClaimType = ClaimTypes.NameIdentifier
        };

        // Enhanced JWT events for better error handling
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
                logger.LogWarning("JWT Authentication failed: {Exception}", context.Exception.Message);

                if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                {
                    context.Response.Headers.Append("Token-Expired", "true");
                }
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
                var userClaims = context.Principal?.Claims?.Select(c => $"{c.Type}: {c.Value}");
                logger.LogInformation("JWT Token validated successfully. Claims: {Claims}", string.Join(", ", userClaims ?? new string[0]));
                return Task.CompletedTask;
            },
            OnChallenge = context =>
            {
                var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
                logger.LogWarning("JWT Challenge triggered. AuthenticateFailure: {AuthenticateFailure}, Error: {Error}",
                    context.AuthenticateFailure?.Message, context.Error);

                context.HandleResponse();
                context.Response.StatusCode = 401;
                context.Response.ContentType = "application/json";
                var result = System.Text.Json.JsonSerializer.Serialize(new
                {
                    error = "You are not authorized to access this resource.",
                    details = context.Error ?? context.AuthenticateFailure?.Message
                });
                return context.Response.WriteAsync(result);
            },
            OnForbidden = context =>
            {
                var logger = context.HttpContext.RequestServices.GetRequiredService<ILogger<Program>>();
                logger.LogWarning("JWT Forbidden triggered for user: {User}", context.Principal?.Identity?.Name);

                context.Response.StatusCode = 403;
                context.Response.ContentType = "application/json";
                var result = System.Text.Json.JsonSerializer.Serialize(new { error = "You do not have permission to access this resource." });
                return context.Response.WriteAsync(result);
            }
        };
    });

// Add Authorization Policies
builder.Services.AddAuthorization(options =>
{
    // Role-based policies
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireRole("Admin"));

    options.AddPolicy("VendorOrAdmin", policy =>
        policy.RequireRole("Vendor", "Admin"));

    options.AddPolicy("CustomerOrVendor", policy =>
        policy.RequireRole("Customer", "Vendor"));

    options.AddPolicy("RiderOnly", policy =>
        policy.RequireRole("Rider"));

    options.AddPolicy("VendorOnly", policy =>
        policy.RequireRole("Vendor"));

    options.AddPolicy("CustomerOnly", policy =>
        policy.RequireRole("Customer"));

    // Combined policies for specific operations
    options.AddPolicy("CanManageOrders", policy =>
        policy.RequireRole("Customer", "Vendor", "Admin", "Rider"));

    options.AddPolicy("CanManageProducts", policy =>
        policy.RequireRole("Vendor", "Admin"));

    options.AddPolicy("CanManageDeliveries", policy =>
        policy.RequireRole("Rider", "Admin"));

    options.AddPolicy("CanManageFinancials", policy =>
        policy.RequireRole("Admin"));

    options.AddPolicy("CanViewReports", policy =>
        policy.RequireRole("Vendor", "Admin"));

    // Authenticated user policy (any logged-in user)
    options.AddPolicy("AuthenticatedUser", policy =>
        policy.RequireAuthenticatedUser());
});

//Firebase App Initialization
FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("lifepadi-24bfe-firebase.json")
});

//For Json Serializer
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
.AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());

// Register Repository Pattern infrastructure
builder.Services.AddScoped(typeof(IRepository<>), typeof(Api.Repositories.Repository<>));
builder.Services.AddScoped<IUnitOfWork, Api.Repositories.UnitOfWork>();

builder.Services.AddScoped<IUser, UserService>();
builder.Services.AddScoped<IVendor, VendorService>();
builder.Services.AddScoped<IRider, RiderService>();
builder.Services.AddScoped<ICustomer, CustomerService>();
builder.Services.AddScoped<IProduct, ProductService>();
builder.Services.AddScoped<ICategory, CategoryService>();
builder.Services.AddScoped<IAddress, AddressService>();
builder.Services.AddScoped<IService, ServiceService>();
builder.Services.AddScoped<IOrder, OrderService>();
builder.Services.AddScoped<IOrderItem, OrderItemService>();
builder.Services.AddScoped<ITransaction, TransactionService>();
builder.Services.AddScoped<IDelivery, DeliveryService>();
builder.Services.AddScoped<IVoucher, VoucherService>();
builder.Services.AddScoped<IVendorCategory, VendorCategoryService>();
builder.Services.AddScoped<IOtherService, OtherService>();
builder.Services.AddScoped<IEmailVerification, EmailVerificationService>();
builder.Services.AddScoped<IReview<ProductReviewDto>, ProductReviewService>();
builder.Services.AddScoped<IReview<VendorReviewDto>, VendorReviewService>();
builder.Services.AddScoped<IReview<RiderReviewDto>, RiderReviewService>();
builder.Services.AddScoped<IWallet, WalletService>();
builder.Services.AddScoped<IWalletDeposite, DepositeService>();
builder.Services.AddScoped<IWalletWithdrawal, WithdrawalService>();
builder.Services.AddScoped<IWalletNotification, WalletNotificationService>();
builder.Services.AddScoped<IFavourite, FavouriteService>();
builder.Services.AddScoped<ILogistic, LogisticService>();
builder.Services.AddScoped<ICustomerVoucher, CustomerVoucherService>();
builder.Services.AddScoped<IVoucherNotification, VoucherNotificationService>();
builder.Services.AddScoped<IFcmService, FcmService>();
builder.Services.AddScoped<IMessageService, MessageService>();
builder.Services.AddScoped<IUserIdProvider, CustomUserIdProvider>();
builder.Services.AddScoped<ICustomerSupport, CustomerSupportService>();
builder.Services.AddScoped<IDashboard, DashboardService>();
builder.Services.AddScoped<IAdmin, AdminService>();
builder.Services.AddScoped<IWebHookService, WebHookService>();


builder.Logging.ClearProviders();
builder.Logging.AddConsole();

//enable CORS
builder.Services.AddCors(c =>
{
    c.AddPolicy("SecureCorsPolicy", options => options
        .WithOrigins(
            Environment.GetEnvironmentVariable("FRONTEND_LOCAL_URL") ?? "http://localhost:5173",
            Environment.GetEnvironmentVariable("FRONTEND_REMOTE_URL") ?? "https://lifepadi.com",
            Environment.GetEnvironmentVariable("FRONTEND_REMOTE_SUBDOMAIN_URL") ?? "https://www.lifepadi.com"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
        .WithExposedHeaders("X-Rate-Limit-Remaining", "X-Rate-Limit-Reset"));
});


builder.Services.AddControllers();

// Add Swagger/OpenAPI services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "LifePadi API",
        Version = "v1.0",
        Description = "LifePadi - Multi-vendor marketplace API for connecting customers, vendors, and riders",
        Contact = new OpenApiContact
        {
            Name = "LifePadi Development Team",
            Email = "dev@lifepadi.com",
            Url = new Uri("https://lifepadi.com")
        },
        License = new OpenApiLicense
        {
            Name = "MIT License",
            Url = new Uri("https://opensource.org/licenses/MIT")
        }
    });

    // Include XML comments for better documentation
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

    // Add JWT authentication support to Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });

    // Enable annotations for better API documentation
    c.EnableAnnotations();

    // Group endpoints by controller
    c.TagActionsBy(api => new[] { api.GroupName ?? api.ActionDescriptor.RouteValues["controller"] });
    c.DocInclusionPredicate((name, api) => true);
});

// Note: Removed AddAWSLambdaHosting as we're deploying to Google Cloud Run





var app = builder.Build();


// Configure the HTTP request pipeline.

// Add global exception handling middleware (should be first)
app.UseGlobalExceptionHandling();

// Add request logging middleware
app.UseRequestLogging();

// Configure Swagger for development and production
app.UseSwagger(c =>
{
    c.RouteTemplate = "api-docs/{documentName}/swagger.json";
});

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/api-docs/v1/swagger.json", "LifePadi API v1.0");
    c.RoutePrefix = "api-docs";
    c.DocumentTitle = "LifePadi API Documentation";
    c.DisplayRequestDuration();
    c.EnableDeepLinking();
    c.EnableFilter();
    c.ShowExtensions();
    c.EnableValidator();
    c.DefaultModelsExpandDepth(2);
    c.DefaultModelRendering(Swashbuckle.AspNetCore.SwaggerUI.ModelRendering.Example);
});

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseHsts();
}

// Only use HTTPS redirection in development
// Cloud Run handles HTTPS termination at the load balancer
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.UseRouting();

// Use secure CORS policy
app.UseCors("SecureCorsPolicy");

app.MapHub<LocationHub>("/hubs/location");
app.MapHub<NotificationHub>("/hubs/notification");

app.MapHub<ChatHub>("/chatHub");


app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

// Add security headers
app.UseSecurityHeaders();

// Add rate limiting
app.UseRateLimiter();

app.Run();
