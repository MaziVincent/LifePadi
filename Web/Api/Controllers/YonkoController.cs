using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Api.Interfaces;
using Api.DTO;
using Api.Models;
using Api.Authorization;

namespace LifePadi.Web.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [ApiKeyAuth]
    public class YonkoController : ControllerBase
    {
        private readonly IOtherService _otherService;

        public YonkoController(IOtherService otherService)
        {
            _otherService = otherService;
        }

        [HttpGet("delivery-fee")]
        public async Task<IActionResult> GetYonkoDeliveryFee([FromQuery] Distance distance)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var result = await _otherService.GetYonkoDeliveryFee(distance);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
            
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateYonkoDeliveryDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var created = await _otherService.CreateYonkoDelivery(dto);
            return CreatedAtAction(nameof(GetOne), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] CreateYonkoDeliveryDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var updated = await _otherService.UpdateYonkoDelivery(id, dto);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string? searchString = null)
        {
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;
            var paging = new SearchPaging { PageNumber = pageNumber, PageSize = pageSize, SearchString = searchString };
            var paged = await _otherService.GetAllYonkoDeliveries(paging);
            Response.Headers["X-Total-Count"] = paged.TotalCount.ToString();
            Response.Headers["X-Total-Pages"] = paged.TotalPages.ToString();
            Response.Headers["X-Current-Page"] = paged.CurrentPage.ToString();
            Response.Headers["X-Page-Size"] = paged.PageSize.ToString();
            return Ok(paged);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetOne(int id)
        {
            var entity = await _otherService.GetYonkoDelivery(id);
            if (entity == null) return NotFound();
            return Ok(entity);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _otherService.DeleteYonkoDelivery(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }

  
}