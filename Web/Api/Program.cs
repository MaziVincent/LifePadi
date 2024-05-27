<<<<<<< HEAD
using Api.Chat;
using Api.DTO;
using Api.Interfaces;
using Api.Models;
using Api.Services;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
=======
using Api.Interfaces;
using Api.Models;
using Api.Services;
>>>>>>> ee48634 (done with service, category and product controllers.)
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Serialization;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


//DB context
builder.Services.AddDbContext<DBContext>(option => option.UseNpgsql(
    builder.Configuration.GetConnectionString("LifePadiDBConnection")
    ));

<<<<<<< HEAD
builder.Services.AddHttpClient<CustomerService>();
builder.Services.AddHttpClient<TransactionService>();

//SignalR
builder.Services.AddSignalR();
=======
builder.Services.AddHttpClient();
>>>>>>> 7f9ad44 (done with payment and voucher)

//Automaper
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

//jwt
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

//Firebase App Initialization
 FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("lifepadi-17e8c-firebase.json")
});

//For Json Serializer
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
.AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());


builder.Services.AddScoped<IUser, UserService>();
builder.Services.AddScoped<IVendor, VendorService>();
<<<<<<< HEAD
<<<<<<< HEAD
builder.Services.AddScoped<IRider, RiderService>();
=======
//builder.Services.AddScoped<IRider, RiderService>();
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
builder.Services.AddScoped<IRider, RiderService>();
>>>>>>> 28d4101 (finished with rider and order)
builder.Services.AddScoped<ICustomer, CustomerService>();
builder.Services.AddScoped<IProduct, ProductService>();
builder.Services.AddScoped<ICategory, CategoryService>();
builder.Services.AddScoped<IAddress, AddressService>();
builder.Services.AddScoped<IService,  ServiceService>();
<<<<<<< HEAD
<<<<<<< HEAD
builder.Services.AddScoped<IOrder, OrderService>();
builder.Services.AddScoped<IOrderItem, OrderItemService>();
<<<<<<< HEAD
<<<<<<< HEAD
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


builder.Logging.ClearProviders();
builder.Logging.AddConsole();
=======
//builder.Services.AddScoped<ITransaction, TransactionService>();
//builder.Services.AddScoped<IOrder, OrderService>();
=======
builder.Services.AddScoped<IOrder, OrderService>();
>>>>>>> 28d4101 (finished with rider and order)
//builder.Services.AddScoped<IOrderItem, OrderItemService>();
=======
>>>>>>> 4641615 (finished with delivery service and controller)
//builder.Services.AddScoped<ITransaction, TransactionService>();
=======
builder.Services.AddScoped<ITransaction, TransactionService>();
>>>>>>> 7f9ad44 (done with payment and voucher)
builder.Services.AddScoped<IDelivery, DeliveryService>();
builder.Services.AddScoped<IVoucher, VoucherService>();


>>>>>>> ee48634 (done with service, category and product controllers.)

//enable CORS
builder.Services.AddCors(c =>
{
<<<<<<< HEAD
    c.AddPolicy("AllowAllOrigin", options => options.WithOrigins("https://lifepadi.com", "http://localhost:5173", "https://www.lifepadi.com")
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());
    
=======
    c.AddPolicy("AllowAllOrigin", options => options.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyHeader());
>>>>>>> ee48634 (done with service, category and product controllers.)
});


builder.Services.AddControllers();

builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);

var app = builder.Build();


// Configure the HTTP request pipeline.

app.UseHttpsRedirection();
app.UseRouting();


app.UseCors("AllowAllOrigin");

app.MapHub<LocationHub>("/hubs/location");
app.MapHub<NotificationHub>("/hubs/notification");

app.MapHub<ChatHub>("/chatHub");


app.UseAuthentication();

app.UseCors("AllowAllOrigin");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
