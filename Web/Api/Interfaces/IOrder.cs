using Api.DTO;

namespace Api.Interfaces
{
    public interface IOrder
    {
        public Task<IEnumerable<OrderDTO>> allAsync();
        public Task<IEnumerable<OrderDTOLite>> allOrderLite();
        public Task<OrderDTO> createAsync(OrderDTO order);
        public Task<OrderDTO> updateAsync(OrderDTO order, int id);
        public Task<string> deleteAsync(int id);
        public Task<OrderDTO> getAsync(int id);
        public Task<IEnumerable<OrderItemDTOLite>> orderItemDLites(int id);
    }
}
