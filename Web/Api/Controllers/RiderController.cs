using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
using AutoMapper;
=======
>>>>>>> 28d4101 (finished with rider and order)

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RiderController : ControllerBase
    {
        private readonly IRider? _irider;
<<<<<<< HEAD
        private readonly IMapper _mapper;

        public RiderController(IRider irider, IMapper mapper)
        {
            _irider = irider;
            _mapper = mapper;
        }

        [HttpPut("activate/{id}")]
=======

        public RiderController(IRider irider)
        {
            _irider = irider;
        }

        [HttpPut("{id}/activate")]
>>>>>>> 28d4101 (finished with rider and order)
        public async Task<IActionResult> activateRider(int id)
        {
            try
            {
                var res = await _irider!.activateRider(id);
                if (res == null) return NotFound();
                return Ok(res);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> 28d4101 (finished with rider and order)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD

        [HttpPost("create")]
        public async Task<IActionResult> create([FromForm] CreateRiderDto rider)
=======
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
=======
>>>>>>> 4641615 (finished with delivery service and controller)

        [HttpPost("create")]
<<<<<<< HEAD
        public async Task<IActionResult> create([FromForm] CreateRiderDTO rider)
>>>>>>> 28d4101 (finished with rider and order)
=======
        public async Task<IActionResult> create([FromForm] CreateRiderDto rider)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Please fill the neccassary details");
                var newRider = await _irider!.createAsync(rider);
                return Ok(newRider);
<<<<<<< HEAD
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Rider already exists")) return Conflict(ex.Message);
=======
            }catch (Exception ex)
            {
>>>>>>> 28d4101 (finished with rider and order)
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpPut("deactivate/{id}")]
=======
        [HttpPut("{id}/deactivate")]
>>>>>>> 28d4101 (finished with rider and order)
        public async Task<IActionResult> deactivateRider(int id)
        {
            try
            {
                var res = await _irider!.deactivateRider(id);
                if (res == null) return NotFound();
<<<<<<< HEAD
                return Ok(new { success = "Rider Deactivated Successfully" });
            }
            catch (Exception ex)
=======
                return Ok(res);
            }catch(Exception ex)
>>>>>>> 28d4101 (finished with rider and order)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpDelete("delete/{id}")]
=======
        [HttpDelete("{id}/delete")]
>>>>>>> 28d4101 (finished with rider and order)
        public async Task<IActionResult> deleteRider(int id)
        {
            try
            {
                var res = await _irider!.deleteAsync(id);
                if (res == null) return NotFound();
                return Ok(res);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch(Exception ex)
>>>>>>> 28d4101 (finished with rider and order)
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
                var riders = await _irider!.getAllAsync(props);

                var result = _mapper.Map<List<AuthRiderDto>>(riders);

                var dataList = new
                {
                    riders.TotalCount,
                    riders.TotalPages,
                    riders.CurrentPage,
                    riders.PageSize
                };
<<<<<<< HEAD
=======
            var result = _mapper.Map<List<RiderDto>>(riders);
>>>>>>> 7fb3cf8 (resolved merge conflicts)

                return Ok(new { result, dataList });
            }
            catch (Exception ex)
=======
        public async Task<IActionResult> getAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, [FromQuery] string searchString = "")
        {
            try
            {
                var riders = await _irider!.getAllAsync(pageNumber, pageSize, searchString);
                return Ok(riders);
            }catch (Exception ex)
>>>>>>> 28d4101 (finished with rider and order)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpGet("get/{id}")]
=======
        [HttpGet("{id}/get")]
>>>>>>> 28d4101 (finished with rider and order)
        public async Task<IActionResult> get(int id)
        {
            try
            {
                var rider = await _irider!.getAsync(id);
                if (rider == null) return NotFound();
                return Ok(rider);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch(Exception ex)
>>>>>>> 28d4101 (finished with rider and order)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/getOrders")]
<<<<<<< HEAD
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
=======
        public async Task<IActionResult> getRiderOrders(int id)
        {
            try
            {
                var orders = await _irider!.getRiderOrders(id);
                return Ok(orders);
            }catch(Exception ex)
>>>>>>> 28d4101 (finished with rider and order)
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
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> 28d4101 (finished with rider and order)
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
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch(Exception ex)
>>>>>>> 28d4101 (finished with rider and order)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpGet("{riderId}/successfulDeliveries")]
        public async Task<IActionResult> successfulDelivries(int riderId)
        {
            try
            {
                var delivries = await _irider!.successfulDeliveries(riderId);
=======
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
>>>>>>> 28d4101 (finished with rider and order)
                return Ok(delivries);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
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
=======
        [HttpPut("{id}/update")]
<<<<<<< HEAD
        public async Task<IActionResult> update(int id, [FromForm] CreateRiderDTO rider)
>>>>>>> 28d4101 (finished with rider and order)
=======
        public async Task<IActionResult> update(int id, [FromForm] CreateRiderDto rider)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var updatedRider = await _irider!.updateAsync(rider, id);
                if (updatedRider == null) return NotFound();
                return Ok(updatedRider);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch(Exception ex)
>>>>>>> 28d4101 (finished with rider and order)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpPut("uploadIdentity/{id}")]
        public async Task<IActionResult> uploadIdentity(int id, ImageDto imageFile)
=======
        [HttpPut("{id}/uploadIdentity")]
        public async Task<IActionResult> uploadIdentity(int id, ImageDTO imageFile)
>>>>>>> 28d4101 (finished with rider and order)
        {
            try
            {
                if (imageFile.Image == null) return BadRequest("Please add an image");
                var res = await _irider!.uploadRiderIdentityImg(id, imageFile.Image!);
                if (res == null) return NotFound();
                return Ok(res);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch(Exception ex)
>>>>>>> 28d4101 (finished with rider and order)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpPut("verify/{id}")]
=======
        [HttpPut("{id}/verify")]
>>>>>>> 28d4101 (finished with rider and order)
        public async Task<IActionResult> verifyRider(int id)
        {
            try
            {
                var res = await _irider!.verifyRider(id);
                if (res == null) return NotFound();
                return Ok(res);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch(Exception ex)
>>>>>>> 28d4101 (finished with rider and order)
            {
                return BadRequest(ex.Message);
            }
        }
<<<<<<< HEAD

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

        [HttpPut("updateLocation/{id}")]
        public async Task<IActionResult> updateLocation(int id, [FromBody]RiderLocation location)
        {
            try
            {
                var res = await _irider!.updateDefaultLocation(id, location);
                if (res == null) return NotFound();
                return Ok(res);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

      [HttpGet("allActive")]
        public async Task<IActionResult> getAllActive([FromQuery] SearchPaging props)
        {
            try
            {
                var riders = await _irider!.getAllActive(props);

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

<<<<<<< HEAD
=======
>>>>>>> 28d4101 (finished with rider and order)
=======
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
>>>>>>> 57dd2cb (rider commit)
    }
}
