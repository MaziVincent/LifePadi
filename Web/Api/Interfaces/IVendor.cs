using Api.DTO;

namespace Api.Interfaces
{
    public interface IVendor
    {
        public Task<IEnumerable<VendorDTO>> allAsync();
        public Task<IEnumerable<VendorDTOLite>> vendorsOnly();
        public Task<IEnumerable<ProductDTOLite>> vendorsProduct(int id);
        public Task<VendorDTO> uploadVendorImg(int id, string imgUrl);
        public Task<IEnumerable<VendorDTO>> searchAsync(string searchString);
    }
}
