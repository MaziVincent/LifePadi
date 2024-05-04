using Api.DTO;

namespace Api.Interfaces
{
    public interface IRider
    {
        public Task<IEnumerable<RiderDTO>> getAllAsync();
        public Task<RiderDTO> getAsync(int id);
        public Task<RiderDTO> updateAsync(RiderDTO rider, int id);
        public Task<string> deleteAsync(int id);
        public Task<AuthUserDTO> createAsync(RiderDTO rider);
        public Task<IEnumerable<OrderDTO>> orderLists(int id);
        public Task<IEnumerable<RiderDTO>> searchAsync(string searchString);
        public Task<IEnumerable<OrderDTO>> nonActiveRiders();
        public Task<IEnumerable<DeliveryDTOLite>> successfulDeliveries(int id);
        public Task<IEnumerable<DeliveryDTOLite>> unsuccessfulDeliveries(int id);
    }
}
