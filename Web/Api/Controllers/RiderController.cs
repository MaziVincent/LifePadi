using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RiderController : ControllerBase
    {
        private readonly IRider? _irider;
        private readonly IMapper _mapper;

        public RiderController(IRider irider, IMapper mapper)
        {
            _irider = irider;
            _mapper = mapper;
        }

        [HttpPut("activate/{id}")]
        public async Task<IActionResult> activateRider(int id)
        {
            try
            {
                var res = await _irider!.activateRider(id);
                if (res == null) return NotFound();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("create")]
        public async Task<IActionResult> create([FromForm] CreateRiderDto rider)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Please fill the neccassary details");
                var newRider = await _irider!.createAsync(rider);
                return Ok(newRider);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Rider already exists")) return Conflict(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("deactivate/{id}")]
        public async Task<IActionResult> deactivateRider(int id)
        {
            try
            {
                var res = await _irider!.deactivateRider(id);
                if (res == null) return NotFound();
                return Ok(new { success = "Rider Deactivated Successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> deleteRider(int id)
        {
            try
            {
                var res = await _irider!.deleteAsync(id);
                if (res == null) return NotFound();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> getAll([FromQuery] SearchPaging props)
        {
            try
            {
                var riders = await _irider!.getAllAsync(props);

                var result = _mapper.Map<List<AuthRiderDto>>(riders);

                var dataList = new
                {
                    riders.TotalCount,
                    riders.TotalPages,
                    riders.CurrentPage,
                    riders.PageSize
                };

                return Ok(new { result, dataList });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> get(int id)
        {
            try
            {
                var rider = await _irider!.getAsync(id);
                if (rider == null) return NotFound();
                return Ok(rider);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/getOrders")]
        public async Task<IActionResult> getRiderOrders(int id, [FromQuery] SearchPaging props)
        {
            try
            
            {
                var orders = await _irider!.getRiderOrders(props, id);
                
                var result = _mapper.Map<List<OrderDto>>(orders);

                var dataList = new
                {
                    orders.TotalCount,
                    orders.TotalPages,
                    orders.CurrentPage,
                    orders.PageSize
                };

                return Ok(new { result, dataList });
            }
            catch (Exception ex)
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
            }
            catch (Exception ex)
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
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{riderId}/successfulDeliveries")]
        public async Task<IActionResult> successfulDelivries(int riderId)
        {
            try
            {
                var delivries = await _irider!.successfulDeliveries(riderId);
                return Ok(delivries);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{riderId}/pendingDeliveries")]
        public async Task<IActionResult> pendingDelivries(int riderId)
        {
            try
            {
                var delivries = await _irider!.pendingDeliveries(riderId);
                return Ok(delivries);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> update(int id, [FromForm] CreateRiderDto rider)
        {
            try
            {
                var updatedRider = await _irider!.updateAsync(rider, id);
                if (updatedRider == null) return NotFound();
                return Ok(updatedRider);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("uploadIdentity/{id}")]
        public async Task<IActionResult> uploadIdentity(int id, ImageDto imageFile)
        {
            try
            {
                if (imageFile.Image == null) return BadRequest("Please add an image");
                var res = await _irider!.uploadRiderIdentityImg(id, imageFile.Image!);
                if (res == null) return NotFound();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("verify/{id}")]
        public async Task<IActionResult> verifyRider(int id)
        {
            try
            {
                var res = await _irider!.verifyRider(id);
                if (res == null) return NotFound();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("toggleStatus/{id}")]
        public async Task<IActionResult> toggleRiderStatus(int id)
        {
            try
            {
                var res = await _irider!.toggleRiderStatus(id);
                if (res == null) return NotFound();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
