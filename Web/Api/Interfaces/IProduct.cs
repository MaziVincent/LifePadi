using Api.DTO;
<<<<<<< HEAD
using Api.Models;
using Api.Services;
=======
>>>>>>> 9a80707 (created the interfaces and the DTOs)

namespace Api.Interfaces
{
    public interface IProduct
    {
<<<<<<< HEAD
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
        public Task<string> toogleProductStatus(int id);
        public Task<object> getVendorProductStat(int vendorId);
        public Task<PagedList<Product>> GetProductsByCategory(int categoryId, SearchPaging props);
        public Task<SearchDTO> SearchAsync(SearchPaging props);
=======
        public Task<IEnumerable<ProductDTO>> allAsync();
        public Task<IEnumerable<ProductDTOLite>> allProductLiteAsync();
        public Task<ProductDTO> getAsync(int id);
        public Task<string> deleteAsync(int id);
        public Task<ProductDTO> updateAsync(ProductDTO product, int id);
        public Task<IEnumerable<ProductDTO>> searchProduct(string searchString);
        public Task<ProductDTO> uploadProductImg(int id, string imgUrl);
        public Task<VendorDTO> getProductVendor(int id);
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    }
}
