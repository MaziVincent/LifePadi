using Api.DTO;
using Api.Models;
using API.DTO;
using API.Models;

namespace Api.Interfaces
{
    public interface IRider
    {
        public Task<PagedList<Rider>> getAllAsync(SearchPaging props);
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
        public Task<int> totalNumberOfRiders();
        public Task<int> totalNumberOfNonActiveRiders();
        public Task<int> totalNumberOfActiveRiders();
        public Task<int> totalNumberOfVerifiedRiders();
        public Task<int> totalNumberOfUnverifiedRiders();
        public Task<object> getRiderStats();
    }
}
