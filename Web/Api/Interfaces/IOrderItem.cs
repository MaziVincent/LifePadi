using Api.DTO;

namespace Api.Interfaces
{
    public interface IOrderItem
    {
        public Task<IEnumerable<OrderItemDTO>> allAsync();
        public Task<IEnumerable<OrderItemDTOLite>> allOrderItemLiteAsync();
        public Task<OrderItemDTO> getAsync(int id);
        public Task<OrderItemDTO> updateAsync( OrderItemDTO orderItem ,int id);
        public Task<string> deleteAsync(int id);
        public Task<OrderItemDTO> createAsync(OrderItemDTO orderItem);
    }
}
