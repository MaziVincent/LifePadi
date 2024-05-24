using Api.DTO;

namespace Api.Interfaces
{
    public interface IRider
    {
        public Task<IEnumerable<GetRiderDTO>> getAllAsync(int pageNumber, int pageSize, string searchString);
        public Task<GetRiderDTO> getAsync(int id);
        public Task<GetRiderDTO> updateAsync(CreateRiderDTO rider, int id);
        public Task<string> deleteAsync(int id);
        public Task<AuthRiderDTO> createAsync(CreateRiderDTO rider);
        public Task<IEnumerable<OrderDTO>> orderLists(int id);
        public Task<IEnumerable<GetRiderDTO>> searchAsync(string searchString);
        public Task<IEnumerable<GetRiderDTO>> nonActiveRiders();
        public Task<IEnumerable<DeliveryDTOLite>> successfulDeliveries(int riderId);
        public Task<IEnumerable<DeliveryDTOLite>> unsuccessfulDeliveries(int riderId);
        public Task<IEnumerable<OrderDTO>> getRiderOrders(int id);
        public Task<IEnumerable<DeliveryDTO>> getRiderDeliveries(int id);
        public Task<GetRiderDTO> uploadRiderIdentityImg(int id, IFormFile riderIdendityImg);
        public Task<string> activateRider(int id);
        public Task<string> verifyRider(int id);
        public Task<string> deactivateRider(int id);
    }
}
