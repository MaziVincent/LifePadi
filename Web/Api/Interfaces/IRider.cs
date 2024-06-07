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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 836ec36 (changed all DTO to Dto)
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
=======
        public Task<IEnumerable<GetRiderDTO>> getAllAsync(int pageNumber, int pageSize, string searchString);
        public Task<GetRiderDTO> getAsync(int id);
        public Task<GetRiderDTO> updateAsync(CreateRiderDTO rider, int id);
<<<<<<< HEAD
>>>>>>> 28d4101 (finished with rider and order)
        public Task<string> deleteAsync(int id);
        public Task<AuthRiderDTO> createAsync(CreateRiderDTO rider);
        public Task<IEnumerable<OrderDTO>> orderLists(int id);
<<<<<<< HEAD
        public Task<IEnumerable<RiderDTO>> searchAsync(string searchString);
        public Task<IEnumerable<OrderDTO>> nonActiveRiders();
        public Task<IEnumerable<DeliveryDTOLite>> successfulDeliveries(int id);
        public Task<IEnumerable<DeliveryDTOLite>> unsuccessfulDeliveries(int id);
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public Task<IEnumerable<GetRiderDTO>> searchAsync(string searchString);
        public Task<IEnumerable<GetRiderDTO>> nonActiveRiders();
        public Task<IEnumerable<DeliveryDTOLite>> successfulDeliveries(int riderId);
        public Task<IEnumerable<DeliveryDTOLite>> unsuccessfulDeliveries(int riderId);
        public Task<IEnumerable<OrderDTO>> getRiderOrders(int id);
        public Task<IEnumerable<DeliveryDTO>> getRiderDeliveries(int id);
        public Task<GetRiderDTO> uploadRiderIdentityImg(int id, IFormFile riderIdendityImg);
=======
=======
        public Task<IEnumerable<GetRiderDto>> getAllAsync(int pageNumber, int pageSize, string searchString);
        public Task<GetRiderDto> getAsync(int id);
        public Task<GetRiderDto> updateAsync(CreateRiderDto rider, int id);
>>>>>>> b8c66da (changed all DTO to Dto)
        public Task<string> deleteAsync(int id);
        public Task<AuthRiderDto> createAsync(CreateRiderDto rider);
        public Task<IEnumerable<OrderDto>> orderLists(int id);
        public Task<IEnumerable<GetRiderDto>> searchAsync(string searchString);
        public Task<IEnumerable<GetRiderDto>> nonActiveRiders();
        public Task<IEnumerable<DeliveryDtoLite>> successfulDeliveries(int riderId);
        public Task<IEnumerable<DeliveryDtoLite>> unsuccessfulDeliveries(int riderId);
        public Task<IEnumerable<OrderDto>> getRiderOrders(int id);
        public Task<IEnumerable<DeliveryDto>> getRiderDeliveries(int id);
        public Task<GetRiderDto> uploadRiderIdentityImg(int id, IFormFile riderIdendityImg);
>>>>>>> 836ec36 (changed all DTO to Dto)
        public Task<string> activateRider(int id);
        public Task<string> verifyRider(int id);
        public Task<string> deactivateRider(int id);
<<<<<<< HEAD
<<<<<<< HEAD
        public Task<string> assignOrderToRider(int riderId, int orderId);
>>>>>>> 28d4101 (finished with rider and order)
=======
>>>>>>> 4641615 (finished with delivery service and controller)
=======
        public Task<int> totalNumberOfRiders();
        public Task<int> totalNumberOfNonActiveRiders();
        public Task<int> totalNumberOfActiveRiders();
        public Task<int> totalNumberOfVerifiedRiders();
        public Task<int> totalNumberOfUnverifiedRiders();
        public Task<object> getRiderStats();
>>>>>>> 98415b4 (done with dashboard)
    }
}
