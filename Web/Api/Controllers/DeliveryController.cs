using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeliveryController : ControllerBase
    {
        private readonly IDelivery _idelivery;
        public DeliveryController(IDelivery idelivery) 
        { 
            _idelivery = idelivery;
        }

        [HttpGet("all")]
        public async Task<IActionResult> all()
        {
            try
            {
                var deliveries = await _idelivery.allAsync();
                return Ok(deliveries);
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
                var deliveries = await _idelivery.allDeliveryLiteAsync();
                return Ok(deliveries);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> create([FromForm] DeliveryDTO delivery)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Invalid form");
                var newDelivery = await _idelivery.createAsync(delivery);
                return Ok(newDelivery);
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
                var response = await _idelivery.delete(id);
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
                var delivery = await _idelivery.getAsync(id);
                if (delivery == null) return NotFound();
                return Ok(delivery);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("order/{orderId}/get")]
        public async Task<IActionResult> getOrderDelivery(int orderId)
        {
            try
            {
                var delivery = await _idelivery.getOrderDelivery(orderId);
                if (delivery == null) return NotFound();
                return Ok(delivery);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("rider/{riderId}")]
        public async Task<IActionResult> getRiderDeliveries(int riderId)
        {
            try
            {
                var deliveries = await _idelivery.getRidersDeliveries(riderId);
                if (deliveries == null) return NotFound();
                return Ok(deliveries);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("unsuccessful")]
        public async Task<IActionResult> getUnsuccessflDeliveries()
        {
            try
            {
                var deliveries = await _idelivery.getunSuccessfulDelivery();
                return Ok(deliveries);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getwithstatus")]
        public async Task<IActionResult> getWithStatus([FromQuery] string status)
        {
            try
            {
                var response = await _idelivery.getWithStatus(status);
                return Ok(response);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> update(int id, [FromForm] DeliveryDTO delivery)
        {
            try
            {
                var updatedDelivery = await _idelivery.updateAsync(delivery, id);
                if (updatedDelivery == null) return NotFound();
                return Ok(updatedDelivery);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
