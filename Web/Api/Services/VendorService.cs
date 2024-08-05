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
        private readonly IAddress _address;
        public VendorService(DBContext dbContext, IMapper mapper, IConfiguration config, IAddress address)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _config = config;
            _address = address;
            var account = new Account(
                _config["Cloudinary:Cloud_Name"],
                _config["Cloudinary:Api_Key"],
                _config["Cloudinary:Api_Secret"]
             );
            _cloudinary = new Cloudinary(account);
        }
        public async Task<PagedList<Vendor>> allAsync(SearchPaging props)
        {
            try
            {
                IQueryable<Vendor> vendorList = Enumerable.Empty<Vendor>().AsQueryable();

                if (props.SearchString is null)
                {
                    var vendor1 = await _dbContext!.Vendors.OrderByDescending(c => c.CreatedAt).Include(p => p.Products)
                    .ToListAsync();
                    vendorList = vendorList.Concat(vendor1);
                    var result = PagedList<Vendor>.ToPagedList(vendorList, props.PageNumber, props.PageSize);
                    return result;
                }
                var vendors = await _dbContext!.Vendors.OrderByDescending(c => c.CreatedAt).Include(p => p.Products)
                    .Where(c => c.Name!.ToLower().Contains(props.SearchString!.ToLower()))
                    .ToListAsync();
                vendorList = vendorList.Concat(vendors);
                var returned = PagedList<Vendor>.ToPagedList(vendorList, props.PageNumber, props.PageSize);
                return returned;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
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

                var address = new Address
                {
                    UserId = newVendor.Id!,
                    Name = vendor.ContactAddress,
                    Town = vendor.Town!,
                    City = vendor.City!,
                    LocalGovt = vendor.LocalGovt,
                    State = vendor.State!,
                    PostalCode = vendor.PostalCode!,
                    Longitude = vendor.Longitude!,
                    Latitude = vendor.Latitude!
                };
                await _dbContext.Addresses.AddAsync(address);
                await _dbContext!.SaveChangesAsync();
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
                _dbContext.Vendors.Remove(vendor);
                await _dbContext.SaveChangesAsync();
                return "Vendor deleted";
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<AuthVendorDto> getAsync(int id)
        {
            try
            {
                var vendor = await _dbContext!.Vendors.Where(v => v.Id == id)
                                .Include(p => p.Products)
                                .Include(v => v.Addresses!.Where(a => a.UserId == id)).FirstOrDefaultAsync();
                if (vendor == null) return null!;
                var address = vendor.Addresses!.FirstOrDefault();
                if (address == null)
                {
                    var authVendorDto1 = new AuthVendorDto
                    {
                        Id = vendor.Id,
                        Name = vendor.Name,
                        Email = vendor.Email,
                        PhoneNumber = vendor.PhoneNumber,
                        Tag = vendor.Tag,
                        OpeningHours = vendor.OpeningHours,
                        ClosingHours = vendor.ClosingHours,
                        ServiceId = vendor.ServiceId,
                        VendorCategoryId = vendor.VendorCategoryId,
                        ContactAddress = vendor.ContactAddress,
                        VendorImgUrl = vendor.VendorImgUrl,
                        Products = _mapper.Map<List<ProductDtoLite>>(vendor.Products)

                    };



                    return authVendorDto1;
                }
                var authVendorDto = new AuthVendorDto
                {
                    Id = vendor.Id,
                    Name = vendor.Name,
                    Email = vendor.Email,
                    PhoneNumber = vendor.PhoneNumber,
                    //Password = vendor.PasswordHash,
                    Tag = vendor.Tag,
                    OpeningHours = vendor.OpeningHours,
                    ClosingHours = vendor.ClosingHours,
                    ServiceId = vendor.ServiceId,
                    VendorCategoryId = vendor.VendorCategoryId,
                    ContactAddress = vendor.ContactAddress,
                    VendorImgUrl = vendor.VendorImgUrl,
                    Town = address!.Town,
                    City = address.City,
                    LocalGovt = address.LocalGovt,
                    State = address.State,
                    PostalCode = address.PostalCode,
                    Longitude = address.Longitude,
                    Latitude = address.Latitude,
                    Products = _mapper.Map<List<ProductDtoLite>>(vendor.Products)
                };



                return authVendorDto;
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

        public async Task<AuthVendorDtoLite> updateAsync(AuthVendorDto vendor, int id)
        {
            try
            {
                var initialVendor = await _dbContext!.Vendors.FirstOrDefaultAsync(v => v.Id == id);
                var currentAddress = await _dbContext!.Addresses.FirstOrDefaultAsync(a => a.UserId == id);
                if (initialVendor == null) return null!;
                initialVendor.SearchString = vendor.Name!.Replace(" ", "").ToUpper() + " " + vendor.Tag!.Replace(" ", "").ToUpper();
                initialVendor.Name = vendor.Name;
                initialVendor.Email = vendor.Email;
                initialVendor.PhoneNumber = vendor.PhoneNumber;
                initialVendor.ContactAddress = vendor.ContactAddress;
                initialVendor.Tag = vendor.Tag;
                initialVendor.ServiceId = vendor.ServiceId;
                initialVendor.OpeningHours = vendor.OpeningHours;
                initialVendor.ClosingHours = vendor.ClosingHours;
                initialVendor.TimeTakesToPurchase = vendor.TimeTakesToPurchase;
                initialVendor.UpdatedAt = DateTime.UtcNow;
                currentAddress!.Name = vendor.ContactAddress;
                currentAddress.Town = vendor.Town;
                currentAddress.City = vendor.City;
                currentAddress.State = vendor.State;
                currentAddress.PostalCode = vendor.PostalCode;
                currentAddress.Longitude = vendor.Longitude;
                currentAddress.Latitude = vendor.Latitude;
                _dbContext!.Addresses.Update(currentAddress);
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

        public async Task<PagedList<ProductDto>> getVendorProducts(int id, SearchPaging props)
        {
            try
            {
                IQueryable<ProductDto> productList = Enumerable.Empty<ProductDto>().AsQueryable();
                if (props.SearchString is null)
                {
                    var products = await _dbContext!.Products
                        .Where(p => p.VendorId == id)
                        .Include(p => p.Category)
                        .OrderByDescending(p => p.CreatedAt)
                        .ToListAsync();
                    productList = productList.Concat(_mapper.Map<List<ProductDto>>(products));
                    var result = PagedList<ProductDto>.ToPagedList(productList, props.PageNumber, props.PageSize);
                    return result;
                }
                var products1 = await _dbContext!.Products
                    .Where(p => p.VendorId == id)
                    .Include(p => p.Category)
                    .Where(p => p.Name!.ToLower().Contains(props.SearchString!.ToLower()))
                    .OrderByDescending(p => p.CreatedAt)
                    .ToListAsync();
                productList = productList.Concat(_mapper.Map<List<ProductDto>>(products1));
                var returned = PagedList<ProductDto>.ToPagedList(productList, props.PageNumber, props.PageSize);
                return returned;
            }catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }
    }
}
