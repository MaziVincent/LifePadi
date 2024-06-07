using Api.DTO;

namespace Api.Interfaces
{
    public interface IProduct
    {
        public Task<IEnumerable<ProductDto>> allAsync(int pageNumber, int pageSize, string searchString);
        public Task<IEnumerable<ProductDtoLite>> allProductLiteAsync();
        public Task<ProductDto> getAsync(int id);
        public Task<string> deleteAsync(int id);
        public Task<ProductDto> updateAsync(ProductDto product, int id);
        public Task<IEnumerable<ProductDto>> searchProduct(string searchString);
        public Task<ProductDto> uploadProductImg(int id, IFormFile productImg);
        public Task<VendorDto> getProductVendor(int id);
        public Task<ProductDto> createAsync(CreateProductDto product);
        public Task<IEnumerable<ProductDto>> searchProductByVendor(int pageNumber, int pageSize, string vendorName);
        public Task<IEnumerable<ProductDto>> searchProductByCategory(int pageNumber, int pageSize, string categoryName);
        public Task<IEnumerable<ProductDto>> searchProductByService(int pageNumber, int pageSize, string serviceName);
        public Task<IEnumerable<ProductDto>> searchProductByAll(int pageNumber, int pageSize, string name);
        public Task<int> totalNumberOfProducts();
        public Task<int> totalNumberOfProductsByVendor(int vendorId);
        public Task<int> totalNumberOfProductsByCategory(int categoryId);

    }
}
