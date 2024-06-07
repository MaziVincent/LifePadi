using Api.DTO;
<<<<<<< HEAD
using Api.Models;
using Api.Services;

=======
>>>>>>> 9a80707 (created the interfaces and the DTOs)

namespace Api.Interfaces
{
    public interface IService
    {
<<<<<<< HEAD
        public Task<PagedList<Service>> allAsync(SearchPaging props);
        public Task<IEnumerable<ServiceDtoLite>> servicesLite();
        public Task<ServiceDto> getAsync(int id);
        public Task<ServiceDtoLite> updateAsync(ServiceDto service, int id);
<<<<<<< HEAD
        public Task<string> deleteAsync(int id);
        public Task<ServiceDtoLite> createAsync(ServiceDto service);
        public Task<IEnumerable<ServiceDto>> searchByName(string name);
        public Task<bool> nameExists(string name);
        public Task<bool> isActive(int id);
        public Task<object> ChangeActivation(int id);
        public Task<IEnumerable<ServiceDtoLite>> nonActiveService();
        public Task<ServiceDto> uploadImgUrl(int id, IFormFile image);
        public Task<IEnumerable<ProductDto>> getServiceProducts(int id);
        public Task<IEnumerable<VendorDtoLite>> getVendorsForService(int id);
        public Task<int> totalNumberOfServices();
        public Task<int> totalNumberOfActiveServices();
        public Task<int> totalNumberOfNonActiveServices();
        public Task<object> serviceStats();
        
=======
        public Task<IEnumerable<ServiceDTO>> allAsync();
        public Task<IEnumerable<ServiceDTOLite>> servicesLite();
        public Task<ServiceDTO> getAsync(int id);
        public Task<ServiceDTOLite> updateAsync(ServiceDTO service, int id);
=======
>>>>>>> 836ec36 (changed all DTO to Dto)
        public Task<string> deleteAsync(int id);
        public Task<ServiceDtoLite> createAsync(ServiceDto service);
        public Task<IEnumerable<ServiceDto>> searchByName(string name);
        public Task<bool> nameExists(string name);
        public Task<bool> isActive(int id);
<<<<<<< HEAD
<<<<<<< HEAD
        public Task<IEnumerable<ServiceDTO>> nonActiveService();
        public Task<ServiceDTO> uploadImgUrl(int id, string imgUrl);
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public Task<IEnumerable<ServiceDTOLite>> nonActiveService();
        public Task<ServiceDTO> uploadImgUrl(int id, IFormFile image);
        public Task<IEnumerable<ProductDTO>> getServiceProducts(int id);
<<<<<<< HEAD
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public Task<IEnumerable<VendorDTOLite>> getVendorsForService(int id);
<<<<<<< HEAD
>>>>>>> 58020e7 (removed service from product)
=======
=======
        public Task<IEnumerable<ServiceDtoLite>> nonActiveService();
        public Task<ServiceDto> uploadImgUrl(int id, IFormFile image);
        public Task<IEnumerable<ProductDto>> getServiceProducts(int id);
        public Task<IEnumerable<VendorDtoLite>> getVendorsForService(int id);
>>>>>>> 836ec36 (changed all DTO to Dto)
        public Task<int> totalNumberOfServices();
        public Task<int> totalNumberOfActiveServices();
        public Task<int> totalNumberOfNonActiveServices();
        public Task<object> serviceStats();
        
>>>>>>> 98415b4 (done with dashboard)
    }
}
