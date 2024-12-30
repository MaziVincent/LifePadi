using Api.DTO;

namespace Api.Interfaces
{
    public interface IOrderItem
    {
        public Task<DataTotalNumber> allAsync();
        public Task<DataTotalNumber> allOrderItemLiteAsync();
        public Task<OrderItemDto> getAsync(int id);
        public Task<OrderItemDto> updateAsync( OrderItemDto orderItem ,int id);
        public Task<string> deleteAsync(int id);
        public Task<OrderItemDto> createAsync(OrderItemDto orderItem);
        public Task<int> totalNumberOfOrderItems();
    }
}
