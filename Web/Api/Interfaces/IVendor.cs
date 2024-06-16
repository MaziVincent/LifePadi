using Api.DTO;

namespace Api.Interfaces
{
    public interface IVendor
    {
        public Task<IEnumerable<VendorDto>> allAsync(int pageNumber, int pageSize);
        public Task<IEnumerable<VendorDtoLite>> vendorsOnly();
        public Task<IEnumerable<ProductDtoLite>> vendorsProduct(int id);
        public Task<VendorDto> uploadVendorImg(int id, IFormFile image);
        public Task<IEnumerable<VendorDtoLite>> searchAsync(string searchString);
        public Task<string> deleteAsync(int id);
        public Task<AuthVendorDtoLite> createAsync(AuthVendorDto vendor);
        public Task<AuthVendorDtoLite> updateAsync(AuthVendorDtoLite vendor, int id);
        public Task<AuthVendorDtoLite> getAsync(int id);
        public Task<VendorDtoLite> getVendorByTagName(string tag);
        public Task<int> totalNumberOfVendors();
        public Task<bool> vendorExists(string email);
    }
}
