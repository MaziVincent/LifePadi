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
            IVoucher voucher
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
        }
    }
}
