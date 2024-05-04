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
        public Task<IEnumerable<DeliveryDTOLite>> getSuccessDelivery(string status);
        public Task<IEnumerable<DeliveryDTOLite>> getunSuccessfulDelivery(string status);

    }
}
