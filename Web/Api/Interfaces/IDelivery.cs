using Api.DTO;

namespace Api.Interfaces
{
    public interface IDelivery
    {
        public Task<IEnumerable<DeliveryDTO>> allAsync();
        public Task<IEnumerable<DeliveryDTOLite>> allDeliveryLiteAsync();
        public Task<DeliveryDTO> getAsync(int id);
        public Task<DeliveryDTO> updateAsync(DeliveryDTO delivery, int id);
        public Task<string> delete(int id);
        public Task<IEnumerable<DeliveryDTO>> getWithStatus(string status);
        public Task<IEnumerable<DeliveryDTOLite>> getunSuccessfulDelivery();
        public Task<IEnumerable<DeliveryDTO>> getRidersDeliveries(int riderId);
        public Task<DeliveryDTO> getOrderDelivery(int orderId);
        public Task<CreateDeliveryDTO> createAsync(DeliveryDTO delivery);
        public Task<string> assynRiderTODelivery(int id, int riderId);
    }
}
