using Api.DTO;
using Api.Models;
using API.DTO;
using API.Models;

namespace Api.Interfaces
{
    public interface ICategory
    {
        public Task<PagedList<Category>> allAsync(SearchPaging props);
        public Task<IEnumerable<CategoryDtoLite>> allCategoryLiteAsync();
        public Task<CategoryDto> getAsync(int id);
        public Task<IEnumerable<ProductDto>> categoryProducts(int id);
        public Task<CategoryDto> getByNameAsync(string name);
        public Task<string> deleteAsync(int id);
        public Task<CategoryDto> updateAsync(CategoryDto category, int id);
        public Task<CategoryDto> createAsync(CategoryDtoLite category);
        public Task<int> numberOfCategories();
        public Task<object> categoryStats();
        public Task<IEnumerable<CategoryDto>> vendorCategories(int vendorId);

    }
}
