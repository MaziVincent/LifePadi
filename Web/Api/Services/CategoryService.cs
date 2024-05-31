using Api.DTO;
using Api.Helpers;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
<<<<<<< HEAD
using CloudinaryDotNet;

=======
using System.Linq.Expressions;
>>>>>>> ee48634 (done with service, category and product controllers.)

namespace Api.Services
{
    public class CategoryService : ICategory
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;
<<<<<<< HEAD
        private readonly IConfiguration _config;
        private readonly Cloudinary _cloudinary;
        public CategoryService(DBContext dbContext, IMapper mapper, IConfiguration config)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _config = config;
            var account = new Account(
                _config["Cloudinary:Cloud_Name"],
                _config["Cloudinary:Api_Key"],
                _config["Cloudinary:Api_Secret"]
            );
            _cloudinary = new Cloudinary(account);
        }
        public async Task<PagedList<Category>> allAsync(SearchPaging props)
        {
            try
            {
                IQueryable<Category> categoryList = Enumerable.Empty<Category>().AsQueryable();

                if (props.SearchString is null)
                {
                    var categories1 = await _dbContext.Categories.OrderByDescending(c => c.CreatedAt)
                    .Include(c => c.Products!).ThenInclude(p => p.Vendor)
                    .ToListAsync();
                    categoryList = categoryList.Concat(categories1);
                    var result = PagedList<Category>.ToPagedList(categoryList, props.PageNumber, props.PageSize);
                    return result;
                }
                var categories = await _dbContext.Categories.OrderByDescending(c => c.CreatedAt)
                .Include(c => c.Products!).ThenInclude(p => p.Vendor)
                    .Where(c => c.Name!.ToLower().Contains(props.SearchString!.ToLower()))
                    .ToListAsync();
                categoryList = categoryList.Concat(categories);
                var returned = PagedList<Category>.ToPagedList(categoryList, props.PageNumber, props.PageSize);
                return returned;
            }

            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<Product>> getCategoryProducts(int id, SearchPaging props)
        {
            try
            {
                IQueryable<Product> productList = Enumerable.Empty<Product>().AsQueryable();

                if (props.SearchString is null)
                {
                    var product1 = await _dbContext.Categories.OrderByDescending(c => c.CreatedAt)
                    .Include(c => c.Products!).ThenInclude(p => p.Vendor).ThenInclude(v => v!.Addresses)
                    .Where(c => c.Id == id)
                    .AsSplitQuery()
                    .OrderBy(c => Guid.NewGuid())
                    .ToListAsync();
                    productList = productList.Concat(product1.SelectMany(c => c.Products!).AsQueryable());
                    var result = PagedList<Product>.ToPagedList(productList, props.PageNumber, props.PageSize);
                    return result;
                }
                var product2 = await _dbContext.Categories.OrderByDescending(c => c.CreatedAt)
                .Include(c => c.Products!).ThenInclude(p => p.Vendor).ThenInclude(v => v!.Addresses)
                    .Where(c => c.Id == id && c.Name!.ToLower().Contains(props.SearchString!.ToLower()))
                    .AsSplitQuery()
                    .OrderBy(c => Guid.NewGuid())
                    .ToListAsync();
                productList = productList.Concat(product2.SelectMany(c => c.Products!).AsQueryable());
                var returned = PagedList<Product>.ToPagedList(productList, props.PageNumber, props.PageSize);
                return returned;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<CategoryDtoLite>> allCategoryLiteAsync()
=======
        public CategoryService(DBContext dbContext, IMapper mapper) 
        { 
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<IEnumerable<CategoryDTO>> allAsync(int pageNumber = 1, int pageSize = 10, string searchString = "")
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                if (searchString == "")
                {
                    var categories1 = await _dbContext.Categories.Skip(skip).Take(pageSize).OrderByDescending(c => c.CreatedAt)
                    .ToListAsync();
                    var categoryDTOs1 = _mapper.Map<List<CategoryDTO>>(categories1);
                    return categoryDTOs1;
                }
                var categories = await _dbContext.Categories.Skip(skip).Take(pageSize).OrderByDescending(c => c.CreatedAt)
                    .Where(c => c.Name!.ToLower().Contains(searchString.ToLower()))
                    .ToListAsync();
                var categoryDTOs = _mapper.Map<List<CategoryDTO>>(categories);
                return categoryDTOs;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<CategoryDTOLite>> allCategoryLiteAsync()
>>>>>>> ee48634 (done with service, category and product controllers.)
        {
            try
            {
                var categories = await _dbContext.Categories.ToListAsync();
<<<<<<< HEAD
                var CategoryDtos = _mapper.Map<List<CategoryDtoLite>>(categories);
                return CategoryDtos;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDto>> categoryProducts(int id)
=======
                var categoryDTOs = _mapper.Map<List<CategoryDTOLite>>(categories);
                return categoryDTOs;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDTO>> categoryProducts(int id)
>>>>>>> ee48634 (done with service, category and product controllers.)
        {
            try
            {
                var category = await _dbContext.Categories
                    .Include(c => c.Products!)
<<<<<<< HEAD
<<<<<<< HEAD
                    .Include(c => c.Products!)
                    .ThenInclude(p => p.Vendor)
                    .AsSplitQuery()
                    .OrderBy(c => Guid.NewGuid()) // Randomize the result
                    .FirstOrDefaultAsync(c => c.Id == id);
                var products = _mapper.Map<List<ProductDto>>(category!.Products);
                return products;

            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
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
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<CategoryDto> createAsync(CreateCategoryDto category)
        {
            try
            {
                var folderName = "ProductCategory";
                var imgPath = await UploadImage.uploadImg(category.Icon!, _cloudinary, folderName);
                if(imgPath == null) throw new Exceptions.ServiceException("Cann't upload the category icon");
                var newCategory = _mapper.Map<Category>(category);
                newCategory.Icon = imgPath;
                await _dbContext.Categories.AddAsync(newCategory);
                await _dbContext.SaveChangesAsync();
                var CategoryDto = _mapper.Map<CategoryDto>(newCategory);
                return CategoryDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
=======
                    .ThenInclude(p => p.Service)
=======
>>>>>>> 58020e7 (removed service from product)
                    .Include(c => c.Products!)
                    .ThenInclude(p => p.Vendor)
                    .FirstOrDefaultAsync(c => c.Id == id);
                var products = _mapper.Map<List<ProductDTO>>(category!.Products);
                return products;

            }catch (Exception ex)
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
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
>>>>>>> ee48634 (done with service, category and product controllers.)
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
<<<<<<< HEAD
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<CategoryDto> getAsync(int id)
=======
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CategoryDTO> getAsync(int id)
>>>>>>> ee48634 (done with service, category and product controllers.)
        {
            try
            {
                var category = await _dbContext.Categories
                    .Include(c => c.Products!)
                    .ThenInclude(p => p.Vendor)
                    .Include(c => c.Products!)
<<<<<<< HEAD
<<<<<<< HEAD
                    .FirstOrDefaultAsync(c => c.Id == id);
                if (category == null) return null!;
                var CategoryDto = _mapper.Map<CategoryDto>(category);
                return CategoryDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<CategoryDto> getByNameAsync(string name)
=======
                    .ThenInclude(p => p.Service)
=======
>>>>>>> 58020e7 (removed service from product)
                    .FirstOrDefaultAsync(c => c.Id == id);
                if (category == null) return null!;
                var categoryDTO = _mapper.Map<CategoryDTO>(category);
                return categoryDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CategoryDTO> getByNameAsync(string name)
>>>>>>> ee48634 (done with service, category and product controllers.)
        {
            try
            {
                var category = await _dbContext.Categories
                    .Include(c => c.Products!)
                    .ThenInclude(p => p.Vendor)
                    .Include(c => c.Products!)
<<<<<<< HEAD
<<<<<<< HEAD
                    .FirstOrDefaultAsync(c => c.Name == name);
                if (category == null) return null!;
                var CategoryDto = _mapper.Map<CategoryDto>(category);
                return CategoryDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
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
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<CategoryDto> updateAsync(CategoryDto category, int id)
=======
                    .ThenInclude(p => p.Service)
=======
>>>>>>> 58020e7 (removed service from product)
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

        public async Task<CategoryDTO> updateAsync(CategoryDTO category, int id)
>>>>>>> ee48634 (done with service, category and product controllers.)
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
<<<<<<< HEAD
                var CategoryDto = _mapper.Map<CategoryDto>(initialCategory);
                return CategoryDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<CategoryDto>> vendorCategories(int vendorId)
        {
            try
            {
                var vendorCategories = await _dbContext.Categories
    .Include(c => c.Products!.Where(p => p.VendorId == vendorId))
    .Where(c => c.Products!.Any(p => p.VendorId == vendorId))
    .ToListAsync();
                var categoryDto = _mapper.Map<List<CategoryDto>>(vendorCategories);
                return categoryDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> uploadIconAsync(int id, IFormFile Icon)
        {
            try
            {
                var folderName = "ProductCategory";
                var category = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Id == id);
                if (category == null) return null!;
                var imgPath = await UploadImage.uploadImg(Icon, _cloudinary, folderName);
                if (imgPath == null) throw new Exceptions.ServiceException("Cann't upload the category icon");
                category.Icon = imgPath;
                _dbContext.Categories.Attach(category);
                await _dbContext.SaveChangesAsync();
                return "Icon uploaded successfully";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
=======
                var categoryDTO = _mapper.Map<CategoryDTO>(initialCategory);
                return categoryDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
>>>>>>> ee48634 (done with service, category and product controllers.)
            }
        }
    }
}
