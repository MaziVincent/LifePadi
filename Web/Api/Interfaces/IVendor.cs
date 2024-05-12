using Api.DTO;

namespace Api.Interfaces
{
    public interface IVendor
    {
        public Task<IEnumerable<VendorDTO>> allAsync(int pageNumber, int pageSize);
        public Task<IEnumerable<VendorDTOLite>> vendorsOnly();
        public Task<IEnumerable<ProductDTOLite>> vendorsProduct(int id);
        public Task<VendorDTO> uploadVendorImg(int id, IFormFile image);
        public Task<IEnumerable<VendorDTOLite>> searchAsync(string searchString);
        public Task<string> deleteAsync(int id);
        public Task<AuthVendorDTOLite> createAsync(AuthVendorDTO vendor);
        public Task<AuthVendorDTOLite> updateAsync(AuthVendorDTOLite vendor, int id);
        public Task<AuthVendorDTOLite> getAsync(int id);
    }
}
