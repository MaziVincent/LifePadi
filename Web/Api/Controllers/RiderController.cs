using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RiderController : ControllerBase
    {
        private readonly IRider? _irider;

        public RiderController(IRider irider)
        {
            _irider = irider;
        }

        [HttpPut("{id}/activate")]
        public async Task<IActionResult> activateRider(int id)
        {
            try
            {
                var res = await _irider!.activateRider(id);
                if (res == null) return NotFound();
                return Ok(res);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{riderId}/assignOrder/{orderId}")]
        public async Task<IActionResult> assignOrder(int riderId, int orderId)
        {
            try
            {
                var res = await _irider!.assignOrderToRider(riderId, orderId);
                if (res == null) return NotFound();
                return Ok(res);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> create([FromForm] CreateRiderDTO rider)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Please fill the neccassary details");
                var newRider = await _irider!.createAsync(rider);
                return Ok(newRider);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/deactivate")]
        public async Task<IActionResult> deactivateRider(int id)
        {
            try
            {
                var res = await _irider!.deactivateRider(id);
                if (res == null) return NotFound();
                return Ok(res);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> deleteRider(int id)
        {
            try
            {
                var res = await _irider!.deleteAsync(id);
                if (res == null) return NotFound();
                return Ok(res);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> getAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string searchString = "")
        {
            try
            {
                var riders = await _irider!.getAllAsync(pageNumber, pageSize, searchString);
                return Ok(riders);
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
                var rider = await _irider!.getAsync(id);
                if (rider == null) return NotFound();
                return Ok(rider);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/getOrders")]
        public async Task<IActionResult> getRiderOrders(int id)
        {
            try
            {
                var orders = await _irider!.getRiderOrders(id);
                return Ok(orders);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("nonactive")]
        public async Task<IActionResult> nonactiveRiders()
        {
            try
            {
                var riders = await _irider!.nonActiveRiders();
                return Ok(riders);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("search")]
        public async Task<IActionResult> search([FromQuery] string searchString)
        {
            try
            {
                var riders = await _irider!.searchAsync(searchString);
                return Ok(riders);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/successfulDeliveries")]
        public async Task<IActionResult> successfulDelivries(int id)
        {
            try
            {
                var delivries = await _irider!.successfulDeliveries(id);
                return Ok(delivries);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/unsuccessfulDeliveries")]
        public async Task<IActionResult> unsuccessfulDelivries(int id)
        {
            try
            {
                var delivries = await _irider!.unsuccessfulDeliveries(id);
                return Ok(delivries);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> update(int id, [FromForm] CreateRiderDTO rider)
        {
            try
            {
                var updatedRider = await _irider!.updateAsync(rider, id);
                if (updatedRider == null) return NotFound();
                return Ok(updatedRider);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/uploadIdentity")]
        public async Task<IActionResult> uploadIdentity(int id, ImageDTO imageFile)
        {
            try
            {
                if (imageFile.Image == null) return BadRequest("Please add an image");
                var res = await _irider!.uploadRiderIdentityImg(id, imageFile.Image!);
                if (res == null) return NotFound();
                return Ok(res);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/verify")]
        public async Task<IActionResult> verifyRider(int id)
        {
            try
            {
                var res = await _irider!.verifyRider(id);
                if (res == null) return NotFound();
                return Ok(res);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
