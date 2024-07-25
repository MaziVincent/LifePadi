using Api.DTO;
<<<<<<< HEAD
using Api.Models;
using Api.Services;
=======
>>>>>>> 9a80707 (created the interfaces and the DTOs)

namespace Api.Interfaces
{
    public interface ICategory
    {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 836ec36 (changed all DTO to Dto)
=======
>>>>>>> 7fb3cf8 (resolved merge conflicts)
        public Task<PagedList<Category>> allAsync(SearchPaging props);
        public Task<IEnumerable<CategoryDtoLite>> allCategoryLiteAsync();
        public Task<CategoryDto> getAsync(int id);
        public Task<IEnumerable<ProductDto>> categoryProducts(int id);
        public Task<PagedList<Product>> getCategoryProducts(int id, SearchPaging props);
        public Task<CategoryDto> getByNameAsync(string name);
        public Task<string> deleteAsync(int id);
        public Task<CategoryDto> updateAsync(CategoryDto category, int id);
        public Task<CategoryDto> createAsync(CreateCategoryDto category);
        public Task<int> numberOfCategories();
        public Task<object> categoryStats();
        public Task<IEnumerable<CategoryDto>> vendorCategories(int vendorId);
        public Task<string> uploadIconAsync(int id, IFormFile Icon);
=======
        public Task<IEnumerable<CategoryDTO>> allAsync();
        public Task<IEnumerable<CategoryDTO>> allCategoryLiteAsync();
=======
        public Task<IEnumerable<CategoryDTO>> allAsync(int pageNumber, int pageSize, string searchString);
        public Task<IEnumerable<CategoryDTOLite>> allCategoryLiteAsync();
>>>>>>> ee48634 (done with service, category and product controllers.)
        public Task<CategoryDTO> getAsync(int id);
        public Task<IEnumerable<ProductDTO>> categoryProducts(int id);
        public Task<CategoryDTO> getByNameAsync(string name);
=======
        public Task<IEnumerable<CategoryDto>> allAsync(int pageNumber, int pageSize, string searchString);
=======
        public Task<PagedList<Category>> allAsync(SearchPaging props);
>>>>>>> ce86924 (resolved merge conflicts)
        public Task<IEnumerable<CategoryDtoLite>> allCategoryLiteAsync();
        public Task<CategoryDto> getAsync(int id);
        public Task<IEnumerable<ProductDto>> categoryProducts(int id);
        public Task<CategoryDto> getByNameAsync(string name);
>>>>>>> b8c66da (changed all DTO to Dto)
        public Task<string> deleteAsync(int id);
<<<<<<< HEAD
        public Task<CategoryDTO> updateAsync(CategoryDTO category, int id);
<<<<<<< HEAD
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public Task<CategoryDTO> createAsync(CategoryDTOLite category);
<<<<<<< HEAD

>>>>>>> ee48634 (done with service, category and product controllers.)
=======
=======
        public Task<CategoryDto> updateAsync(CategoryDto category, int id);
        public Task<CategoryDto> createAsync(CategoryDtoLite category);
>>>>>>> 836ec36 (changed all DTO to Dto)
        public Task<int> numberOfCategories();
        public Task<object> categoryStats();
<<<<<<< HEAD
>>>>>>> 98415b4 (done with dashboard)
=======
        public Task<IEnumerable<CategoryDto>> vendorCategories(int vendorId);
>>>>>>> 867b7f3 (added a route for vendorCategories)

    }
}
