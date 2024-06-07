using Api.DTO;
using Api.Models;
using API.DTO;
using API.Models;


namespace Api.Interfaces
{
    public interface IService
    {
        public Task<PagedList<Service>> allAsync(SearchPaging props);
        public Task<IEnumerable<ServiceDtoLite>> servicesLite();
        public Task<ServiceDto> getAsync(int id);
        public Task<ServiceDtoLite> updateAsync(ServiceDto service, int id);
        public Task<string> deleteAsync(int id);
        public Task<ServiceDtoLite> createAsync(ServiceDto service);
        public Task<IEnumerable<ServiceDto>> searchByName(string name);
        public Task<bool> nameExists(string name);
        public Task<bool> isActive(int id);
        public Task<IEnumerable<ServiceDtoLite>> nonActiveService();
        public Task<ServiceDto> uploadImgUrl(int id, IFormFile image);
        public Task<IEnumerable<ProductDto>> getServiceProducts(int id);
        public Task<IEnumerable<VendorDtoLite>> getVendorsForService(int id);
        public Task<int> totalNumberOfServices();
        public Task<int> totalNumberOfActiveServices();
        public Task<int> totalNumberOfNonActiveServices();
        public Task<object> serviceStats();
        
    }
}
