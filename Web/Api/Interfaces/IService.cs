using Api.DTO;

namespace Api.Interfaces
{
    public interface IService
    {
        public Task<IEnumerable<ServiceDTO>> allAsync();
        public Task<IEnumerable<ServiceDTOLite>> servicesLite();
        public Task<ServiceDTO> getAsync(int id);
        public Task<ServiceDTOLite> updateAsync(ServiceDTO service, int id);
        public Task<string> deleteAsync(int id);
        public Task<ServiceDTOLite> createAsync(ServiceDTO service);
        public Task<IEnumerable<ServiceDTO>> searchByName(string name);
        public Task<bool> nameExists(string name);
        public Task<bool> isActive(int id);
        public Task<IEnumerable<ServiceDTOLite>> nonActiveService();
        public Task<ServiceDTO> uploadImgUrl(int id, IFormFile image);
        public Task<IEnumerable<ProductDTO>> getServiceProducts(int id);
        public Task<IEnumerable<VendorDTOLite>> getVendorsForService(int id);
        public Task<int> totalNumberOfServices();
        public Task<int> totalNumberOfActiveServices();
        public Task<int> totalNumberOfNonActiveServices();
        public Task<object> serviceStats();
        
    }
}
