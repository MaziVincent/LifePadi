using Api.DTO;
using Api.Models;
using Api.Services;

namespace Api.Interfaces
{
    public interface IOrder
    {
        public Task<PagedList<Order>> allAsync(SearchPaging props);
        public Task<IEnumerable<OrderDtoLite>> allOrderLite();
        public Task<OrderDto> createAsync(OrderDto order);
        public Task<OrderDto> updateAsync(OrderDto order, int id);
        public Task<string> deleteAsync(int id);
        public Task<SingleOrderDto> getAsync(int id);
        public Task<IEnumerable<OrderItemDtoLite>> orderItemLites(int id);
        public Task<PagedList<SingleOrderDto>> customerOrders(int id, SearchPaging props);
        //public Task<IEnumerable<OrderDto>> riderOrders(int riderId);
        public Task<OrderDto> updateOrderStatus(int id, string status);
        public Task<int> totalNumberOfOrders();
        public Task<int> totalNumberOfPendingOrders();
        public Task<int> totalNumberOfDeliveredOrders();
        public Task<int> totalNumberOfCancelledOrders();
        public Task<int> totalNumberOfOrdersToday();
        public Task<int> totalNumberOfOrdersThisMonth();
        public Task<int> totalNumberOfOrdersThisYear();
        public Task<int> totalNumberOfClosedOrders();
        public Task<object> orderStats();
    }
}
