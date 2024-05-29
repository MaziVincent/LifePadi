using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderItemController : ControllerBase
    {
        private readonly IOrderItem _iorderItem;
        public OrderItemController(IOrderItem iorderItem)
        {
            _iorderItem = iorderItem;
        }

        [HttpGet("all")]
        public async Task<IActionResult> all()
        {
            try
            {
                var orderItems = await _iorderItem.allAsync();
                return Ok(orderItems);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("allLite")]
        public async Task<IActionResult> allLite()
        {
            try
            {
                var orderItem = await _iorderItem.allAsync();
                return Ok(orderItem);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> create([FromForm] OrderItemDTO orderItem)
        {
            try
            {
                var newOrderItem = await _iorderItem.createAsync(orderItem);
                return Ok(newOrderItem);
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
                var response = await _iorderItem.deleteAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/get")]
        public async Task<IActionResult> get(int id)
        {
            try
            {
                var orderItem = await _iorderItem.getAsync(id);
                if (orderItem == null) return NotFound();
                return Ok(orderItem);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> update(int id, [FromForm] OrderItemDTO orderItem)
        {
            try
            {
                var updatedOrderItem = await _iorderItem.updateAsync(orderItem, id);
                if (updatedOrderItem == null) return NotFound();
                return Ok(updatedOrderItem);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
