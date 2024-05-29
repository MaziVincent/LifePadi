using Api.DTO;

namespace Api.Interfaces
{
    public interface ICategory
    {
        public Task<IEnumerable<CategoryDTO>> allAsync(int pageNumber, int pageSize, string searchString);
        public Task<IEnumerable<CategoryDTOLite>> allCategoryLiteAsync();
        public Task<CategoryDTO> getAsync(int id);
        public Task<IEnumerable<ProductDTO>> categoryProducts(int id);
        public Task<CategoryDTO> getByNameAsync(string name);
        public Task<string> deleteAsync(int id);
        public Task<CategoryDTO> updateAsync(CategoryDTO category, int id);
        public Task<CategoryDTO> createAsync(CategoryDTOLite category);


    }
}
