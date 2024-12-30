using Api.DTO;
using Api.Interfaces;
<<<<<<< HEAD
<<<<<<< HEAD
using AutoMapper;
=======
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
using AutoMapper;
>>>>>>> db55c17 (added a route for products under a category with pagination)
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProduct? _iproduct;
<<<<<<< HEAD
<<<<<<< HEAD
        private readonly IMapper _mapper;
        public ProductController(IProduct iproduct, IMapper mapper)
        {
            _iproduct = iproduct;
            _mapper = mapper;
        }

        [HttpGet("all")]
        public async Task<IActionResult> getAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string searchString = "")
=======
        public ProductController(IProduct iproduct)
=======
        private readonly IMapper _mapper;
        public ProductController(IProduct iproduct, IMapper mapper)
>>>>>>> db55c17 (added a route for products under a category with pagination)
        {
            _iproduct = iproduct;
            _mapper = mapper;
        }

        [HttpGet("all")]
<<<<<<< HEAD
        public async Task<IActionResult> getAll(int pageNumber = 1, int pageSize = 10, string searchString = "")
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IActionResult> getAll([FromQuery] int pageNumber = 1,[FromQuery] int pageSize = 10, [FromQuery] string searchString = "")
>>>>>>> 96f3b7d (made some corrections on service, category and product services.)
        {
            try
            {
                var products = await _iproduct!.allAsync(pageNumber, pageSize, searchString);
                return Ok(products);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> ee48634 (done with service, category and product controllers.)
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
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch(Exception ex)
>>>>>>> ee48634 (done with service, category and product controllers.)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IActionResult> create(CreateProductDto product)
=======
        public async Task<IActionResult> create(CreateProductDTO product)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IActionResult> create(CreateProductDto product)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Please fill in the form correctly");
                var newProduct = await _iproduct!.createAsync(product);
                return Ok(newProduct);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> ee48634 (done with service, category and product controllers.)
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
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> ee48634 (done with service, category and product controllers.)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        [HttpGet("get/{id}")]
=======
        [HttpGet("{id}/get")]
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        [HttpGet("get/{id}")]
>>>>>>> 4dc5d34 (worked on product component)
        public async Task<IActionResult> get(int id)
        {
            try
            {
                var product = await _iproduct!.getAsync(id);
                if (product == null) return NotFound();
                return Ok(product);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> ee48634 (done with service, category and product controllers.)
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
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> ee48634 (done with service, category and product controllers.)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("search")]
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IActionResult> searchProduct([FromQuery] string searchString)
=======
        public async Task<IActionResult> searchProduct([FromRoute] string searchString)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IActionResult> searchProduct([FromQuery] string searchString)
>>>>>>> 96f3b7d (made some corrections on service, category and product services.)
        {
            try
            {
                var products = await _iproduct!.searchProduct(searchString);
                return Ok(products);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> ee48634 (done with service, category and product controllers.)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("searchByAll")]
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IActionResult> searchByAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string name = "")
=======
        public async Task<IActionResult> searchByAll([FromRoute] int pageNumber = 1, [FromRoute] int pageSize = 10, [FromRoute] string name = "")
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IActionResult> searchByAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string name = "")
>>>>>>> 96f3b7d (made some corrections on service, category and product services.)
        {
            try
            {
                var products = await _iproduct!.searchProductByAll(pageNumber, pageSize, name);
                return Ok(products);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> ee48634 (done with service, category and product controllers.)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("searchByCategory")]
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IActionResult> searchByCategory([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string categoryName = "")
=======
        public async Task<IActionResult> searchByCategory([FromRoute] int pageNumber = 1, [FromRoute] int pageSize = 10, [FromRoute] string categoryName = "")
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IActionResult> searchByCategory([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string categoryName = "")
>>>>>>> 96f3b7d (made some corrections on service, category and product services.)
        {
            try
            {
                var products = await _iproduct!.searchProductByCategory(pageNumber, pageSize, categoryName);
                return Ok(products);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> ee48634 (done with service, category and product controllers.)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("searchByService")]
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IActionResult> searchByService([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string serviceName = "")
=======
        public async Task<IActionResult> searchByService([FromRoute] int pageNumber = 1, [FromRoute] int pageSize = 10, [FromRoute] string serviceName = "")
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IActionResult> searchByService([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string serviceName = "")
>>>>>>> 96f3b7d (made some corrections on service, category and product services.)
        {
            try
            {
                var products = await _iproduct!.searchProductByService(pageNumber, pageSize, serviceName);
                return Ok(products);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> ee48634 (done with service, category and product controllers.)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("searchByVendor")]
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IActionResult> searchByVendor([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string vendorName = "")
=======
        public async Task<IActionResult> searchByVendor([FromRoute] int pageNumber = 1, [FromRoute] int pageSize = 10, [FromRoute] string vendorName = "")
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IActionResult> searchByVendor([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string vendorName = "")
>>>>>>> 96f3b7d (made some corrections on service, category and product services.)
        {
            try
            {
                var products = await _iproduct!.searchProductByVendor(pageNumber, pageSize, vendorName);
                return Ok(products);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> ee48634 (done with service, category and product controllers.)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
        [HttpPut("update/{id}")]
        public async Task<IActionResult> update([FromForm] ProductDto product, int id)
=======
        [HttpPut("{id}/update")]
<<<<<<< HEAD
        public async Task<IActionResult> update([FromForm] ProductDTO product ,int id)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
=======
        [HttpPut("update/{id}")]
>>>>>>> 4dc5d34 (worked on product component)
        public async Task<IActionResult> update([FromForm] ProductDto product ,int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var updatedProduct = await _iproduct!.updateAsync(product, id);
                if (updatedProduct == null) return NotFound();
                return Ok(updatedProduct);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> ee48634 (done with service, category and product controllers.)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4dc5d34 (worked on product component)
        [HttpPut("uploadImg/{id}")]
        public async Task<IActionResult> uploadImage(int id, [FromForm] ImageDto productImage)
=======
        [HttpPut("{id}/uploadImg")]
        public async Task<IActionResult> uploadImage(int id, [FromForm] ImageDTO productImage)
>>>>>>> ee48634 (done with service, category and product controllers.)
        {
            try
            {
                var product = await _iproduct!.uploadProductImg(id, productImage.Image!);
                if (product == null) return NotFound();
                return Ok(product);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> ee48634 (done with service, category and product controllers.)
            {
                return BadRequest(ex.Message);
            }
        }
<<<<<<< HEAD

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6b6a266 (search commit)

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

<<<<<<< HEAD
=======
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
>>>>>>> db55c17 (added a route for products under a category with pagination)
=======
>>>>>>> 6b6a266 (search commit)
    }
}
