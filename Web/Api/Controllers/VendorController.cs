using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendorController : ControllerBase
    {
        private readonly IVendor _ivendor;
        public VendorController(IVendor ivendor) { 
            _ivendor = ivendor;
        }

        [HttpGet("{id}/get")]
        public async Task<IActionResult> get(int id)
        {
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
        public async Task<IActionResult> getAll([FromRoute] int pageNumber = 1, [FromRoute] int pageSize = 10)
        {
            try
            {
                var vendors = await _ivendor.allAsync(pageNumber, pageSize);
                return Ok(vendors);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> delete(int id)
        {
            try
            {
                var response = await _ivendor.deleteAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> create([FromForm] AuthVendorDTO vendor)
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

        [HttpPut("{id}/update")]
        public async Task<IActionResult> update(int id, [FromForm] AuthVendorDTOLite vendor)
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
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/uploadImg")]
        public async Task<IActionResult> uploadImg(int id, [FromForm] ImageDTO vendorImg)
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

        [HttpGet("{id}/products")]
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

    }
}
