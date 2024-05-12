using Api.DTO;

namespace Api.Interfaces
{
    public interface IProduct
    {
        public Task<IEnumerable<ProductDTO>> allAsync(int pageNumber, int pageSize, string searchString);
        public Task<IEnumerable<ProductDTOLite>> allProductLiteAsync();
        public Task<ProductDTO> getAsync(int id);
        public Task<string> deleteAsync(int id);
        public Task<ProductDTO> updateAsync(ProductDTO product, int id);
        public Task<IEnumerable<ProductDTO>> searchProduct(string searchString);
        public Task<ProductDTO> uploadProductImg(int id, IFormFile productImg);
        public Task<VendorDTO> getProductVendor(int id);
        public Task<ProductDTO> createAsync(CreateProductDTO product);
        public Task<IEnumerable<ProductDTO>> searchProductByVendor(int pageNumber, int pageSize, string vendorName);
        public Task<IEnumerable<ProductDTO>> searchProductByCategory(int pageNumber, int pageSize, string categoryName);
        public Task<IEnumerable<ProductDTO>> searchProductByService(int pageNumber, int pageSize, string serviceName);
        public Task<IEnumerable<ProductDTO>> searchProductByAll(int pageNumber, int pageSize, string name);

    }
}
