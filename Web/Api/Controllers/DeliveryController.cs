using Api.DTO;
using Api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DeliveryController : ControllerBase
    {
        private readonly IDelivery _idelivery;
        private readonly IMapper _mapper;
        private IConfiguration _config;
        public DeliveryController(IDelivery idelivery, IMapper mapper, IConfiguration configuration)
        {
            _idelivery = idelivery;
            _mapper = mapper;
            _config = configuration;
        }

        [HttpGet("all")]
        public async Task<IActionResult> all()
        {
            try
            {
                var deliveries = await _idelivery.allAsync();
                return Ok(deliveries);
            }
            catch (Exception ex)
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
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> create(DeliveryDto delivery)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Invalid request");
                var newDelivery = await _idelivery.createAsync(delivery);
                return Ok(newDelivery);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> delete(int id)
        {
            try
            {
                var response = await _idelivery.delete(id);
                if (response == null) return NotFound();
                return Ok(response);
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
                var delivery = await _idelivery.getAsync(id);
                if (delivery == null) return NotFound();
                return Ok(delivery);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("order/get/{orderId}")]
        public async Task<IActionResult> getOrderDelivery(int orderId)
        {
            try
            {
                var delivery = await _idelivery.getOrderDelivery(orderId);
                if (delivery == null) return NotFound();
                return Ok(delivery);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("rider/{riderId}")]
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
            }
            catch (Exception ex)
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
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> update(int id, [FromForm] DeliveryDto delivery)
        {
            try
            {
                var updatedDelivery = await _idelivery.updateAsync(delivery, id);
                if (updatedDelivery == null) return NotFound();
                return Ok(updatedDelivery);
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
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getfee")]
        public IActionResult CalculateDeliveryFee([FromQuery] DeliveryFeeDto delivery)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest("distance is required ");
            }
            if (delivery.Distance < 0)
            {
                return BadRequest("Distance cannot be less than 0");
            }

            // Parse price per kilometer with fallback
            if (!int.TryParse(_config.GetSection("Distance:Price_Per_Kilometer").Value, out int pricePerKilometer))
            {
                pricePerKilometer = 100; // Default price per kilometer
            }

            if (delivery.DiscountPercentage != null && delivery.DiscountAmount != null)
            {
                return BadRequest("Only one discount type is allowed");
            }
            if (delivery.DiscountPercentage != null)
            {
                if (delivery.DiscountPercentage > 100)
                {
                    return BadRequest("Discount percentage cannot be greater than 100");
                }


                double deliveryFeeAfterPercentageDiscount = (double)((1000 + (delivery.Distance * pricePerKilometer)) * (delivery.DiscountPercentage / 100));
                return Ok(new { DeliveryFee = deliveryFeeAfterPercentageDiscount });
            }
            if (delivery.DiscountAmount != null)
            {
                if (delivery.DiscountAmount < 0)
                {
                    return BadRequest("Discount amount cannot be less than 0");
                }
                double deliveryFeeAfterAmountDiscount = 1000 + (delivery.Distance * pricePerKilometer) - (double)delivery.DiscountAmount;
                return Ok(new { DeliveryFee = deliveryFeeAfterAmountDiscount });
            }



            double DeliveryFee = 1000 + (delivery.Distance * pricePerKilometer);

            return Ok(new { DeliveryFee });

        }
    }
}
