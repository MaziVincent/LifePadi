using Api.DTO;
using Api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProduct? _iproduct;
        private readonly IMapper _mapper;
        public ProductController(IProduct iproduct, IMapper mapper)
        {
            _iproduct = iproduct;
            _mapper = mapper;
        }

        [HttpGet("all")]
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

        [HttpGet("allLite")]
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

        [HttpPut("toogleStatus/{id}")]
        public async Task<IActionResult> toogleStatus(int id)
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


        [HttpGet("byCategory/{categoryId}")]
        public async Task<IActionResult> byCategory(int categoryId, [FromQuery] SearchPaging props)
        {
            try
            {
                var products = await _iproduct!.GetProductsByCategory(categoryId, props);
                var result = _mapper.Map<List<ProductDto>>(products);
                var dataList = new{
                    products.PageSize,
                    products.TotalPages,
                    products.TotalCount,
                    products.CurrentPage
                };
                return Ok(new { result, dataList});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
