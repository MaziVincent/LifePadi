using Api.DTO;

namespace Api.Interfaces
{
    public interface IOrder
    {
        public Task<DataTotalNumber> allAsync();
        public Task<IEnumerable<OrderDTOLite>> allOrderLite();
        public Task<OrderDTO> createAsync(OrderDTO order);
        public Task<OrderDTO> updateAsync(OrderDTO order, int id);
        public Task<string> deleteAsync(int id);
        public Task<OrderDTO> getAsync(int id);
        public Task<IEnumerable<OrderItemDTOLite>> orderItemLites(int id);
        public Task<IEnumerable<OrderDTO>> customerOrders(int customerId);
        //public Task<IEnumerable<OrderDTO>> riderOrders(int riderId);
        public Task<OrderDTO> updateOrderStatus(int id, string status);
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
