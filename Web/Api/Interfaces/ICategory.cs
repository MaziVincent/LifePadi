using Api.DTO;

namespace Api.Interfaces
{
    public interface ICategory
    {
        public Task<IEnumerable<CategoryDTO>> allAsync();
        public Task<IEnumerable<CategoryDTO>> allCategoryLiteAsync();
        public Task<CategoryDTO> getAsync(int id);
        public Task<IEnumerable<ProductDTOLite>> categoryProducts(int id);
        public Task<CategoryDTO> getByNameAsync(string name);
        public Task<string> deleteAsync(int id);
        public Task<CategoryDTO> updateAsync(CategoryDTO category, int id);

    }
}
