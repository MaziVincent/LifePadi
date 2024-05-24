using Api.DTO;
<<<<<<< HEAD
using Api.Models;
using Api.Services;
=======
>>>>>>> 9a80707 (created the interfaces and the DTOs)

namespace Api.Interfaces
{
    public interface IOrder
    {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
        public Task<IEnumerable<OrderDTO>> allAsync();
=======
        public Task<DataTotalNumber> allAsync();
>>>>>>> 28d4101 (finished with rider and order)
        public Task<IEnumerable<OrderDTOLite>> allOrderLite();
        public Task<OrderDTO> createAsync(OrderDTO order);
        public Task<OrderDTO> updateAsync(OrderDTO order, int id);
        public Task<string> deleteAsync(int id);
        public Task<OrderDTO> getAsync(int id);
<<<<<<< HEAD
        public Task<IEnumerable<OrderItemDTOLite>> orderItemDLites(int id);
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public Task<IEnumerable<OrderItemDTOLite>> orderItemLites(int id);
        public Task<IEnumerable<OrderDTO>> customerOrders(int customerId);
        //public Task<IEnumerable<OrderDTO>> riderOrders(int riderId);
        public Task<OrderDTO> updateOrderStatus(int id, string status);
>>>>>>> 28d4101 (finished with rider and order)
    }
}
