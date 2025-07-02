# LifePadi API Developer Onboarding Guide

Welcome to the LifePadi API development team! This guide will help you get up and running quickly with our API development environment.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Development Environment Setup](#development-environment-setup)
3. [Project Structure](#project-structure)
4. [Development Workflow](#development-workflow)
5. [Testing Guidelines](#testing-guidelines)
6. [Code Standards](#code-standards)
7. [Deployment Process](#deployment-process)
8. [Tools & Resources](#tools--resources)
9. [Getting Help](#getting-help)

---

## Prerequisites

### Required Software

- **.NET 9.0 SDK** or later
- **PostgreSQL 14+** for database
- **Redis 6+** for caching
- **Git** for version control
- **Docker** for containerization
- **Visual Studio Code** or **Visual Studio 2022**

### Recommended Extensions (VS Code)

- C# Dev Kit
- REST Client
- GitLens
- Docker
- Thunder Client (for API testing)

### Accounts & Access

- GitHub access to LifePadi repositories
- Development database credentials
- Staging environment access
- Postman team workspace

---

## Development Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/lifepadi/api.git
cd lifepadi-api
```

### 2. Install Dependencies

```bash
# Restore NuGet packages
dotnet restore

# Install development tools
dotnet tool install --global dotnet-ef
dotnet tool install --global dotnet-aspnet-codegenerator
```

### 3. Environment Configuration

#### Create Local Environment File

```bash
cp appsettings.example.json appsettings.Development.json
```

#### Configure Database Connection

```json
{
	"ConnectionStrings": {
		"LifePadiDBConnection": "Server=localhost;Port=5432;Database=lifepadi_dev;Username=your_username;Password=your_password;"
	},
	"JWT": {
		"SecretKey": "your-256-bit-development-secret-key-here-must-be-at-least-32-characters-long",
		"Issuer": "LifePadi-Dev",
		"Audience": "LifePadi-Users-Dev",
		"ExpirationHours": 1
	}
}
```

#### Set Environment Variables

```bash
# Create .env file
echo "DB_SERVER=localhost" >> .env
echo "DB_PORT=5432" >> .env
echo "DB_NAME=lifepadi_dev" >> .env
echo "DB_USERNAME=your_username" >> .env
echo "DB_PASSWORD=your_password" >> .env
```

### 4. Database Setup

```bash
# Create database
createdb lifepadi_dev

# Run migrations
dotnet ef database update

# Seed development data
dotnet run --seed-data
```

### 5. Start Development Server

```bash
# Standard run
dotnet run

# With hot reload
dotnet watch run

# The API will be available at:
# - HTTPS: https://localhost:7216
# - HTTP: http://localhost:5216
# - Swagger UI: https://localhost:7216/api-docs
```

---

## Project Structure

```
LifePadi.Api/
├── Controllers/              # API controllers
│   ├── AuthController.cs
│   ├── ProductController.cs
│   └── ...
├── Models/                   # Entity models
│   ├── User.cs
│   ├── Product.cs
│   └── ...
├── DTO/                      # Data Transfer Objects
│   ├── ProductDto.cs
│   ├── UserDto.cs
│   └── ...
├── Services/                 # Business logic services
│   ├── Interfaces/
│   └── Implementations/
├── Repositories/             # Data access layer
│   ├── Interfaces/
│   └── Implementations/
├── Middleware/               # Custom middleware
│   ├── GlobalExceptionMiddleware.cs
│   └── RequestLoggingMiddleware.cs
├── Exceptions/               # Custom exceptions
├── Helpers/                  # Utility classes
├── Validation/               # Input validation
├── Migrations/               # EF Core migrations
├── Scripts/                  # Database and setup scripts
├── Tests/                    # Test projects
│   ├── UnitTests/
│   ├── IntegrationTests/
│   └── TestUtils/
└── Docs/                     # Documentation
    ├── API_USAGE_EXAMPLES.md
    ├── TROUBLESHOOTING_FAQ.md
    └── ...
```

### Key Architectural Patterns

#### Repository Pattern

```csharp
// Generic repository interface
public interface IRepository<T> where T : class
{
    Task<T> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);
}

// Unit of Work pattern
public interface IUnitOfWork : IDisposable
{
    IRepository<User> Users { get; }
    IRepository<Product> Products { get; }
    Task<int> SaveChangesAsync();
}
```

#### Service Layer Pattern

```csharp
public interface IProductService
{
    Task<ProductDto> GetProductAsync(int id);
    Task<ProductDto> CreateProductAsync(CreateProductDto dto);
    Task<ProductDto> UpdateProductAsync(int id, UpdateProductDto dto);
    Task DeleteProductAsync(int id);
}
```

#### Global Exception Handling

```csharp
// Custom business exceptions
public class BusinessException : Exception
{
    public string ErrorCode { get; }
    public BusinessException(string code, string message) : base(message)
    {
        ErrorCode = code;
    }
}

// Standardized API responses
public class ApiResponse<T>
{
    public bool Success { get; set; }
    public T Data { get; set; }
    public string Message { get; set; }
    public DateTime Timestamp { get; set; }
}
```

---

## Development Workflow

### 1. Feature Development Process

#### Branch Strategy

```bash
# Create feature branch from develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# Work on your feature...

# Push and create pull request
git push origin feature/your-feature-name
```

#### Commit Message Convention

```
type(scope): description

Examples:
feat(auth): add JWT refresh token functionality
fix(orders): resolve null reference in order processing
docs(api): update authentication documentation
test(products): add unit tests for product service
```

### 2. Code Review Process

1. **Create Pull Request** with descriptive title and details
2. **Self-review** your changes before requesting review
3. **Address feedback** promptly and thoroughly
4. **Squash and merge** after approval

### 3. Testing Requirements

- **Unit tests** for all business logic
- **Integration tests** for API endpoints
- **Minimum 80% code coverage**
- **All tests must pass** before merging

---

## Testing Guidelines

### Unit Testing

```csharp
[TestClass]
public class ProductServiceTests
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<IRepository<Product>> _mockProductRepo;
    private readonly ProductService _productService;

    [TestInitialize]
    public void Setup()
    {
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _mockProductRepo = new Mock<IRepository<Product>>();
        _mockUnitOfWork.Setup(x => x.Products).Returns(_mockProductRepo.Object);
        _productService = new ProductService(_mockUnitOfWork.Object);
    }

    [TestMethod]
    public async Task GetProductAsync_ValidId_ReturnsProduct()
    {
        // Arrange
        var productId = 1;
        var expectedProduct = new Product { Id = productId, Name = "Test Product" };
        _mockProductRepo.Setup(x => x.GetByIdAsync(productId))
                       .ReturnsAsync(expectedProduct);

        // Act
        var result = await _productService.GetProductAsync(productId);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(expectedProduct.Name, result.Name);
    }
}
```

### Integration Testing

```csharp
[TestClass]
public class ProductControllerIntegrationTests : TestBase
{
    [TestMethod]
    public async Task GetProducts_ReturnsOkResult()
    {
        // Arrange
        using var client = CreateAuthenticatedClient();

        // Act
        var response = await client.GetAsync("/api/products");

        // Assert
        response.EnsureSuccessStatusCode();
        var content = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<ApiResponse<List<ProductDto>>>(content);
        Assert.IsTrue(result.Success);
    }
}
```

### Test Data Management

```csharp
public class TestDataBuilder
{
    public static Product CreateValidProduct()
    {
        return new Product
        {
            Name = "Test Product",
            Description = "Test Description",
            Price = 10.99m,
            CategoryId = 1,
            VendorId = 1,
            IsAvailable = true
        };
    }
}
```

---

## Code Standards

### Naming Conventions

- **PascalCase**: Classes, methods, properties, public fields
- **camelCase**: Local variables, private fields, parameters
- **UPPER_CASE**: Constants
- **Descriptive names**: Avoid abbreviations

### Code Organization

```csharp
// Controller example
[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductController> _logger;

    public ProductController(
        IProductService productService,
        ILogger<ProductController> logger)
    {
        _productService = productService;
        _logger = logger;
    }

    /// <summary>
    /// Retrieves all products with pagination
    /// </summary>
    [HttpGet]
    [SwaggerOperation(Summary = "Get products", Description = "Retrieves paginated list of products")]
    public async Task<ActionResult<ApiResponse<List<ProductDto>>>> GetProducts(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        using var scope = _logger.BeginScope(new Dictionary<string, object>
        {
            ["Action"] = nameof(GetProducts),
            ["PageNumber"] = pageNumber,
            ["PageSize"] = pageSize
        });

        try
        {
            var products = await _productService.GetProductsAsync(pageNumber, pageSize);
            return Ok(ApiResponse<List<ProductDto>>.Success(products, "Products retrieved successfully"));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving products");
            throw;
        }
    }
}
```

### Error Handling

```csharp
// Service layer error handling
public async Task<ProductDto> GetProductAsync(int id)
{
    if (id <= 0)
        throw new ValidationException("Product ID must be positive");

    var product = await _unitOfWork.Products.GetByIdAsync(id);
    if (product == null)
        throw new ResourceNotFoundException($"Product with ID {id} not found");

    return _mapper.Map<ProductDto>(product);
}
```

---

## Deployment Process

### Development Environment

```bash
# Build and test
dotnet build
dotnet test

# Run locally
dotnet run
```

### Staging Deployment

```bash
# Deploy to staging
git push origin develop

# Automatic deployment via GitHub Actions
# Check deployment status at: https://github.com/lifepadi/api/actions
```

### Production Deployment

```bash
# Create release branch
git checkout -b release/v1.x.x

# Update version numbers
# Create pull request to main
# After approval and merge, deployment is automatic
```

### Docker Deployment

```dockerfile
# Build image
docker build -t lifepadi-api:latest .

# Run container
docker run -p 8080:80 -e ASPNETCORE_ENVIRONMENT=Development lifepadi-api:latest
```

---

## Tools & Resources

### Development Tools

- **Swagger UI**: `https://localhost:7216/api-docs`
- **Database Admin**: pgAdmin or DataGrip
- **API Testing**: Thunder Client or Postman
- **Performance Profiling**: dotMemory, PerfView

### Useful Commands

```bash
# Entity Framework
dotnet ef migrations add MigrationName
dotnet ef database update
dotnet ef database drop

# Package management
dotnet add package PackageName
dotnet remove package PackageName
dotnet list package

# Testing
dotnet test
dotnet test --collect:"XPlat Code Coverage"
dotnet test --logger trx --results-directory TestResults

# Code quality
dotnet format
dotnet build --verbosity normal
```

### External Services

- **Authentication**: Firebase Auth
- **File Storage**: Cloudinary
- **Payment Processing**: Stripe, PayPal
- **Push Notifications**: Firebase Cloud Messaging
- **Email Service**: SendGrid
- **SMS Service**: Twilio

### Monitoring & Logging

- **Application Insights**: Azure Application Insights
- **Logging**: Serilog with structured logging
- **Health Checks**: Built-in ASP.NET Core health checks
- **Metrics**: Custom performance counters

---

## Getting Help

### Documentation

- **API Documentation**: `/api-docs`
- **Architecture Decision Records**: `/docs/adr/`
- **Deployment Guide**: `/docs/deployment.md`
- **Security Guidelines**: `/docs/security.md`

### Team Communication

- **Slack Channel**: #lifepadi-dev
- **Daily Standups**: 9:00 AM EST
- **Sprint Planning**: Every other Monday
- **Retrospectives**: End of each sprint

### Code Reviews

- **Review Guidelines**: All PRs require 2 approvals
- **Review Checklist**: Check PR template
- **Pair Programming**: Available on request

### Support Contacts

- **Technical Lead**: tech-lead@lifepadi.com
- **DevOps Team**: devops@lifepadi.com
- **QA Team**: qa@lifepadi.com
- **Product Manager**: product@lifepadi.com

### Learning Resources

- **Internal Wiki**: https://wiki.lifepadi.com
- **Code Examples**: `/examples/` directory
- **Video Tutorials**: Internal learning portal
- **External Training**: Pluralsight, Microsoft Learn

---

## Next Steps

### Your First Week

1. **Day 1-2**: Complete environment setup and run the application
2. **Day 3**: Review codebase and documentation
3. **Day 4**: Pick up a "good first issue" from the backlog
4. **Day 5**: Submit your first pull request

### Your First Month

1. **Week 1**: Get familiar with the codebase
2. **Week 2**: Complete assigned starter tasks
3. **Week 3**: Take on a medium-complexity feature
4. **Week 4**: Participate in code reviews and team ceremonies

### Ongoing Development

- **Stay Updated**: Follow team communication channels
- **Continuous Learning**: Attend tech talks and training sessions
- **Mentorship**: Participate in peer mentoring program
- **Innovation**: Contribute ideas for technical improvements

---

## Checklist for New Developers

### Setup Completion

- [ ] Development environment configured
- [ ] Database connected and migrations run
- [ ] Application starts successfully
- [ ] Can access Swagger UI
- [ ] Tests pass locally
- [ ] Git configured with proper credentials

### Access & Accounts

- [ ] GitHub repository access
- [ ] Development database credentials
- [ ] Staging environment access
- [ ] Team communication channels joined
- [ ] Issue tracking system access

### Understanding

- [ ] Project structure reviewed
- [ ] Architecture patterns understood
- [ ] Code standards documented
- [ ] Testing guidelines clear
- [ ] Deployment process understood

### First Contribution

- [ ] First issue assigned
- [ ] Branch created for work
- [ ] Code implemented with tests
- [ ] Pull request submitted
- [ ] Code review feedback addressed
- [ ] Changes merged successfully

Welcome to the team! We're excited to have you aboard and look forward to your contributions to the LifePadi API.
