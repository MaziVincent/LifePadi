using Api.DTO;
using Api.Models;
using API.DTO;
using API.Models;

namespace Api.Interfaces
{
    public interface IVendor
    {
        public Task<PagedList<Vendor>> allAsync(SearchPaging props);
        public Task<IEnumerable<VendorDtoLite>> vendorsOnly();
        public Task<IEnumerable<ProductDtoLite>> vendorsProduct(int id);
        public Task<VendorDto> uploadVendorImg(int id, IFormFile image);
        public Task<IEnumerable<VendorDtoLite>> searchAsync(string searchString);
        public Task<string> deleteAsync(int id);
        public Task<AuthVendorDtoLite> createAsync(AuthVendorDto vendor);
        public Task<AuthVendorDtoLite> updateAsync(AuthVendorDto vendor, int id);
        public Task<AuthVendorDto> getAsync(int id);
        public Task<VendorDtoLite> getVendorByTagName(string tag);
        public Task<int> totalNumberOfVendors();
        public Task<bool> vendorExists(string email);
        public Task<PagedList<ProductDto>> getVendorProducts(int id, SearchPaging props);
    }
}
