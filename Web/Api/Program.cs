using Api.Interfaces;
using Api.Models;
using Api.Services;
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

builder.Services.AddHttpClient();

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

//For Json Serializer
builder.Services.AddControllersWithViews().AddNewtonsoftJson(options =>
options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
.AddNewtonsoftJson(options => options.SerializerSettings.ContractResolver = new DefaultContractResolver());


builder.Services.AddScoped<IUser, UserService>();
builder.Services.AddScoped<IVendor, VendorService>();
builder.Services.AddScoped<IRider, RiderService>();
builder.Services.AddScoped<ICustomer, CustomerService>();
builder.Services.AddScoped<IProduct, ProductService>();
builder.Services.AddScoped<ICategory, CategoryService>();
builder.Services.AddScoped<IAddress, AddressService>();
builder.Services.AddScoped<IService,  ServiceService>();
builder.Services.AddScoped<IOrder, OrderService>();
builder.Services.AddScoped<IOrderItem, OrderItemService>();
builder.Services.AddScoped<ITransaction, TransactionService>();
builder.Services.AddScoped<IDelivery, DeliveryService>();
builder.Services.AddScoped<IVoucher, VoucherService>();



//enable CORS
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowAllOrigin", options => options.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyHeader());
});


builder.Services.AddControllers();

builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);

var app = builder.Build();


// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors("AllowAllOrigin");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
