using Api.DTO;
<<<<<<< HEAD
<<<<<<< HEAD
using Api.Models;
using Api.Services;
=======
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
using Api.Models;
>>>>>>> a0030da (vendor and product commit)

namespace Api.Interfaces
{
    public interface IVendor
    {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        public Task<PagedList<Vendor>> allAsync(SearchPaging props);
=======
        public Task<IEnumerable<VendorDto>> allAsync(int pageNumber, int pageSize);
>>>>>>> 836ec36 (changed all DTO to Dto)
        public Task<IEnumerable<VendorDtoLite>> vendorsOnly();
        public Task<IEnumerable<ProductDtoLite>> vendorsProduct(int id);
        public Task<VendorDto> uploadVendorImg(int id, IFormFile image);
        public Task<IEnumerable<VendorDtoLite>> searchAsync(string searchString);
<<<<<<< HEAD
        public Task<string> deleteAsync(int id);
        public Task<AuthVendorDtoLite> createAsync(AuthVendorDto vendor);
        public Task<AuthVendorDtoLite> updateAsync(AuthVendorDto vendor, int id);
        public Task<AuthVendorDto> getAsync(int id);
        public Task<VendorDtoLite> getVendorByTagName(string tag);
        public Task<int> totalNumberOfVendors();
        public Task<bool> vendorExists(string email);
        public Task<PagedList<ProductDto>> getVendorProducts(int id, SearchPaging props);
        public Task<string> activateVendor(int id);
        public Task<string> deactivateVendor(int id);
=======
        public Task<IEnumerable<VendorDTO>> allAsync();
        public Task<IEnumerable<VendorDTOLite>> vendorsOnly();
        public Task<IEnumerable<ProductDTOLite>> vendorsProduct(int id);
        public Task<VendorDTO> uploadVendorImg(int id, string imgUrl);
        public Task<IEnumerable<VendorDTO>> searchAsync(string searchString);
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public Task<IEnumerable<VendorDTO>> allAsync(int pageNumber, int pageSize);
        public Task<IEnumerable<VendorDTOLite>> vendorsOnly();
        public Task<IEnumerable<ProductDTOLite>> vendorsProduct(int id);
        public Task<VendorDTO> uploadVendorImg(int id, IFormFile image);
        public Task<IEnumerable<VendorDTOLite>> searchAsync(string searchString);
        public Task<string> deleteAsync(int id);
        public Task<AuthVendorDTOLite> createAsync(AuthVendorDTO vendor);
        public Task<AuthVendorDTOLite> updateAsync(AuthVendorDTOLite vendor, int id);
        public Task<AuthVendorDTOLite> getAsync(int id);
<<<<<<< HEAD
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
=======
        public Task<string> deleteAsync(int id);
        public Task<AuthVendorDtoLite> createAsync(AuthVendorDto vendor);
        public Task<AuthVendorDtoLite> updateAsync(AuthVendorDto vendor, int id);
        public Task<AuthVendorDto> getAsync(int id);
        public Task<VendorDtoLite> getVendorByTagName(string tag);
>>>>>>> 836ec36 (changed all DTO to Dto)
        public Task<int> totalNumberOfVendors();
>>>>>>> 98415b4 (done with dashboard)
    }
}
