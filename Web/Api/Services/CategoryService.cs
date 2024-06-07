using Api.DTO;
using Api.Helpers;
using Api.Interfaces;
using Api.Models;
using API.DTO;
using API.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Api.Services
{
    public class CategoryService : ICategory
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;
        public CategoryService(DBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<PagedList<Category>> allAsync(SearchPaging props)
        {
            try
            {
                IQueryable<Category> categoryList = Enumerable.Empty<Category>().AsQueryable();

                if (props.SearchString is null)
                {
                    var categories1 = await _dbContext.Categories.OrderByDescending(c => c.CreatedAt)
                    .ToListAsync();
                    categoryList = categoryList.Concat(categories1);
                    var result = PagedList<Category>.ToPagedList(categoryList, props.PageNumber, props.PageSize);
                    return result;
                }
                var categories = await _dbContext.Categories.OrderByDescending(c => c.CreatedAt)
                    .Where(c => c.Name!.ToLower().Contains(props.SearchString!.ToLower()))
                    .ToListAsync();
                categoryList = categoryList.Concat(categories);
                var returned = PagedList<Category>.ToPagedList(categoryList, props.PageNumber, props.PageSize);
                return returned;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<CategoryDTOLite>> allCategoryLiteAsync()
        {
            try
            {
                var categories = await _dbContext.Categories.ToListAsync();
                var categoryDTOs = _mapper.Map<List<CategoryDTOLite>>(categories);
                return categoryDTOs;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDTO>> categoryProducts(int id)
        {
            try
            {
                var category = await _dbContext.Categories
                    .Include(c => c.Products!)
                    .Include(c => c.Products!)
                    .ThenInclude(p => p.Vendor)
                    .FirstOrDefaultAsync(c => c.Id == id);
                var products = _mapper.Map<List<ProductDTO>>(category!.Products);
                return products;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<object> categoryStats()
        {
            try
            {
                var stats = new
                {
                    totalCategories = await numberOfCategories(),
                    totalProducts = await _dbContext.Products.CountAsync(),
                };
                return stats;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CategoryDTO> createAsync(CategoryDTOLite category)
        {
            try
            {
                var newCategory = _mapper.Map<Category>(category);
                await _dbContext.Categories.AddAsync(newCategory);
                await _dbContext.SaveChangesAsync();
                var categoryDTO = _mapper.Map<CategoryDTO>(newCategory);
                return categoryDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var category = await _dbContext!.Categories.FirstOrDefaultAsync(c => c.Id == id);
                if (category == null) return null!;
                _dbContext.Categories.Remove(category);
                await _dbContext.SaveChangesAsync();
                return "Category deleted";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CategoryDTO> getAsync(int id)
        {
            try
            {
                var category = await _dbContext.Categories
                    .Include(c => c.Products!)
                    .ThenInclude(p => p.Vendor)
                    .Include(c => c.Products!)
                    .FirstOrDefaultAsync(c => c.Id == id);
                if (category == null) return null!;
                var categoryDTO = _mapper.Map<CategoryDTO>(category);
                return categoryDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CategoryDTO> getByNameAsync(string name)
        {
            try
            {
                var category = await _dbContext.Categories
                    .Include(c => c.Products!)
                    .ThenInclude(p => p.Vendor)
                    .Include(c => c.Products!)
                    .FirstOrDefaultAsync(c => c.Name == name);
                if (category == null) return null!;
                var categoryDTO = _mapper.Map<CategoryDTO>(category);
                return categoryDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> numberOfCategories()
        {
            try
            {
                var count = await _dbContext.Categories.CountAsync();
                return count;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CategoryDTO> updateAsync(CategoryDTO category, int id)
        {
            try
            {
                var initialCategory = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
                if (initialCategory == null) return null!;
                initialCategory!.Name = category.Name;
                initialCategory!.Description = category.Description;
                initialCategory!.UpdatedAt = DateTime.UtcNow;
                _dbContext.Categories.Attach(initialCategory);
                await _dbContext.SaveChangesAsync();
                var categoryDTO = _mapper.Map<CategoryDTO>(initialCategory);
                return categoryDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
