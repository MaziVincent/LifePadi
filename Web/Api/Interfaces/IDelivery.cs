using Api.DTO;

namespace Api.Interfaces
{
    public interface IDelivery
    {
        public Task<IEnumerable<DeliveryDto>> allAsync();
        public Task<IEnumerable<DeliveryDtoLite>> allDeliveryLiteAsync();
        public Task<DeliveryDto> getAsync(int id);
        public Task<DeliveryDto> updateAsync(DeliveryDto delivery, int id);
        public Task<string> delete(int id);
        public Task<IEnumerable<DeliveryDto>> getWithStatus(string status);
        public Task<IEnumerable<DeliveryDtoLite>> getunSuccessfulDelivery();
        public Task<IEnumerable<DeliveryDto>> getRidersDeliveries(int riderId);
        public Task<DeliveryDto> getOrderDelivery(int orderId);
        public Task<CreateDeliveryDto> createAsync(DeliveryDto delivery);
        public Task<string> assynRiderTODelivery(int id, int riderId);
        public Task<int> totalNumberOfDeliveries();
        public Task<int> totalNumberOfSuccessfulDeliveries();
        public Task<int> totalNumberOfUnSuccessfulDeliveries();
        public Task<int> totalNumberOfPendingDeliveries();
        public Task<int> totalNumberOfDeliveriesByRider(int riderId);
        public Task<object> deliveryStats();
    }
}
