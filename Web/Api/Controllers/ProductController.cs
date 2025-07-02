using Api.DTO;
using Api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Controllers
{
    /// <summary>
    /// Product management controller for handling product CRUD operations
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [SwaggerTag("Product management endpoints for vendors and customers")]
    public class ProductController : ControllerBase
    {
        private readonly IProduct? _iproduct;
        private readonly IMapper _mapper;
        public ProductController(IProduct iproduct, IMapper mapper)
        {
            _iproduct = iproduct;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves all products with pagination and search functionality
        /// </summary>
        /// <param name="pageNumber">Page number for pagination (default: 1)</param>
        /// <param name="pageSize">Number of items per page (default: 10)</param>
        /// <param name="searchString">Search term to filter products (optional)</param>
        /// <returns>Returns paginated list of products</returns>
        /// <response code="200">Products retrieved successfully</response>
        /// <response code="400">Bad request - invalid parameters</response>
        [HttpGet("all")]
        [SwaggerOperation(Summary = "Get all products", Description = "Retrieves paginated list of products with optional search filtering")]
        [SwaggerResponse(200, "Products retrieved successfully", typeof(List<ProductDto>))]
        [SwaggerResponse(400, "Bad request")]
        public async Task<IActionResult> getAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string searchString = "")
        {
            try
            {
                var products = await _iproduct!.allAsync(pageNumber, pageSize, searchString);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Retrieves a lightweight version of all products
        /// </summary>
        /// <returns>Returns all products in a simplified format</returns>
        /// <response code="200">Products retrieved successfully</response>
        /// <response code="400">Bad request</response>
        [HttpGet("allLite")]
        [SwaggerOperation(Summary = "Get all products (lite)", Description = "Retrieves all products in a simplified format for performance")]
        [SwaggerResponse(200, "Products retrieved successfully", typeof(List<ProductDto>))]
        [SwaggerResponse(400, "Bad request")]
        public async Task<IActionResult> allLite()
        {
            try
            {
                var products = await _iproduct!.allProductLiteAsync();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Creates a new product
        /// </summary>
        /// <param name="product">Product data for creation</param>
        /// <returns>Created product DTO</returns>
        [HttpPost("create")]
        public async Task<IActionResult> create(CreateProductDto product)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Please fill in the form correctly");
                var newProduct = await _iproduct!.createAsync(product);
                return Ok(newProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Deletes a product by ID
        /// </summary>
        /// <param name="id">Product ID</param>
        /// <returns>Deleted product DTO or NotFound</returns>
        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> delete(int id)
        {
            try
            {
                var response = await _iproduct!.deleteAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Retrieves a product by ID
        /// </summary>
        /// <param name="id">Product ID</param>
        /// <returns>Product DTO or NotFound</returns>
        [HttpGet("get/{id}")]
        public async Task<IActionResult> get(int id)
        {
            try
            {
                var product = await _iproduct!.getAsync(id);
                if (product == null) return NotFound();
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Retrieves the vendor of a product
        /// </summary>
        /// <param name="id">Product ID</param>
        /// <returns>Vendor DTO</returns>
        [HttpGet("{id}/getvendor")]
        public async Task<IActionResult> getVendor(int id)
        {
            try
            {
                var vendor = await _iproduct!.getProductVendor(id);
                return Ok(vendor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Searches for products by name
        /// </summary>
        /// <param name="searchString">Search string</param>
        /// <returns>List of matching products</returns>
        [HttpGet("search")]
        public async Task<IActionResult> searchProduct([FromQuery] string searchString)
        {
            try
            {
                var products = await _iproduct!.searchProduct(searchString);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Searches for products by various criteria
        /// </summary>
        /// <param name="pageNumber">Page number for pagination</param>
        /// <param name="pageSize">Number of products per page</param>
        /// <param name="name">Optional product name</param>
        /// <returns>List of matching products</returns>
        [HttpGet("searchByAll")]
        public async Task<IActionResult> searchByAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string name = "")
        {
            try
            {
                var products = await _iproduct!.searchProductByAll(pageNumber, pageSize, name);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Searches for products by category
        /// </summary>
        /// <param name="pageNumber">Page number for pagination</param>
        /// <param name="pageSize">Number of products per page</param>
        /// <param name="categoryName">Category name</param>
        /// <returns>List of products in the specified category</returns>
        [HttpGet("searchByCategory")]
        public async Task<IActionResult> searchByCategory([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string categoryName = "")
        {
            try
            {
                var products = await _iproduct!.searchProductByCategory(pageNumber, pageSize, categoryName);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Searches for products by service
        /// </summary>
        /// <param name="pageNumber">Page number for pagination</param>
        /// <param name="pageSize">Number of products per page</param>
        /// <param name="serviceName">Service name</param>
        /// <returns>List of products offering the specified service</returns>
        [HttpGet("searchByService")]
        public async Task<IActionResult> searchByService([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string serviceName = "")
        {
            try
            {
                var products = await _iproduct!.searchProductByService(pageNumber, pageSize, serviceName);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Searches for products by vendor
        /// </summary>
        /// <param name="pageNumber">Page number for pagination</param>
        /// <param name="pageSize">Number of products per page</param>
        /// <param name="vendorName">Vendor name</param>
        /// <returns>List of products from the specified vendor</returns>
        [HttpGet("searchByVendor")]
        public async Task<IActionResult> searchByVendor([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string vendorName = "")
        {
            try
            {
                var products = await _iproduct!.searchProductByVendor(pageNumber, pageSize, vendorName);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Updates a product by ID
        /// </summary>
        /// <param name="product">Updated product data</param>
        /// <param name="id">Product ID</param>
        /// <returns>Updated product DTO</returns>
        [HttpPut("update/{id}")]
        public async Task<IActionResult> update([FromForm] ProductDto product, int id)
        {
            try
            {
                var updatedProduct = await _iproduct!.updateAsync(product, id);
                if (updatedProduct == null) return NotFound();
                return Ok(updatedProduct);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Uploads an image for a product
        /// </summary>
        /// <param name="id">Product ID</param>
        /// <param name="productImage">Image data</param>
        /// <returns>Product DTO with updated image</returns>
        [HttpPut("uploadImg/{id}")]
        public async Task<IActionResult> uploadImage(int id, [FromForm] ImageDto productImage)
        {
            try
            {
                var product = await _iproduct!.uploadProductImg(id, productImage.Image!);
                if (product == null) return NotFound();
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Activates a product by ID
        /// </summary>
        /// <param name="id">Product ID</param>
        /// <returns>Activated product DTO</returns>
        [HttpPut("activate/{id}")]
        public async Task<IActionResult> activate(int id)
        {
            try
            {
                var response = await _iproduct!.toogleProductStatus(id);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Deactivates a product by ID
        /// </summary>
        /// <param name="id">Product ID</param>
        /// <returns>Deactivated product DTO</returns>
        [HttpPut("deactivate/{id}")]
        public async Task<IActionResult> deactivate(int id)
        {
            try
            {
                var response = await _iproduct!.toogleProductStatus(id);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Retrieves vendor statistics for products
        /// </summary>
        /// <param name="vendorId">Vendor ID</param>
        /// <returns>Vendor statistics DTO</returns>
        [HttpGet("vendorStat/{vendorId}")]
        public async Task<IActionResult> vendorStat(int vendorId)
        {
            try
            {
                var response = await _iproduct!.getVendorProductStat(vendorId);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        /// <summary>
        /// Retrieves products by category with pagination
        /// </summary>
        /// <param name="categoryId">Category ID</param>
        /// <param name="props">Paging and sorting properties</param>
        /// <returns>List of products in the specified category</returns>
        [HttpGet("byCategory/{categoryId}")]
        public async Task<IActionResult> byCategory(int categoryId, [FromQuery] SearchPaging props)
        {
            try
            {
                var products = await _iproduct!.GetProductsByCategory(categoryId, props);
                var result = _mapper.Map<List<ProductDto>>(products);
                var dataList = new
                {
                    products.PageSize,
                    products.TotalPages,
                    products.TotalCount,
                    products.CurrentPage
                };
                return Ok(new { result, dataList });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Searches for products across all fields
        /// </summary>
        /// <param name="props">Paging and sorting properties</param>
        /// <returns>List of matching products</returns>
        [HttpGet("searchAll")]
        public async Task<IActionResult> searchAll([FromQuery] SearchPaging props)
        {
            try
            {
                var result = await _iproduct!.SearchAsync(props);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
