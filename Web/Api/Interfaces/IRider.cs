using Api.DTO;
using Api.Models;
using Api.Services;

namespace Api.Interfaces
{
    public interface IRider
    {
        public Task<PagedList<Rider>> getAllAsync(SearchPaging props);
        public Task<GetRiderDto> getAsync(int id);
        public Task<GetRiderDto> updateAsync(CreateRiderDto rider, int id);
        public Task<string> deleteAsync(int id);
        public Task<AuthRiderDto> createAsync(CreateRiderDto rider);
        public Task<IEnumerable<OrderDto>> orderLists(int id);
        public Task<IEnumerable<GetRiderDto>> searchAsync(string searchString);
        public Task<IEnumerable<GetRiderDto>> nonActiveRiders();
        public Task<IEnumerable<DeliveryDtoLite>> successfulDeliveries(int riderId);
        public Task<IEnumerable<DeliveryDtoLite>> pendingDeliveries(int riderId);
        public Task<PagedList<Order>> getRiderOrders(SearchPaging props, int id);
        public Task<IEnumerable<DeliveryDto>> getRiderDeliveries(int id);
        public Task<GetRiderDto> uploadRiderIdentityImg(int id, IFormFile riderIdendityImg);
        public Task<object> activateRider(int id);
        public Task<string> toggleRiderStatus(int id);
        public Task<string> verifyRider(int id);
        public Task<object> deactivateRider(int id);
        public Task<int> totalNumberOfRiders();
        public Task<int> totalNumberOfNonActiveRiders();
        public Task<int> totalNumberOfActiveRiders();
        public Task<int> totalNumberOfVerifiedRiders();
        public Task<int> totalNumberOfUnverifiedRiders();
        public Task<object> getRiderStats();
    }
}
