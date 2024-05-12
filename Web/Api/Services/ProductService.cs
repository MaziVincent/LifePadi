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
            _cloudinary = new Cloudinary( account );
        }

        public async Task<IEnumerable<ProductDTO>> allAsync(int pageNumber, int pageSize, string searchString)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                if (searchString == "")
                {
                    var products1 = await _dbContext!.Products.Skip(skip).Take(pageSize)
                        .Include(p => p.Vendor)
                        .Include(p => p.Service)
                        .Include(p => p.Category)
                        .OrderByDescending(p => p.CreatedAt)
                        .Where(p => p.Status == true).ToListAsync();
                    var productDTO1 = _mapper.Map<List<ProductDTO>>(products1);
                    return productDTO1;
                }
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Vendor)
                    .Include(p => p.Service)
                    .Include(p => p.Category)
                    .OrderByDescending(p => p.CreatedAt)
                    .Where(p => StringSearch.stringSearch(searchString, p.SearchString!) == true).ToListAsync();
                var productDTO = _mapper.Map<List<ProductDTO>>(products);
                return productDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDTOLite>> allProductLiteAsync()
        {
            try
            {
                var products = await _dbContext.Products.OrderByDescending(p => p.CreatedAt).ToListAsync();
                var productDTOLite = _mapper.Map<List<ProductDTOLite>>(products);
                return productDTOLite;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ProductDTO> createAsync(CreateProductDTO product)
        {
            try
            {
                var folderName = "Products";
                var newProduct = _mapper.Map<Product>(product);
                newProduct.Status = true;
                newProduct.SearchString = product.Name!.ToUpper() + " " + product.Price + " " + newProduct.Status;
                var imgPath = await UploadImage.uploadImg(product.Image!, _cloudinary, folderName);
                if (imgPath == null!) throw new Exception("Can not upload the product image");
                newProduct.ProductImgUrl = imgPath;
                await _dbContext.Products.AddAsync(newProduct);
                await _dbContext.SaveChangesAsync();
                var productDTO = _mapper.Map<ProductDTO>(newProduct);

                return productDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var product = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
                if (product == null) return null!;
                return "Product deleted";
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ProductDTO> getAsync(int id)
        {
            try
            {
                var product = await _dbContext.Products
                    .Include(p => p.Vendor)
                    .Include(p => p.Service)
                    .Include(p => p.Category)
                    .FirstOrDefaultAsync(p => p.Id == id);
                if (product == null) return null!;
                var productDTO = _mapper.Map<ProductDTO>(product);
                return productDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<VendorDTO> getProductVendor(int id)
        {
            try
            {
                var product = await _dbContext.Products.Include(p => p.Vendor).FirstOrDefaultAsync(p => p.Id == id);
                if (product == null) return null!;
                var vendor = _mapper.Map<VendorDTO>(product.Vendor);
                return vendor;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDTO>> searchProduct(string searchString)
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
                        if (matchRatio >= 0.8) // Set a threshold for acceptable similarity
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

                var productDTOList = _mapper.Map<List<ProductDTO>>(productList);
                return productDTOList;
            }catch (Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDTO>> searchProductByAll(int pageNumber, int pageSize, string name)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Category)
                    .Include(p => p.Service)
                    .Include(p => p.Vendor)
                    .OrderByDescending(p => p.CreatedAt)
                    .Where(p => StringSearch.stringSearch(name, p.Category!.Name!) == true || 
                    StringSearch.stringSearch(name, p.Service!.Name!) == true || 
                    StringSearch.stringSearch(name, p.Vendor!.Name!) == true)
                    .ToListAsync();
                var productDTO = _mapper.Map<List<ProductDTO>>(products);
                return productDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDTO>> searchProductByCategory(int pageNumber, int pageSize, string categoryName)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Category)
                    .Include(p => p.Service)
                    .Include(p => p.Vendor)
                    .OrderByDescending(p => p.CreatedAt)
                    .Where(p => StringSearch.stringSearch(categoryName, p.Category!.Name!) == true)
                    .ToListAsync();
                var productDTO = _mapper.Map<List<ProductDTO>>(products);
                return productDTO;
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDTO>> searchProductByService(int pageNumber, int pageSize, string serviceName)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Category)
                    .Include(p => p.Service)
                    .Include(p => p.Vendor)
                    .OrderByDescending(p => p.CreatedAt)
                    .Where(p => StringSearch.stringSearch(serviceName, p.Service!.Name!) == true)
                    .ToListAsync();
                var productDTO = _mapper.Map<List<ProductDTO>>(products);
                return productDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDTO>> searchProductByVendor(int pageNumber, int pageSize, string vendorName)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var products = await _dbContext.Products.Skip(skip).Take(pageSize)
                    .Include(p => p.Category)
                    .Include(p => p.Service)
                    .Include(p => p.Vendor)
                    .OrderByDescending(p => p.CreatedAt)
                    .Where(p => StringSearch.stringSearch(vendorName, p.Vendor!.Name!) == true)
                    .ToListAsync();
                var productDTO = _mapper.Map<List<ProductDTO>>(products);
                return productDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ProductDTO> updateAsync(ProductDTO product, int id)
        {
            try
            {
                var initialProduct = await _dbContext.Products.FirstOrDefaultAsync(p => p.Id == id);
                if (initialProduct == null) return null!;
                initialProduct.Name = product.Name;
                initialProduct.Description = product.Description;
                initialProduct.Price = product.Price;
                initialProduct.ServiceId = product.ServiceId;
                initialProduct.VendorId = product.VendorId;
                initialProduct.CategoryId = product.CategoryId;
                initialProduct.Status = product.Status;
                initialProduct.SearchString = product.Name!.ToUpper() + " " + product.Price + " " + product.Status;
                initialProduct.UpdatedAt = DateTime.UtcNow;
                _dbContext.Products.Attach(initialProduct);
                await _dbContext.SaveChangesAsync();
                var productDTO = _mapper.Map<ProductDTO>(initialProduct);
                return productDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ProductDTO> uploadProductImg(int id, IFormFile productImg)
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
                var productDTO = _mapper.Map<ProductDTO>(product);
                return productDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
