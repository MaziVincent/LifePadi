using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers.Admin
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly IOrder _order;
        private readonly IOrderItem _orderItem;
        private readonly IDelivery _delivery;
        private readonly IRider _rider;
        private readonly ITransaction _transaction;
        private readonly IVendor _vendor;
        private readonly ICustomer _customer;
        private readonly IService _service;
        private readonly ICategory _category;
        private readonly IVoucher _voucher;
        private readonly IProduct _product;
        private readonly IUser _user;
        public DashboardController(
            IOrder order,
            IOrderItem orderItem,
            IDelivery delivery,
            IRider rider,
            ITransaction transaction,
            IVendor vendor,
            ICustomer customer,
            IService service,
            ICategory category,
            IVoucher voucher,
            IProduct product,
            IUser user
            )
        {
            _order = order;
            _orderItem = orderItem;
            _delivery = delivery;
            _rider = rider;
            _transaction = transaction;
            _vendor = vendor;
            _customer = customer;
            _service = service;
            _category = category;
            _voucher = voucher;
            _product = product;
            _user = user;
        }

        [HttpGet("numberOfRiders")]
        public async Task<IActionResult> no_of_riders()
        {
            try
            {
                var no_of_riders = await _rider.totalNumberOfRiders();
                return Ok(no_of_riders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("numberOfActiveRiders")]
        public async Task<IActionResult> no_of_active_riders()
        {
            try
            {
                var no_of_active_riders = await _rider.totalNumberOfActiveRiders();
                return Ok(no_of_active_riders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("numberOfNonActiveRiders")]
        public async Task<IActionResult> no_of_non_active_riders()
        {
            try
            {
                var no_of_non_active_riders = await _rider.totalNumberOfNonActiveRiders();
                return Ok(no_of_non_active_riders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("numberOfVerifiedRiders")]
        public async Task<IActionResult> no_of_verified_riders()
        {
            try
            {
                var no_of_verified_riders = await _rider.totalNumberOfVerifiedRiders();
                return Ok(no_of_verified_riders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("numberOfUnverifiedRiders")]
        public async Task<IActionResult> no_of_unverified_riders()
        {
            try
            {
                var no_of_unverified_riders = await _rider.totalNumberOfUnverifiedRiders();
                return Ok(no_of_unverified_riders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("riderStats")]
        public async Task<IActionResult> getStatus()
        {
            try
            {
                var stats = await _rider.getRiderStats();
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //category
        [HttpGet("numberOfCategories")]
        public async Task<IActionResult> no_of_categories()
        {
            try
            {
                var no_of_categories = await _category.numberOfCategories();
                return Ok(no_of_categories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("categoryStats")]
        public async Task<IActionResult> getCategoryStats()
        {
            try
            {
                var stats = await _category.categoryStats();
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //customer
        [HttpGet("numberOfCustomers")]
        public async Task<IActionResult> no_of_customers()
        {
            try
            {
                var no_of_customers = await _customer.numberOfCustomers();
                return Ok(no_of_customers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Delivery
        [HttpGet("deliveryStats")]
        public async Task<IActionResult> deliveryStats()
        {
            try
            {
                var stats = await _delivery.deliveryStats();
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //order
        [HttpGet("orderStats")]
        public async Task<IActionResult> orderStats()
        {
            try
            {
                var stats = await _order.orderStats();
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //orderItem
        [HttpGet("orderItemStats")]
        public async Task<IActionResult> orderItemStats()
        {
            try
            {
                var stats = await _orderItem.totalNumberOfOrderItems();
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //product
        [HttpGet("numberOfProducts")]
        public async Task<IActionResult> no_of_products()
        {
            try
            {
                var no_of_products = await _product.totalNumberOfProducts();
                return Ok(no_of_products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{vendorId}/numberOfProducts")]
        public async Task<IActionResult> no_of_products_by_vendor(int vendorId)
        {
            try
            {
                var no_of_products = await _product.totalNumberOfProductsByVendor(vendorId);
                return Ok(no_of_products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{categoryId}/totalNumberOfProducts")]
        public async Task<IActionResult> no_of_products_by_category(int categoryId)
        {
            try
            {
                var no_of_products = await _product.totalNumberOfProductsByCategory(categoryId);
                return Ok(no_of_products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //service
        [HttpGet("serviceStats")]
        public async Task<IActionResult> serviceStats()
        {
            try
            {
                var stats = await _service.serviceStats();
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //transaction
        [HttpGet("transactionStats")]
        public async Task<IActionResult> transactionStats()
        {
            try
            {
                var stats = await _transaction.TransactionStats();
                return Ok(stats);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //user
        [HttpGet("totalNumberOfUsers")]
        public async Task<IActionResult> total_number_of_users()
        {
            try
            {
                var response = await _user.totalNumberOfUsers();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //vendor
        [HttpGet("totalNumberOfVendors")]
        public async Task<IActionResult> totalNumberOfVendors()
        {
            try
            {
                var response = await _vendor.totalNumberOfVendors();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //voucher
        [HttpGet("voucherStats")]
        public async Task<IActionResult> voucherStat()
        {
            try
            {
                var response = await _voucher.voucherStats();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
