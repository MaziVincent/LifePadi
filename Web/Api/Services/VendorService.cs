using Api.DTO;
using Api.Exceptions;
using Api.Helpers;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using CloudinaryDotNet;
using FuzzySharp;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class VendorService : IVendor
    {
        private readonly DBContext? _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly Cloudinary _cloudinary;
        public VendorService(DBContext dbContext, IMapper mapper, IConfiguration config)
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
        public async Task<IEnumerable<VendorDto>> allAsync(int pageNumber, int pageSize)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var vendors = await _dbContext!.Vendors.Skip(skip).Take(pageSize).OrderByDescending(v => v.CreatedAt).Include(v => v.Products).ToListAsync();
                var allVendor = _mapper.Map<List<VendorDto>>(vendors);
                return allVendor;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
        }

        public async Task<AuthVendorDtoLite> createAsync(AuthVendorDto vendor)
        {
            try
            {
                var newVendor = _mapper.Map<Vendor>(vendor);
                var vendorExist = await vendorExists(vendor.Email!);
                if (vendorExist) throw new AlreadyExistException("Vendor already exists");
                newVendor.PasswordHash = BCrypt.Net.BCrypt.HashPassword(vendor.Password);
                newVendor.SearchString = vendor.Name!.Replace(" ", "").ToUpper() + " " + vendor.Tag!.Replace(" ", "").ToUpper();
                await _dbContext!.Vendors.AddAsync(newVendor);
                await _dbContext!.SaveChangesAsync();
                var authUserDTO = _mapper.Map<AuthVendorDtoLite>(newVendor);
                return authUserDTO;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var vendor = await _dbContext!.Vendors.FirstOrDefaultAsync(v => v.Id == id);
                if (vendor == null) return null!;
                return "Vendor deleted";
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<AuthVendorDtoLite> getAsync(int id)
        {
            try
            {
                var vendor = await _dbContext!.Vendors.FirstOrDefaultAsync(v => v.Id == id);
                if (vendor == null) return null!;
                var authVendorDtoLite = _mapper.Map<AuthVendorDtoLite>(vendor);
                return authVendorDtoLite;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<VendorDtoLite> getVendorByTagName(string tag)
        {
            try
            {
                var vendor = await _dbContext!.Vendors.Include(v => v.Products)
                .FirstOrDefaultAsync(v => v.Tag!.ToLower().Contains(tag.ToLower()));
                if (vendor == null) return null!;
                var VendorDtoLite = _mapper.Map<VendorDtoLite>(vendor);
                return VendorDtoLite;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<VendorDtoLite>> searchAsync(string searchString)
        {
            try
            {
                var vendorList = new List<Vendor>();
                var vendors = await _dbContext!.Vendors.ToListAsync();
                foreach (var vendor in vendors)
                {
                    var searchParam = vendor.SearchString!.ToLower().Split(" ");
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
                        vendorList.Add(vendor);
                    }
                }
                var VendorDtoLite = _mapper.Map<List<VendorDtoLite>>(vendorList);
                return VendorDtoLite;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfVendors()
        {
            try
            {
                var totalVendors = await _dbContext!.Vendors.CountAsync();
                return totalVendors;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<AuthVendorDtoLite> updateAsync(AuthVendorDtoLite vendor, int id)
        {
            try
            {
                var initialVendor = await _dbContext!.Vendors.FirstOrDefaultAsync(v => v.Id == id);
                if (initialVendor == null) return null!;
                initialVendor.SearchString = vendor.Name!.Replace(" ", "").ToUpper() + " " + vendor.Tag!.Replace(" ", "").ToUpper();
                initialVendor.Name = vendor.Name;
                initialVendor.Email = vendor.Email;
                initialVendor.PhoneNumber = vendor.PhoneNumber;
                initialVendor.ContactAddress = vendor.ContactAddress;
                initialVendor.Tag = vendor.Tag;
                initialVendor.OpeningHours = vendor.OpeningHours;
                initialVendor.ClosingHours = vendor.ClosingHours;
                initialVendor.UpdatedAt = DateTime.UtcNow;
                _dbContext.Vendors.Attach(initialVendor);
                await _dbContext.SaveChangesAsync();
                var currentVendor = _mapper.Map<AuthVendorDtoLite>(initialVendor);

                return currentVendor;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<VendorDto> uploadVendorImg(int id, IFormFile image)
        {
            try
            {
                string? folderName = "Vendors";
                var vendor = await _dbContext!.Vendors.FirstOrDefaultAsync(v => v.Id == id);
                if (vendor == null) return null!;
                var imgPath = await UploadImage.uploadImg(image, _cloudinary, folderName);
                if (imgPath == null) throw new ServiceException("Can not upload the vendor image");
                vendor.VendorImgUrl = imgPath;
                _dbContext!.Vendors.Attach(vendor);
                await _dbContext.SaveChangesAsync();
                var VendorDto = _mapper.Map<VendorDto>(vendor);
                return VendorDto;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<bool> vendorExists(string email)
        {
            try
            {
                var vendor = await _dbContext!.Vendors!.FirstOrDefaultAsync(v => v.Email!.ToLower() == email.ToLower());
                if (vendor == null) return false;
                return true;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<VendorDtoLite>> vendorsOnly()
        {
            try
            {
                var vendors = await _dbContext!.Vendors.ToListAsync();
                var VendorDtoLite = _mapper.Map<List<VendorDtoLite>>(vendors);
                return VendorDtoLite;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDtoLite>> vendorsProduct(int id)
        {
            try
            {
                var vendor = await _dbContext!.Vendors
                    .Include(v => v.Products!)
                    .ThenInclude(p => p.Category)
                    .FirstOrDefaultAsync(v => v.Id == id);
                var products = _mapper.Map<List<ProductDtoLite>>(vendor!.Products);
                return products;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }
    }
}
