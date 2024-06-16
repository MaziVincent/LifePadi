using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendorCategoryController : ControllerBase
    {
        private readonly IVendorCategory _ivendorCategoryService;
        const string notFound = "VendorCategory not found";
        public VendorCategoryController(IVendorCategory ivendorCategoryService)
        {
            _ivendorCategoryService = ivendorCategoryService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> allAsync()
        {
            try
            {
                var vendorCategories = await _ivendorCategoryService.allAsync();
                return Ok(vendorCategories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateAsync([FromForm] VendorCategoryDto vc)
        {
            try
            {
                var vendorCategory = await _ivendorCategoryService.CreateAsync(vc);
                return Ok(vendorCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            try
            {
                var result = await _ivendorCategoryService.DeleteAsync(id);
                if (result)
                {
                    return Ok("VendorCategory deleted successfully");
                }
                return NotFound(notFound);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> getAsync(int id)
        {
            try
            {
                var vendorCategory = await _ivendorCategoryService.getAsync(id);
                if (vendorCategory == null)
                {
                    return NotFound(notFound);
                }
                return Ok(vendorCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> UpdateAsync(int id, [FromForm] VendorCategoryDto vc)
        {
            try
            {
                var vendorCategory = await _ivendorCategoryService.UpdateAsync(id, vc);
                if (vendorCategory == null)
                {
                    return NotFound(notFound);
                }
                return Ok(vendorCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/vendors")]
        public async Task<IActionResult> getAllVendors(int id)
        {
            try
            {
                var vendors = await _ivendorCategoryService.getAllVendors(id);
                if (vendors == null)
                {
                    return NotFound(notFound);
                }
                return Ok(vendors);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}