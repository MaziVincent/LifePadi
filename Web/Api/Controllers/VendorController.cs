using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
using AutoMapper;
=======
>>>>>>> ee48634 (done with service, category and product controllers.)

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
<<<<<<< HEAD
    public class VendorController(IVendor ivendor, IMapper mapper) : ControllerBase
    {
        private readonly IVendor _ivendor = ivendor;
        private readonly IMapper _mapper = mapper;

        [HttpGet("get/{id}")]
        public async Task<IActionResult> get(int id){
=======
    public class VendorController : ControllerBase
    {
        private readonly IVendor _ivendor;
        public VendorController(IVendor ivendor) { 
            _ivendor = ivendor;
        }

        [HttpGet("{id}/get")]
        public async Task<IActionResult> get(int id)
        {
>>>>>>> ee48634 (done with service, category and product controllers.)
            try
            {
                var vendor = await _ivendor.getAsync(id);
                if (vendor == null) return NotFound();
                return Ok(vendor);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("all")]
<<<<<<< HEAD
        public async Task<IActionResult> getAll([FromQuery] SearchPaging props)
        {
            try
            {
                var vendors = await _ivendor.allAsync(props);
                var result = _mapper.Map<List<VendorDtoLite>>(vendors);
                var dataList = new {
                    vendors.PageSize,
                    vendors.TotalPages,
                    vendors.TotalCount,
                    vendors.CurrentPage,
                    vendors.HasNext
                };
                return Ok(new {result, dataList});
=======
        public async Task<IActionResult> getAll([FromRoute] int pageNumber = 1, [FromRoute] int pageSize = 10)
        {
            try
            {
                var vendors = await _ivendor.allAsync(pageNumber, pageSize);
                return Ok(vendors);
>>>>>>> ee48634 (done with service, category and product controllers.)
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpDelete("delete/{id}")]
=======
        [HttpDelete("{id}/delete")]
>>>>>>> ee48634 (done with service, category and product controllers.)
        public async Task<IActionResult> delete(int id)
        {
            try
            {
                var response = await _ivendor.deleteAsync(id);
                if (response == null) return NotFound();
<<<<<<< HEAD
                return Ok(new{success = response});
=======
                return Ok(response);
>>>>>>> ee48634 (done with service, category and product controllers.)
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IActionResult> create([FromForm] AuthVendorDto vendor)
=======
        public async Task<IActionResult> create([FromForm] AuthVendorDTO vendor)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IActionResult> create([FromForm] AuthVendorDto vendor)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var newVendor = await _ivendor.createAsync(vendor);
                    return Ok(newVendor);

                }

                return BadRequest();

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpPut("update/{id}")]
        public async Task<IActionResult> update(int id, [FromForm] AuthVendorDto vendor)
=======
        [HttpPut("{id}/update")]
<<<<<<< HEAD
        public async Task<IActionResult> update(int id, [FromForm] AuthVendorDTOLite vendor)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IActionResult> update(int id, [FromForm] AuthVendorDtoLite vendor)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var updatedVendor = await _ivendor.updateAsync(vendor, id);
                if (updatedVendor == null) return NotFound();
                return Ok(updatedVendor);
            }catch(Exception ex) { 
                return BadRequest(ex.Message); 
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> search([FromRoute] string searchString)
        {
            try
            {
                var result = await _ivendor.searchAsync(searchString);
                if (result == null) return NotFound();
                return Ok(result);
<<<<<<< HEAD

=======
>>>>>>> ee48634 (done with service, category and product controllers.)
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpPut("uploadImg/{id}")]
        public async Task<IActionResult> uploadImg(int id, [FromForm] ImageDto vendorImg)
=======
        [HttpPut("{id}/uploadImg")]
        public async Task<IActionResult> uploadImg(int id, [FromForm] ImageDTO vendorImg)
>>>>>>> ee48634 (done with service, category and product controllers.)
        {
            try
            {
                var response = await _ivendor.uploadVendorImg(id, vendorImg.Image!);
                if (response == null) return NotFound();
                return Ok(response);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("vendorsLite")]
        public async Task<IActionResult> vendorsLite()
        {
            try
            {
                var vendors = await _ivendor.vendorsOnly();
                return Ok(vendors);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpGet("products/{id}")]
=======
        [HttpGet("{id}/products")]
>>>>>>> ee48634 (done with service, category and product controllers.)
        public async Task<IActionResult> vendorProducts(int id)
        {
            try
            {
                var products = await _ivendor.vendorsProduct(id);
                return Ok(products);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpGet("getByTagName")]
        public async Task<IActionResult> getByTagName([FromQuery] string tag)
        {
            try
            {
                var vendor = await _ivendor.getVendorByTagName(tag);
                if (vendor == null) return NotFound();
                return Ok(vendor);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/products")]
        public async Task<IActionResult> getVendorProducts(int id, [FromQuery] SearchPaging props)
        {
            try
            {
                var products = await _ivendor.getVendorProducts(id, props);
                var result = _mapper.Map<List<ProductDto>>(products);
                var dataList = new {
                    products.PageSize,
                    products.TotalPages,
                    products.TotalCount,
                    products.CurrentPage
                };
                return Ok(new {result, dataList});                
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("activate/{id}")]
        public async Task<IActionResult> activate(int id)
        {
            try
            {
                var response = await _ivendor.activateVendor(id);
                if (response == null) return NotFound();
                return Ok(new {success = response});
            }catch(Exception ex)
            {
                if (ex.Message.Contains("Vendor does not exist")) return NotFound();
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("deactivate/{id}")]
        public async Task<IActionResult> deactivate(int id)
        {
            try
            {
                var response = await _ivendor.deactivateVendor(id);
                if (response == null) return NotFound();
                return Ok(new {success = response});
            }catch(Exception ex)
            {
                if (ex.Message.Contains("Vendor does not exist")) return NotFound();
                return BadRequest(ex.Message);
            }
        }

=======
>>>>>>> ee48634 (done with service, category and product controllers.)
    }
}
