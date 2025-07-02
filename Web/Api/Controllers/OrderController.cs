using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Api.Services;
using Api.Exceptions;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrder _iorder;
        private readonly IMapper _mapper;
        private readonly ILogger<OrderController> _logger;
        public OrderController(IOrder iorder, IMapper mapper, ILogger<OrderController> logger)
        {
            _iorder = iorder;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("all")]
        public async Task<IActionResult> all([FromQuery] SearchPaging props)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(all),
                ["PageSize"] = props?.PageSize ?? 0,
                ["PageNumber"] = props?.PageNumber ?? 0
            });

            _logger.LogInformation("Retrieving all orders with pagination");

            props ??= new SearchPaging();
            var orders = await _iorder.allAsync(props);
            var result = _mapper.Map<List<OrderDto>>(orders);
            var dataList = new
            {
                orders.PageSize,
                orders.TotalPages,
                orders.TotalCount,
                orders.CurrentPage
            };

            var response = new { result, dataList };
            _logger.LogInformation("Retrieved {Count} orders from {TotalCount} total", result.Count, orders.TotalCount);

            return Ok(ApiResponse<object>.CreateSuccess(response, "Orders retrieved successfully"));
        }

        [HttpGet("allLite")]
        public async Task<IActionResult> allLite()
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(allLite)
            });

            _logger.LogInformation("Retrieving all orders lite");

            var orders = await _iorder.allOrderLite();

            _logger.LogInformation("Retrieved {Count} lite orders", orders?.Count() ?? 0);
            return Ok(ApiResponse<object>.CreateSuccess((object)(orders ?? Enumerable.Empty<object>()), "Orders retrieved successfully"));
        }

        [HttpPost("create")]
        public async Task<IActionResult> create(OrderDto order)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(create),
                ["CustomerId"] = order?.CustomerId ?? 0
            });

            _logger.LogInformation("Creating new order");

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state for order creation");
                var errors = ModelState
                    .Where(x => x.Value?.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value?.Errors.Select(e => e.ErrorMessage).ToArray() ?? Array.Empty<string>()
                    );
                throw new ValidationException("Order validation failed", errors);
            }

            if (order == null)
            {
                _logger.LogWarning("Order creation request with null data");
                throw new ValidationException("Order data is required");
            }

            var newOrder = await _iorder.createAsync(order);

            if (newOrder == null)
            {
                _logger.LogError("Order creation failed - service returned null");
                throw new BusinessRuleException("Failed to create order");
            }

            _logger.LogInformation("Order created successfully with ID: {OrderId}", newOrder.Id);
            return Ok(ApiResponse<object>.CreateSuccess(newOrder, "Order created successfully"));
        }

        [HttpGet("customer/{id}")]
        public async Task<IActionResult> customerOrders(int id, [FromQuery] SearchPaging props)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(customerOrders),
                ["CustomerId"] = id,
                ["PageSize"] = props?.PageSize ?? 0,
                ["PageNumber"] = props?.PageNumber ?? 0
            });

            _logger.LogInformation("Retrieving orders for customer: {CustomerId}", id);

            if (id <= 0)
            {
                _logger.LogWarning("Invalid customer ID provided: {CustomerId}", id);
                throw new ValidationException("Valid customer ID is required");
            }

            props ??= new SearchPaging();
            var orders = await _iorder.customerOrders(id, props);
            var dataList = new
            {
                orders.PageSize,
                orders.TotalPages,
                orders.TotalCount,
                orders.CurrentPage
            };

            var response = new { orders, dataList };
            _logger.LogInformation("Retrieved {Count} orders for customer: {CustomerId}", orders?.Count() ?? 0, id);

            return Ok(ApiResponse<object>.CreateSuccess(response, "Customer orders retrieved successfully"));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> delete(int id)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(delete),
                ["OrderId"] = id
            });

            _logger.LogInformation("Deleting order: {OrderId}", id);

            if (id <= 0)
            {
                _logger.LogWarning("Invalid order ID provided for deletion: {OrderId}", id);
                throw new ValidationException("Valid order ID is required");
            }

            var response = await _iorder.deleteAsync(id);
            if (response == null)
            {
                _logger.LogWarning("Order not found for deletion: {OrderId}", id);
                throw new ResourceNotFoundException("Order", id);
            }

            _logger.LogInformation("Order deleted successfully: {OrderId}", id);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Order deleted successfully"));
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> get(int id)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(get),
                ["OrderId"] = id
            });

            _logger.LogInformation("Retrieving order: {OrderId}", id);

            if (id <= 0)
            {
                _logger.LogWarning("Invalid order ID provided: {OrderId}", id);
                throw new ValidationException("Valid order ID is required");
            }

            var order = await _iorder.getAsync(id);
            if (order == null)
            {
                _logger.LogWarning("Order not found: {OrderId}", id);
                throw new ResourceNotFoundException("Order", id);
            }

            _logger.LogInformation("Order retrieved successfully: {OrderId}", id);
            return Ok(ApiResponse<object>.CreateSuccess(order, "Order retrieved successfully"));
        }


        [HttpGet("orderItems/{id}")]
        public async Task<IActionResult> orderItems(int id)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = "GetOrderItems",
                ["OrderId"] = id
            });

            _logger.LogInformation("Retrieving order items for order: {OrderId}", id);

            if (id <= 0)
            {
                _logger.LogWarning("Invalid order ID provided for order items: {OrderId}", id);
                throw new ValidationException("Valid order ID is required");
            }

            var orderItemsList = await _iorder.orderItemLites(id);

            _logger.LogInformation("Retrieved {Count} order items for order: {OrderId}", orderItemsList?.Count() ?? 0, id);
            return Ok(ApiResponse<object>.CreateSuccess((object)(orderItemsList ?? Enumerable.Empty<object>()), "Order items retrieved successfully"));
        }

        //[HttpGet("rider/{riderId}/getOrders")]
        //public async Task<IActionResult> getRiderOrders(int riderId)


        [HttpPut("update/{id}")]
        public async Task<IActionResult> update(int id, [FromForm] OrderDto order)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(update),
                ["OrderId"] = id
            });

            _logger.LogInformation("Updating order: {OrderId}", id);

            if (id <= 0)
            {
                _logger.LogWarning("Invalid order ID provided for update: {OrderId}", id);
                throw new ValidationException("Valid order ID is required");
            }

            if (order == null)
            {
                _logger.LogWarning("Order update request with null data for OrderId: {OrderId}", id);
                throw new ValidationException("Order data is required");
            }

            var updateOrder = await _iorder.updateAsync(order, id);
            if (updateOrder == null)
            {
                _logger.LogWarning("Order not found for update: {OrderId}", id);
                throw new ResourceNotFoundException("Order", id);
            }

            _logger.LogInformation("Order updated successfully: {OrderId}", id);
            return Ok(ApiResponse<object>.CreateSuccess(updateOrder, "Order updated successfully"));
        }

        [HttpPut("updateStatus/{id}")]
        public async Task<IActionResult> updateStatus(int id, [FromQuery] string status)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(updateStatus),
                ["OrderId"] = id,
                ["Status"] = status ?? "N/A"
            });

            _logger.LogInformation("Updating order status: {OrderId} to {Status}", id, status);

            if (id <= 0)
            {
                _logger.LogWarning("Invalid order ID provided for status update: {OrderId}", id);
                throw new ValidationException("Valid order ID is required");
            }

            if (string.IsNullOrWhiteSpace(status))
            {
                _logger.LogWarning("Empty status provided for order status update: {OrderId}", id);
                throw new ValidationException("Status is required");
            }

            var order = await _iorder.updateOrderStatus(id, status);
            if (order == null)
            {
                _logger.LogWarning("Order not found for status update: {OrderId}", id);
                throw new ResourceNotFoundException("Order", id);
            }

            _logger.LogInformation("Order status updated successfully: {OrderId} to {Status}", id, status);
            return Ok(ApiResponse<object>.CreateSuccess(order, "Order status updated successfully"));
        }


    }

}
