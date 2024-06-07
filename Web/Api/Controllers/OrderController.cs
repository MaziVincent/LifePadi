using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrder _iorder;
        public OrderController(IOrder iorder)
        {
            _iorder = iorder;
        }

        [HttpGet("all")]
        public async Task<IActionResult> all()
        {
            try
            {
                var orders = await _iorder.allAsync();
                return Ok(orders);
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
                var orders = await _iorder.allOrderLite();
                return Ok(orders);
            }catch (Exception ex) 
            { 
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> create([FromForm] OrderDto order)
        {
            try
            {
                var newOrder = await _iorder.createAsync(order);
                return Ok(newOrder);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> customerOrders(int customerId)
        {
            try
            {
                var orders = await _iorder.customerOrders(customerId);
                return Ok(orders);
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
                var response = await _iorder.deleteAsync(id);
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
                var order = await _iorder.getAsync(id);
                if (order == null) return NotFound();
                return Ok(order);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("{id}/orderItems")]
        public async Task<IActionResult> orderItems(int id)
        {
            try
            {
                var orderItems = await _iorder.orderItemLites(id);
                return Ok(orderItems);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[HttpGet("rider/{riderId}/getOrders")]
        //public async Task<IActionResult> getRiderOrders(int riderId)
        

        [HttpPut("{id}/update")]
        public async Task<IActionResult> update(int id, [FromForm] OrderDto order)
        {
            try
            {
                var updateOrder = await _iorder.updateAsync(order, id);
                if (updateOrder == null) return NotFound();
                return Ok(updateOrder);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/updateStatus")]
        public async Task<IActionResult> updateStatus(int id, [FromQuery] string status)
        {
            try
            {
                var order = await _iorder.updateOrderStatus(id, status);
                if (order == null) return NotFound();
                return Ok(order);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}
