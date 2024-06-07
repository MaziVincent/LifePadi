using Api.DTO;
using Api.Interfaces;
<<<<<<< HEAD
using AutoMapper;
=======
>>>>>>> 4641615 (finished with delivery service and controller)
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeliveryController : ControllerBase
    {
        private readonly IDelivery _idelivery;
<<<<<<< HEAD
        private readonly IMapper _mapper;
        public DeliveryController(IDelivery idelivery, IMapper mapper)
        {
            _idelivery = idelivery;
            _mapper = mapper;
=======
        public DeliveryController(IDelivery idelivery) 
        { 
            _idelivery = idelivery;
>>>>>>> 4641615 (finished with delivery service and controller)
        }

        [HttpGet("all")]
        public async Task<IActionResult> all()
        {
            try
            {
                var deliveries = await _idelivery.allAsync();
                return Ok(deliveries);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> 4641615 (finished with delivery service and controller)
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
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> 4641615 (finished with delivery service and controller)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IActionResult> create(DeliveryDto delivery)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Invalid request");
                var newDelivery = await _idelivery.createAsync(delivery);
                return Ok(newDelivery);
            }
            catch (Exception ex)
=======
        public async Task<IActionResult> create([FromForm] DeliveryDTO delivery)
=======
        public async Task<IActionResult> create([FromForm] DeliveryDto delivery)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Invalid form");
                var newDelivery = await _idelivery.createAsync(delivery);
                return Ok(newDelivery);
            }catch (Exception ex)
>>>>>>> 4641615 (finished with delivery service and controller)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpDelete("delete/{id}")]
=======
        [HttpDelete("{id}/delete")]
>>>>>>> 4641615 (finished with delivery service and controller)
        public async Task<IActionResult> delete(int id)
        {
            try
            {
                var response = await _idelivery.delete(id);
                if (response == null) return NotFound();
                return Ok(response);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> 4641615 (finished with delivery service and controller)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpGet("get/{id}")]
=======
        [HttpGet("{id}/get")]
>>>>>>> 4641615 (finished with delivery service and controller)
        public async Task<IActionResult> get(int id)
        {
            try
            {
                var delivery = await _idelivery.getAsync(id);
                if (delivery == null) return NotFound();
                return Ok(delivery);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> 4641615 (finished with delivery service and controller)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpGet("order/get/{orderId}")]
=======
        [HttpGet("order/{orderId}/get")]
>>>>>>> 4641615 (finished with delivery service and controller)
        public async Task<IActionResult> getOrderDelivery(int orderId)
        {
            try
            {
                var delivery = await _idelivery.getOrderDelivery(orderId);
                if (delivery == null) return NotFound();
                return Ok(delivery);
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> 4641615 (finished with delivery service and controller)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("rider/{riderId}")]
<<<<<<< HEAD
        public async Task<IActionResult> getRiderDeliveries(int riderId, [FromQuery] SearchPaging props)
        {
            try
            {
                var deliveries = await _idelivery.getRidersDeliveries(riderId, props);
                if (deliveries == null) return NotFound();
                var result = _mapper.Map<List<DeliveryDto>>(deliveries);
                var dataList = new
                {
                    deliveries.TotalCount,
                    deliveries.TotalPages,
                    deliveries.PageSize,
                    deliveries.CurrentPage

                };
                return Ok(new { result, dataList });
            }
            catch (Exception ex)
=======
        public async Task<IActionResult> getRiderDeliveries(int riderId)
        {
            try
            {
                var deliveries = await _idelivery.getRidersDeliveries(riderId);
                if (deliveries == null) return NotFound();
                return Ok(deliveries);
            }catch (Exception ex)
>>>>>>> 4641615 (finished with delivery service and controller)
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
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> 4641615 (finished with delivery service and controller)
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
<<<<<<< HEAD
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> 4641615 (finished with delivery service and controller)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpPut("update/{id}")]
        public async Task<IActionResult> update(int id, [FromForm] DeliveryDto delivery)
=======
        [HttpPut("{id}/update")]
<<<<<<< HEAD
        public async Task<IActionResult> update(int id, [FromForm] DeliveryDTO delivery)
>>>>>>> 4641615 (finished with delivery service and controller)
=======
        public async Task<IActionResult> update(int id, [FromForm] DeliveryDto delivery)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var updatedDelivery = await _idelivery.updateAsync(delivery, id);
                if (updatedDelivery == null) return NotFound();
                return Ok(updatedDelivery);
<<<<<<< HEAD
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("assignRider/{id}/{riderId}")]
        public async Task<IActionResult> assignRiderToDelivery(int id, int riderId)
        {
            try
            {
                var delivery = await _idelivery.assynRiderTODelivery(id, riderId);
                if (delivery == null) return NotFound();
                return Ok(delivery);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("updateStatus/{id}")]
        public async Task<IActionResult> updateStatus(int id, [FromQuery] string status)
        {
            try
            {
                var response = await _idelivery.updateStatus(status, id);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getWithStatus/{riderId}")]
        public async Task<IActionResult> getWithStatusForRider(int riderId, [FromQuery] string status)
        {
            try
            {
                var response = await _idelivery.getWithStatusForRider(riderId, status);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getWithStatusCount/{riderId}")]
        public async Task<IActionResult> getWithStatusForRiderCount(int riderId)
        {
            try
            {
                var response = await _idelivery.getWithStatusForRiderCount(riderId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("updateBothStatus")]
        public async Task<IActionResult> updateBothStatus([FromQuery] int deliveryId, string deliveryStatus, int orderId)
        {
            try
            {
                var response = await _idelivery.updateDeliveryStatusOrderStatus(deliveryId, orderId, deliveryStatus);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("pending/rider/{riderId}")]
        public async Task<IActionResult> totalNumberOfPendingDeliveriesByRider(int riderId)
        {
            try
            {
                var response = await _idelivery.totalNumberOfPendingDeliveriesByRider(riderId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("successful/rider/{riderId}")]
        public async Task<IActionResult> totalNumberOfSuccessfulDeliveriesByRider(int riderId)
        {
            try
            {
                var response = await _idelivery.totalNumberOfSuccessfulDeliveriesByRider(riderId);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("customer-orders/{customerId}")]
        public async Task<IActionResult> getCustomersOrder(int customerId)
        {
            try
            {
                var response = await _idelivery.getCustomersOrder(customerId);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
=======
            }catch (Exception ex)
>>>>>>> 4641615 (finished with delivery service and controller)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/assignRider/{riderId}")]
        public async Task<IActionResult> assignRiderToDelivery(int id, int riderId)
        {
            try
            {
                var delivery = await _idelivery.assynRiderTODelivery(id, riderId);
                if (delivery == null) return NotFound();
                return Ok(delivery);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
