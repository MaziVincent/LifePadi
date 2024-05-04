using Api.DTO;

namespace Api.Interfaces
{
    public interface IOrderItem
    {
<<<<<<< HEAD
        public Task<DataTotalNumber> allAsync();
        public Task<DataTotalNumber> allOrderItemLiteAsync();
        public Task<OrderItemDto> getAsync(int id);
        public Task<OrderItemDto> updateAsync( OrderItemDto orderItem ,int id);
        public Task<string> deleteAsync(int id);
        public Task<OrderItemDto> createAsync(OrderItemDto orderItem);
        public Task<int> totalNumberOfOrderItems();
=======
        public Task<IEnumerable<OrderItemDTO>> allAsync();
        public Task<IEnumerable<OrderItemDTOLite>> allOrderItemLiteAsync();
        public Task<OrderItemDTO> getAsync(int id);
        public Task<OrderItemDTO> updateAsync( OrderItemDTO orderItem ,int id);
        public Task<string> deleteAsync(int id);
        public Task<OrderItemDTO> createAsync(OrderItemDTO orderItem);
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    }
}
