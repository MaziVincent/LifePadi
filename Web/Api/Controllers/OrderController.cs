using Api.DTO;
using Api.Interfaces;
using API.DTO;
using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
<<<<<<< HEAD
using AutoMapper;
using Api.Services;
=======
>>>>>>> 28d4101 (finished with rider and order)
=======
using AutoMapper;
>>>>>>> 4dc5d34 (worked on product component)

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrder _iorder;
<<<<<<< HEAD
<<<<<<< HEAD
        private readonly IMapper _mapper;
        public OrderController(IOrder iorder, IMapper mapper)
        {
            _iorder = iorder;
            _mapper = mapper;
        }

        [HttpGet("all")]
        public async Task<IActionResult> all([FromQuery] SearchPaging props)
        {
            try
            {
                var orders = await _iorder.allAsync(props);
                var result = _mapper.Map<List<OrderDto>>(orders);
                var dataList = new
                {
                    orders.PageSize,
                    orders.TotalPages,
                    orders.TotalCount,
                    orders.CurrentPage
                };
                return Ok(new { result, dataList });
            }
            catch (Exception ex)
=======
        public OrderController(IOrder iorder)
=======
        private readonly IMapper _mapper;
        public OrderController(IOrder iorder, IMapper mapper)
>>>>>>> 4dc5d34 (worked on product component)
        {
            _iorder = iorder;
            _mapper = mapper;
        }

        [HttpGet("all")]
        public async Task<IActionResult> all([FromQuery] SearchPaging props)
        {
            try
            {
                var orders = await _iorder.allAsync(props);
                var result = _mapper.Map<List<OrderDto>>(orders);
                var dataList = new {
                    orders.PageSize,
                    orders.TotalPages,
                    orders.TotalCount,
                    orders.CurrentPage
                };
                return Ok(new {result, dataList});
            }catch (Exception ex)
>>>>>>> 28d4101 (finished with rider and order)
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
<<<<<<< HEAD
            }
            catch (Exception ex)
            {
=======
            }catch (Exception ex) 
            { 
>>>>>>> 28d4101 (finished with rider and order)
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IActionResult> create(OrderDto order)
        {
            try
            {
                if(!ModelState.IsValid){
                    return BadRequest();
                }
                
                var newOrder = await _iorder.createAsync(order);
                return Ok(newOrder);
            }
            catch (Exception ex)
=======
        public async Task<IActionResult> create([FromForm] OrderDTO order)
=======
        public async Task<IActionResult> create([FromForm] OrderDto order)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var newOrder = await _iorder.createAsync(order);
                return Ok(newOrder);
            }catch (Exception ex)
>>>>>>> 28d4101 (finished with rider and order)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpGet("customer/{id}")]
        public async Task<IActionResult> customerOrders(int id, [FromQuery] SearchPaging props)
        {
            try
            {
                var orders = await _iorder.customerOrders(id, props);
                // var result = _mapper.Map<List<OrderDto>>(orders);
                var dataList = new
                {
                    orders.PageSize,
                    orders.TotalPages,
                    orders.TotalCount,
                    orders.CurrentPage
                };
                return Ok(new { orders, dataList });
            }
            catch (Exception ex)
=======
        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> customerOrders(int customerId)
        {
            try
            {
                var orders = await _iorder.customerOrders(customerId);
                return Ok(orders);
            }catch (Exception ex)
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
        public async Task<IActionResult> delete(int id)
        {
            try
            {
                var response = await _iorder.deleteAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
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
        [HttpGet("get/{id}")]
=======
        [HttpGet("{id}/get")]
>>>>>>> 28d4101 (finished with rider and order)
=======
        [HttpGet("get/{id}")]
>>>>>>> 4dc5d34 (worked on product component)
        public async Task<IActionResult> get(int id)
        {
            try
            {
                var order = await _iorder.getAsync(id);
                if (order == null) return NotFound();
                return Ok(order);
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
        [HttpGet("orderItems/{id}")]
=======
        [HttpGet("{id}/orderItems")]
>>>>>>> 28d4101 (finished with rider and order)
        public async Task<IActionResult> orderItems(int id)
        {
            try
            {
                var orderItems = await _iorder.orderItemLites(id);
                return Ok(orderItems);
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
        //[HttpGet("rider/{riderId}/getOrders")]
        //public async Task<IActionResult> getRiderOrders(int riderId)


        [HttpPut("update/{id}")]
        public async Task<IActionResult> update(int id, [FromForm] OrderDto order)
=======
        [HttpGet("rider/{riderId}/getOrders")]
        public async Task<IActionResult> getRiderOrders(int riderId)
        {
            try
            {
                var orders = await _iorder.riderOrders(riderId);
                return Ok(orders);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
=======
        //[HttpGet("rider/{riderId}/getOrders")]
        //public async Task<IActionResult> getRiderOrders(int riderId)
        
>>>>>>> 4641615 (finished with delivery service and controller)

        [HttpPut("{id}/update")]
<<<<<<< HEAD
        public async Task<IActionResult> update(int id, [FromForm] OrderDTO order)
>>>>>>> 28d4101 (finished with rider and order)
=======
        public async Task<IActionResult> update(int id, [FromForm] OrderDto order)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var updateOrder = await _iorder.updateAsync(order, id);
                if (updateOrder == null) return NotFound();
                return Ok(updateOrder);
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
        [HttpPut("updateStatus/{id}")]
=======
        [HttpPut("{id}/updateStatus")]
>>>>>>> 28d4101 (finished with rider and order)
        public async Task<IActionResult> updateStatus(int id, [FromQuery] string status)
        {
            try
            {
                var order = await _iorder.updateOrderStatus(id, status);
                if (order == null) return NotFound();
                return Ok(order);
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

         
=======
>>>>>>> 28d4101 (finished with rider and order)
    }

}
