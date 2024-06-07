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
<<<<<<< HEAD
<<<<<<< HEAD
        public ProductService(DBContext dbContext, IMapper mapper, IConfiguration config)
        {
=======
        public ProductService(DBContext dbContext, IMapper mapper, IConfiguration config) 
        { 
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public ProductService(DBContext dbContext, IMapper mapper, IConfiguration config)
        {
>>>>>>> 98415b4 (done with dashboard)
            _dbContext = dbContext;
            _mapper = mapper;
            _config = config;
            var account = new Account(
                _config["Cloudinary:Cloud_Name"],
                _config["Cloudinary:Api_Key"],
                _config["Cloudinary:Api_Secret"]
            );
<<<<<<< HEAD
<<<<<<< HEAD
            _cloudinary = new Cloudinary(account);
        }

        public async Task<IEnumerable<ProductDto>> allAsync(int pageNumber, int pageSize, string searchString)
<<<<<<< HEAD
=======
            _cloudinary = new Cloudinary( account );
=======
            _cloudinary = new Cloudinary(account);
>>>>>>> 98415b4 (done with dashboard)
        }

        public async Task<IEnumerable<ProductDTO>> allAsync(int pageNumber, int pageSize, string searchString)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                if (searchString == "")
                {
                    var products1 = await _dbContext!.Products.Skip(skip).Take(pageSize)
                        .Include(p => p.Vendor)
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
                        .Include(p => p.Service)
=======
>>>>>>> 58020e7 (removed service from product)
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
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<IEnumerable<ProductDTOLite>> allProductLiteAsync()
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IEnumerable<ProductDtoLite>> allProductLiteAsync()
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var products = await _dbContext.Products.OrderByDescending(p => p.CreatedAt).ToListAsync();
<<<<<<< HEAD
<<<<<<< HEAD
                var ProductDtoLite = _mapper.Map<List<ProductDtoLite>>(products);
                return ProductDtoLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<ProductDto> createAsync(CreateProductDto product)
=======
                var productDTOLite = _mapper.Map<List<ProductDTOLite>>(products);
                return productDTOLite;
=======
                var ProductDtoLite = _mapper.Map<List<ProductDtoLite>>(products);
                return ProductDtoLite;
>>>>>>> 836ec36 (changed all DTO to Dto)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<ProductDTO> createAsync(CreateProductDTO product)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<ProductDto> createAsync(CreateProductDto product)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var folderName = "Products";
                var newProduct = _mapper.Map<Product>(product);
                newProduct.Status = true;
                newProduct.SearchString = product.Name!.ToUpper() + " " + product.Price + " " + newProduct.Status;
                var imgPath = await UploadImage.uploadImg(product.Image!, _cloudinary, folderName);
<<<<<<< HEAD
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
=======
                if (imgPath == null!) throw new Exception("Can not upload the product image");
                newProduct.ProductImgUrl = imgPath;
                await _dbContext.Products.AddAsync(newProduct);
                await _dbContext.SaveChangesAsync();
                var ProductDto = _mapper.Map<ProductDto>(newProduct);

                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
>>>>>>> ee48634 (done with service, category and product controllers.)
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
                if (product == null) return null!;
<<<<<<< HEAD
                _dbContext.Products.Remove(product);
                await _dbContext.SaveChangesAsync();
                return "Product deleted";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<ProductDto> getAsync(int id)
=======
                return "Product deleted";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<ProductDTO> getAsync(int id)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<ProductDto> getAsync(int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var product = await _dbContext.Products
                    .Include(p => p.Vendor)
<<<<<<< HEAD
<<<<<<< HEAD
                    .ThenInclude(v => v!.Addresses)
                    .Include(p => p.Category)
                    .Include(p => p.ProductReviews)!
                    .ThenInclude(pr => pr.Customer)
                    .AsSplitQuery()
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

        public async Task<PagedList<Product>> GetProductsByCategory(int categoryId, SearchPaging props)
        {
            try
            {
                IQueryable<Product> productList = Enumerable.Empty<Product>().AsQueryable();
                if (props.SearchString == null)
                {
                    var product1 = await _dbContext.Products
                        .Include(p => p.Vendor)
                        .Include(p => p.Category)
                        .OrderByDescending(p => p.CreatedAt)
                        .Where(p => p.CategoryId == categoryId).ToListAsync();
                    productList = productList.Concat(product1);
                    var result = PagedList<Product>.ToPagedList(productList, props.PageNumber, props.PageSize);
                    // var ProductDto1 = _mapper.Map<PagedList<ProductDto>>(result);
                    return result;
                }
                var product2 = await _dbContext.Products
                    .Include(p => p.Vendor)
                    .Include(p => p.Category)
                    .OrderByDescending(p => p.CreatedAt)
                    .Where(p => p.CategoryId == categoryId && p.SearchString!.ToLower().Contains(props.SearchString!.ToLower())).ToListAsync();
                productList = productList.Concat(product2);
                var returned = PagedList<Product>.ToPagedList(productList, props.PageNumber, props.PageSize);
                // var ProductDto = _mapper.Map<PagedList<ProductDto>>(returned);
                return returned;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<VendorDto> getProductVendor(int id)
=======
                    .Include(p => p.Service)
=======
>>>>>>> 58020e7 (removed service from product)
                    .Include(p => p.Category)
                    .FirstOrDefaultAsync(p => p.Id == id);
                if (product == null) return null!;
                var ProductDto = _mapper.Map<ProductDto>(product);
                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<VendorDTO> getProductVendor(int id)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<VendorDto> getProductVendor(int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var product = await _dbContext.Products.Include(p => p.Vendor).FirstOrDefaultAsync(p => p.Id == id);
                if (product == null) return null!;
<<<<<<< HEAD
<<<<<<< HEAD
                var vendor = _mapper.Map<VendorDto>(product.Vendor);
                return vendor;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }


        public async Task<object> getVendorProductStat(int vendorId)
        {
            try
            {
                var products = await _dbContext.Products.Where(p => p.VendorId == vendorId).AsQueryable().ToListAsync();
                if (products == null) return null!;
                var totalProducts = products.Count;
                var totalActiveProducts = products.Count(p => p.Status == true);
                var totalInactiveProducts = products.Count(p => p.Status == false);
                return new
                {
                    TotalProducts = totalProducts,
                    TotalActiveProducts = totalActiveProducts,
                    TotalInactiveProducts = totalInactiveProducts
                };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDto>> searchProduct(string searchString)
=======
                var vendor = _mapper.Map<VendorDTO>(product.Vendor);
=======
                var vendor = _mapper.Map<VendorDto>(product.Vendor);
>>>>>>> 836ec36 (changed all DTO to Dto)
                return vendor;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<IEnumerable<ProductDTO>> searchProduct(string searchString)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IEnumerable<ProductDto>> searchProduct(string searchString)
>>>>>>> 836ec36 (changed all DTO to Dto)
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
<<<<<<< HEAD
<<<<<<< HEAD
                        if (matchRatio >= 50) // Set a threshold for acceptable similarity
=======
                        if (matchRatio >= 0.8) // Set a threshold for acceptable similarity
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
                        if (matchRatio >= 50) // Set a threshold for acceptable similarity
>>>>>>> 96f3b7d (made some corrections on service, category and product services.)
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

<<<<<<< HEAD
<<<<<<< HEAD
                var ProductDtoList = _mapper.Map<List<ProductDto>>(productList);
                return ProductDtoList;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDto>> searchProductByAll(int pageNumber, int pageSize, string name)
=======
                var productDTOList = _mapper.Map<List<ProductDTO>>(productList);
                return productDTOList;
=======
                var ProductDtoList = _mapper.Map<List<ProductDto>>(productList);
                return ProductDtoList;
>>>>>>> 836ec36 (changed all DTO to Dto)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<IEnumerable<ProductDTO>> searchProductByAll(int pageNumber, int pageSize, string name)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IEnumerable<ProductDto>> searchProductByAll(int pageNumber, int pageSize, string name)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Category)
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
                    .Include(p => p.Service)
=======
>>>>>>> 58020e7 (removed service from product)
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
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<IEnumerable<ProductDTO>> searchProductByCategory(int pageNumber, int pageSize, string categoryName)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IEnumerable<ProductDto>> searchProductByCategory(int pageNumber, int pageSize, string categoryName)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Category)
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
                    .Include(p => p.Service)
=======
>>>>>>> 58020e7 (removed service from product)
                    .Include(p => p.Vendor)
                    .OrderByDescending(p => p.CreatedAt)
                    .Where(p => p.Category!.Name!.ToLower().Contains(categoryName.ToLower()))
                    .ToListAsync();
                var ProductDto = _mapper.Map<List<ProductDto>>(products);
                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<IEnumerable<ProductDTO>> searchProductByService(int pageNumber, int pageSize, string serviceName)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IEnumerable<ProductDto>> searchProductByService(int pageNumber, int pageSize, string serviceName)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Category)
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
                    .Include(p => p.Service)
=======
>>>>>>> 58020e7 (removed service from product)
                    .Include(p => p.Vendor)
                    .OrderByDescending(p => p.CreatedAt)
                    .Where(p => p.Vendor!.Service!.Name!.ToLower().Contains(serviceName.ToLower()))
                    .ToListAsync();
                var ProductDto = _mapper.Map<List<ProductDto>>(products);
                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<IEnumerable<ProductDTO>> searchProductByVendor(int pageNumber, int pageSize, string vendorName)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IEnumerable<ProductDto>> searchProductByVendor(int pageNumber, int pageSize, string vendorName)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Category)
<<<<<<< HEAD
<<<<<<< HEAD
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

        public async Task<string> toogleProductStatus(int id)
        {
            try
            {
                var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
                if (product == null) return null!;
                product.Status = !product.Status;
                product.SearchString = product.Name!.ToUpper() + " " + product.Price + " " + product.Status;
                _dbContext.Products.Attach(product);
                await _dbContext.SaveChangesAsync();
                return "Product status updated";
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
=======
                    .Include(p => p.Service)
=======
>>>>>>> 58020e7 (removed service from product)
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
                throw new Exception(ex.Message);
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
                throw new Exception(ex.Message);
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
                throw new Exception(ex.Message);
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
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<ProductDTO> updateAsync(ProductDTO product, int id)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<ProductDto> updateAsync(ProductDto product, int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var initialProduct = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
                if (initialProduct == null) return null!;
                initialProduct.Name = product.Name;
                initialProduct.Description = product.Description;
                initialProduct.Price = product.Price;
<<<<<<< HEAD
<<<<<<< HEAD
=======
                initialProduct.ServiceId = product.ServiceId;
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
>>>>>>> 58020e7 (removed service from product)
                initialProduct.VendorId = product.VendorId;
                initialProduct.CategoryId = product.CategoryId;
                initialProduct.Status = product.Status;
                initialProduct.SearchString = product.Name!.ToUpper() + " " + product.Price + " " + product.Status;
                initialProduct.UpdatedAt = DateTime.UtcNow;
                _dbContext.Products.Attach(initialProduct);
                await _dbContext.SaveChangesAsync();
<<<<<<< HEAD
<<<<<<< HEAD
                var ProductDto = _mapper.Map<ProductDto>(initialProduct);
                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<ProductDto> uploadProductImg(int id, IFormFile productImg)
=======
                var productDTO = _mapper.Map<ProductDTO>(initialProduct);
                return productDTO;
=======
                var ProductDto = _mapper.Map<ProductDto>(initialProduct);
                return ProductDto;
>>>>>>> 836ec36 (changed all DTO to Dto)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<ProductDTO> uploadProductImg(int id, IFormFile productImg)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<ProductDto> uploadProductImg(int id, IFormFile productImg)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var folderName = "Products";
                var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
                if (product == null) return null!;
                var imgPath = await UploadImage.uploadImg(productImg, _cloudinary, folderName);
<<<<<<< HEAD
                if (imgPath == null) throw new Exceptions.ServiceException("Can not upload the product image");
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

        public async Task<SearchDTO> SearchAsync(SearchPaging props)
        {
            if (string.IsNullOrWhiteSpace(props.SearchString))
                return new SearchDTO();

            string searchTerm = props.SearchString?.ToLower()!;

            int skip = (props.PageNumber - 1) * props.PageSize;

            // Count total matches for each category
            var totalVendorCategories = await _dbContext.VendorCategories
                .CountAsync(vc => EF.Functions.Like(vc.Name!.ToLower(), $"%{searchTerm}%"));

            var totalCategories = await _dbContext.Categories
                .CountAsync(c => EF.Functions.Like(c.Name!.ToLower(), $"%{searchTerm}%"));

            var totalProducts = await _dbContext.Products
                .CountAsync(p => EF.Functions.Like(p.Name!.ToLower(), $"%{searchTerm}%") ||
                                 EF.Functions.Like(p.Description!.ToLower(), $"%{searchTerm}%"));

            var totalVendors = await _dbContext.Vendors
                .CountAsync(v => EF.Functions.Like(v.Name!.ToLower(), $"%{searchTerm}%") ||
                                 EF.Functions.Like(v.Tag!.ToLower(), $"%{searchTerm}%"));

            var totalServices = await _dbContext.Services
                .CountAsync(s => EF.Functions.Like(s.Name!.ToLower(), $"%{searchTerm}%") ||
                                 EF.Functions.Like(s.Description!.ToLower(), $"%{searchTerm}%"));


            var vendorCategoriesTask = await _dbContext.VendorCategories
                .Where(vc => EF.Functions.Like(vc.Name!.ToLower(), $"%{searchTerm}%"))
                .Skip(skip)
                .Take(props.PageSize)
                .ToListAsync();

            var categoriesTask = await _dbContext.Categories
                .Where(c => EF.Functions.Like(c.Name!.ToLower(), $"%{searchTerm}%"))
                .Skip(skip)
                .Take(props.PageSize)
                .ToListAsync();

            var productsTask = await _dbContext.Products.Include(p => p.Vendor)
                .Where(p => EF.Functions.Like(p.Name!.ToLower(), $"%{searchTerm}%") ||
                            EF.Functions.Like(p.Description!.ToLower(), $"%{searchTerm}%"))
                .Skip(skip)
                .Take(props.PageSize)
                .ToListAsync();

            var vendorsTask = await _dbContext.Vendors
                .Where(v => EF.Functions.Like(v.Name!.ToLower(), $"%{searchTerm}%") ||
                            EF.Functions.Like(v.Tag!.ToLower(), $"%{searchTerm}%"))
                .Skip(skip)
                .Take(props.PageSize)
                .ToListAsync();

            var servicesTask = await _dbContext.Services
                .Where(s => EF.Functions.Like(s.Name!.ToLower(), $"%{searchTerm}%") ||
                            EF.Functions.Like(s.Description!.ToLower(), $"%{searchTerm}%"))
                .Skip(skip)
                .Take(props.PageSize)
                .ToListAsync();

            // Find the list with the most content
            var totals = new Dictionary<string, int>
    {
        { "VendorCategories", totalVendorCategories },
        { "Categories", totalCategories },
        { "Products", totalProducts },
        { "Vendors", totalVendors },
        { "Services", totalServices }
    };

            var maxContent = totals.OrderByDescending(t => t.Value).First();
            var maxTotalCount = maxContent.Value;

            // Calculate pagination metadata
            var totalPages = (int)Math.Ceiling((double)maxTotalCount / props.PageSize);


            return new SearchDTO
            {
                VendorCategories = _mapper.Map<List<VendorCategoryDtoLite>>(vendorCategoriesTask),
                Categories = _mapper.Map<List<CategoryDtoLite>>(categoriesTask),
                Products = _mapper.Map<List<ProductDtoLite>>(productsTask),
                Vendors = _mapper.Map<List<VendorDtoLite>>(vendorsTask),
                Services = _mapper.Map<List<ServiceDtoLite>>(servicesTask),

                // Metadata for the list with the most content
                CurrentPage = props.PageNumber,
                TotalPages = totalPages,
                TotalCount = maxTotalCount,
                HasNext = props.PageNumber < totalPages,
                HasPrevious = props.PageNumber > 1
            };

        }

=======
                if (imgPath == null) throw new Exception("Can not upload the product image");
                product.ProductImgUrl = imgPath;
                _dbContext.Products.Attach(product);
                await _dbContext.SaveChangesAsync();
                var ProductDto = _mapper.Map<ProductDto>(product);
                return ProductDto;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
>>>>>>> ee48634 (done with service, category and product controllers.)
    }
}
