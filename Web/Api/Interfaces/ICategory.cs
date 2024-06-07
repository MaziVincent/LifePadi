using Api.DTO;
using Api.Models;
using API.DTO;
using API.Models;

namespace Api.Interfaces
{
    public interface ICategory
    {
        public Task<PagedList<Category>> allAsync(SearchPaging props);
        public Task<IEnumerable<CategoryDTOLite>> allCategoryLiteAsync();
        public Task<CategoryDTO> getAsync(int id);
        public Task<IEnumerable<ProductDTO>> categoryProducts(int id);
        public Task<CategoryDTO> getByNameAsync(string name);
        public Task<string> deleteAsync(int id);
        public Task<CategoryDTO> updateAsync(CategoryDTO category, int id);
        public Task<CategoryDTO> createAsync(CategoryDTOLite category);
        public Task<int> numberOfCategories();
        public Task<object> categoryStats();

    }
}
