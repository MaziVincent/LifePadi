using Api.DTO;
using Api.Helpers;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using CloudinaryDotNet;
using FuzzySharp;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class ProductService : IProduct
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly Cloudinary _cloudinary;
        public ProductService(DBContext dbContext, IMapper mapper, IConfiguration config)
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

        public async Task<IEnumerable<ProductDto>> allAsync(int pageNumber, int pageSize, string searchString)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                if (searchString == "")
                {
                    var products1 = await _dbContext!.Products.Skip(skip).Take(pageSize)
                        .Include(p => p.Vendor)
                        .Include(p => p.Category)
                        .OrderByDescending(p => p.CreatedAt)
                        .Where(p => p.Status == true).ToListAsync();
                    var ProductDto1 = _mapper.Map<List<ProductDto>>(products1);
                    return ProductDto1;
                }
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Vendor)
                    .Include(p => p.Category)
                    .OrderByDescending(p => p.CreatedAt)
                    .Where(p => p.SearchString!.ToLower().Contains(searchString.ToLower())).ToListAsync();
                var ProductDto = _mapper.Map<List<ProductDto>>(products);
                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDtoLite>> allProductLiteAsync()
        {
            try
            {
                var products = await _dbContext.Products.OrderByDescending(p => p.CreatedAt).ToListAsync();
                var ProductDtoLite = _mapper.Map<List<ProductDtoLite>>(products);
                return ProductDtoLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<ProductDto> createAsync(CreateProductDto product)
        {
            try
            {
                var folderName = "Products";
                var newProduct = _mapper.Map<Product>(product);
                newProduct.Status = true;
                newProduct.SearchString = product.Name!.ToUpper() + " " + product.Price + " " + newProduct.Status;
                var imgPath = await UploadImage.uploadImg(product.Image!, _cloudinary, folderName);
                if (imgPath == null!) throw new Exceptions.ServiceException("Can not upload the product image");
                newProduct.ProductImgUrl = imgPath;
                await _dbContext.Products.AddAsync(newProduct);
                await _dbContext.SaveChangesAsync();
                var ProductDto = _mapper.Map<ProductDto>(newProduct);

                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
                if (product == null) return null!;
                return "Product deleted";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<ProductDto> getAsync(int id)
        {
            try
            {
                var product = await _dbContext.Products
                    .Include(p => p.Vendor)
                    .Include(p => p.Category)
                    .FirstOrDefaultAsync(p => p.Id == id);
                if (product == null) return null!;
                var ProductDto = _mapper.Map<ProductDto>(product);
                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<VendorDto> getProductVendor(int id)
        {
            try
            {
                var product = await _dbContext.Products.Include(p => p.Vendor).FirstOrDefaultAsync(p => p.Id == id);
                if (product == null) return null!;
                var vendor = _mapper.Map<VendorDto>(product.Vendor);
                return vendor;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDto>> searchProduct(string searchString)
        {
            try
            {
                var productList = new List<Product>();
                var products = await _dbContext.Products.Include(p => p.Vendor).ToListAsync();
                foreach (var product in products)
                {
                    var searchParam = product.SearchString!.ToLower().Split(" ");
                    bool isMatch = false;
                    foreach (var word in searchParam)
                    {
                        // Fuzzy matching logic using your chosen library
                        var matchRatio = Fuzz.Ratio(word, searchString.ToLower());
                        if (matchRatio >= 50) // Set a threshold for acceptable similarity
                        {
                            isMatch = true;
                            break; // Exit inner loop if a match is found
                        }
                    }
                    if (isMatch)
                    {
                        productList.Add(product);
                    }
                }

                var ProductDtoList = _mapper.Map<List<ProductDto>>(productList);
                return ProductDtoList;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDto>> searchProductByAll(int pageNumber, int pageSize, string name)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Category)
                    .Include(p => p.Vendor)
                    .OrderByDescending(p => p.CreatedAt)
                    .Where(p => p.Category!.Name!.ToLower().Contains(name.ToLower()) ||
                    p.Vendor!.Name!.ToLower().Contains(name.ToLower()) ||
                    p.SearchString!.ToLower().Contains(name.ToLower()))
                    .ToListAsync();
                var ProductDto = _mapper.Map<List<ProductDto>>(products);
                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDto>> searchProductByCategory(int pageNumber, int pageSize, string categoryName)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Category)
                    .Include(p => p.Vendor)
                    .OrderByDescending(p => p.CreatedAt)
                    .Where(p => p.Category!.Name!.ToLower().Contains(categoryName.ToLower()))
                    .ToListAsync();
                var ProductDto = _mapper.Map<List<ProductDto>>(products);
                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDto>> searchProductByService(int pageNumber, int pageSize, string serviceName)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Category)
                    .Include(p => p.Vendor)
                    .OrderByDescending(p => p.CreatedAt)
                    .Where(p => p.Vendor!.Service!.Name!.ToLower().Contains(serviceName.ToLower()))
                    .ToListAsync();
                var ProductDto = _mapper.Map<List<ProductDto>>(products);
                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDto>> searchProductByVendor(int pageNumber, int pageSize, string vendorName)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Category)
                    .Include(p => p.Vendor)
                    .OrderByDescending(p => p.CreatedAt)
                    .AsQueryable()
                    .Where(p => p.Vendor!.Name!.ToLower().Contains(vendorName.ToLower()))
                    .ToListAsync();
                var ProductDto = _mapper.Map<List<ProductDto>>(products);
                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfProducts()
        {
            try
            {
                var products = await _dbContext.Products.CountAsync();
                return products;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfProductsByCategory(int categoryId)
        {
            try
            {
                var products = await _dbContext.Products.CountAsync(p => p.CategoryId == categoryId);
                return products;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfProductsByVendor(int vendorId)
        {
            try
            {
                var products = await _dbContext.Products.CountAsync(p => p.VendorId == vendorId);
                return products;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<ProductDto> updateAsync(ProductDto product, int id)
        {
            try
            {
                var initialProduct = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
                if (initialProduct == null) return null!;
                initialProduct.Name = product.Name;
                initialProduct.Description = product.Description;
                initialProduct.Price = product.Price;
                initialProduct.VendorId = product.VendorId;
                initialProduct.CategoryId = product.CategoryId;
                initialProduct.Status = product.Status;
                initialProduct.SearchString = product.Name!.ToUpper() + " " + product.Price + " " + product.Status;
                initialProduct.UpdatedAt = DateTime.UtcNow;
                _dbContext.Products.Attach(initialProduct);
                await _dbContext.SaveChangesAsync();
                var ProductDto = _mapper.Map<ProductDto>(initialProduct);
                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<ProductDto> uploadProductImg(int id, IFormFile productImg)
        {
            try
            {
                var folderName = "Products";
                var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
                if (product == null) return null!;
                var imgPath = await UploadImage.uploadImg(productImg, _cloudinary, folderName);
                if (imgPath == null) throw new Exception("Can not upload the product image");
                product.ProductImgUrl = imgPath;
                _dbContext.Products.Attach(product);
                await _dbContext.SaveChangesAsync();
                var ProductDto = _mapper.Map<ProductDto>(product);
                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
    }
}
