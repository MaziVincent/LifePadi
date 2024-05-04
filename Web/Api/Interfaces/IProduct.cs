using Api.DTO;

namespace Api.Interfaces
{
    public interface IProduct
    {
        public Task<IEnumerable<ProductDTO>> allAsync();
        public Task<IEnumerable<ProductDTOLite>> allProductLiteAsync();
        public Task<ProductDTO> getAsync(int id);
        public Task<string> deleteAsync(int id);
        public Task<ProductDTO> updateAsync(ProductDTO product, int id);
        public Task<IEnumerable<ProductDTO>> searchProduct(string searchString);
        public Task<ProductDTO> uploadProductImg(int id, string imgUrl);
        public Task<VendorDTO> getProductVendor(int id);
    }
}
