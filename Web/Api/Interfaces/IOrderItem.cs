using Api.DTO;

namespace Api.Interfaces
{
    public interface IOrderItem
    {
<<<<<<< HEAD
<<<<<<< HEAD
        public Task<DataTotalNumber> allAsync();
        public Task<DataTotalNumber> allOrderItemLiteAsync();
        public Task<OrderItemDto> getAsync(int id);
        public Task<OrderItemDto> updateAsync( OrderItemDto orderItem ,int id);
<<<<<<< HEAD
        public Task<string> deleteAsync(int id);
        public Task<OrderItemDto> createAsync(OrderItemDto orderItem);
        public Task<int> totalNumberOfOrderItems();
=======
        public Task<IEnumerable<OrderItemDTO>> allAsync();
        public Task<IEnumerable<OrderItemDTOLite>> allOrderItemLiteAsync();
=======
        public Task<DataTotalNumber> allAsync();
        public Task<DataTotalNumber> allOrderItemLiteAsync();
>>>>>>> 4641615 (finished with delivery service and controller)
        public Task<OrderItemDTO> getAsync(int id);
        public Task<OrderItemDTO> updateAsync( OrderItemDTO orderItem ,int id);
        public Task<string> deleteAsync(int id);
        public Task<OrderItemDTO> createAsync(OrderItemDTO orderItem);
<<<<<<< HEAD
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
=======
        public Task<string> deleteAsync(int id);
        public Task<OrderItemDto> createAsync(OrderItemDto orderItem);
>>>>>>> 836ec36 (changed all DTO to Dto)
        public Task<int> totalNumberOfOrderItems();
>>>>>>> 98415b4 (done with dashboard)
    }
}
