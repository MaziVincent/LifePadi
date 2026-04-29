using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    /// <summary>
    /// CRUD endpoints for product variants (one-of, replaces base price)
    /// and product extras (many-of, additive).
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ProductOptionController : ControllerBase
    {
        private readonly IProductOption _service;

        public ProductOptionController(IProductOption service)
        {
            _service = service;
        }

        // -------- Variants --------

        [HttpGet("variants/byProduct/{productId}")]
        public async Task<IActionResult> GetVariantsByProduct(int productId)
        {
            try { return Ok(await _service.getVariantsByProduct(productId)); }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpPost("variants/create")]
        [Authorize(Policy = "CanManageProducts")]
        public async Task<IActionResult> CreateVariant([FromBody] CreateProductVariantDto dto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                return Ok(await _service.createVariant(dto));
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpPut("variants/{id}/update")]
        [Authorize(Policy = "CanManageProducts")]
        public async Task<IActionResult> UpdateVariant(int id, [FromBody] CreateProductVariantDto dto)
        {
            try { return Ok(await _service.updateVariant(id, dto)); }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpDelete("variants/{id}/delete")]
        [Authorize(Policy = "CanManageProducts")]
        public async Task<IActionResult> DeleteVariant(int id)
        {
            try
            {
                var res = await _service.deleteVariant(id);
                if (res == null) return NotFound();
                return Ok(res);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        // -------- Extras --------

        [HttpGet("extras/byProduct/{productId}")]
        public async Task<IActionResult> GetExtrasByProduct(int productId)
        {
            try { return Ok(await _service.getExtrasByProduct(productId)); }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpPost("extras/create")]
        [Authorize(Policy = "CanManageProducts")]
        public async Task<IActionResult> CreateExtra([FromBody] CreateProductExtraDto dto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest(ModelState);
                return Ok(await _service.createExtra(dto));
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpPut("extras/{id}/update")]
        [Authorize(Policy = "CanManageProducts")]
        public async Task<IActionResult> UpdateExtra(int id, [FromBody] CreateProductExtraDto dto)
        {
            try { return Ok(await _service.updateExtra(id, dto)); }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }

        [HttpDelete("extras/{id}/delete")]
        [Authorize(Policy = "CanManageProducts")]
        public async Task<IActionResult> DeleteExtra(int id)
        {
            try
            {
                var res = await _service.deleteExtra(id);
                if (res == null) return NotFound();
                return Ok(res);
            }
            catch (Exception ex) { return BadRequest(ex.Message); }
        }
    }
}
