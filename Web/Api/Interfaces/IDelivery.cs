using Api.DTO;
<<<<<<< HEAD
using Api.Models;
using Api.Services;
=======
>>>>>>> 9a80707 (created the interfaces and the DTOs)

namespace Api.Interfaces
{
    public interface IDelivery
    {
<<<<<<< HEAD
        public Task<IEnumerable<DeliveryDto>> allAsync();
        public Task<IEnumerable<DeliveryDtoLite>> allDeliveryLiteAsync();
        public Task<DeliveryDto> getAsync(int id);
        public Task<DeliveryDto> updateAsync(DeliveryDto delivery, int id);
        public Task<string> updateStatus(string status, int id);
        public Task<string> delete(int id);
        public Task<IEnumerable<DeliveryDto>> getWithStatus(string status);
        public Task<IEnumerable<DeliveryDtoLite>> getunSuccessfulDelivery();
        public Task<PagedList<DeliveryDto>> getRidersDeliveries(int riderId, SearchPaging props);
        public Task<DeliveryDto> getOrderDelivery(int orderId);
        public Task<CreateDeliveryDto> createAsync(DeliveryDto delivery);
        public Task<string> assynRiderTODelivery(int id, int riderId);
        public Task<int> totalNumberOfDeliveries();
        public Task<int> totalNumberOfSuccessfulDeliveries();
        public Task<int> totalNumberOfUnSuccessfulDeliveries();
        public Task<int> totalNumberOfPendingDeliveries();
        public Task<int> totalNumberOfDeliveriesByRider(int riderId);
        public Task<object> deliveryStats();
        public Task<IEnumerable<DeliveryDto>> getWithStatusForRider(int riderId, string status);
        public Task<object> getWithStatusForRiderCount(int riderId);
        public Task<string> updateDeliveryStatusOrderStatus(int deliveryId, int orderId, string deliveryStatus);
        public Task<int> totalNumberOfPendingDeliveriesByRider(int riderId);
        public Task<int> totalNumberOfSuccessfulDeliveriesByRider(int riderId);
        public Task<DeliveryDto> getCustomersOrder(int customerId);
=======
        public Task<IEnumerable<DeliveryDTO>> allAsync();
        public Task<IEnumerable<DeliveryDTOLite>> allDeliveryLiteAsync();
        public Task<DeliveryDTO> getAsync(int id);
        public Task<DeliveryDTO> updateAsync(DeliveryDTO delivery, int id);
        public Task<string> delete(int id);
        public Task<IEnumerable<DeliveryDTOLite>> getSuccessDelivery(string status);
        public Task<IEnumerable<DeliveryDTOLite>> getunSuccessfulDelivery(string status);

>>>>>>> 9a80707 (created the interfaces and the DTOs)
    }
}
