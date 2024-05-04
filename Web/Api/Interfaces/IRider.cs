using Api.DTO;
<<<<<<< HEAD
using Api.Models;
using Api.Services;
=======
>>>>>>> 9a80707 (created the interfaces and the DTOs)

namespace Api.Interfaces
{
    public interface IRider
    {
<<<<<<< HEAD
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
        public Task<string> updateDefaultLocation(int id, RiderLocation location);
        public Task<PagedList<Rider>> getAllActive(SearchPaging props);
=======
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
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    }
}
