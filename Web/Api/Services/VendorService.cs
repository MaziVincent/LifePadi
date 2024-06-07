using Api.DTO;
<<<<<<< HEAD
using Api.Exceptions;
=======
>>>>>>> ee48634 (done with service, category and product controllers.)
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
<<<<<<< HEAD
        private readonly IAddress _address;
        public VendorService(DBContext dbContext, IMapper mapper, IConfiguration config, IAddress address)
=======
        public VendorService(DBContext dbContext, IMapper mapper, IConfiguration config)
>>>>>>> ee48634 (done with service, category and product controllers.)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _config = config;
<<<<<<< HEAD
            _address = address;
=======
>>>>>>> ee48634 (done with service, category and product controllers.)
            var account = new Account(
                _config["Cloudinary:Cloud_Name"],
                _config["Cloudinary:Api_Key"],
                _config["Cloudinary:Api_Secret"]
             );
<<<<<<< HEAD
<<<<<<< HEAD
            _cloudinary = new Cloudinary(account);
        }
<<<<<<< HEAD
        public async Task<PagedList<Vendor>> allAsync(SearchPaging props)
        {
            try
            {
                IQueryable<Vendor> vendorList = Enumerable.Empty<Vendor>().AsQueryable();

                if (props.SearchString is null)
                {
                    var vendor1 = await _dbContext!.Vendors.OrderByDescending(c => c.CreatedAt).Include(p => p.Products).Include(v => v.Addresses).AsSplitQuery()
                    .ToListAsync();
                    vendorList = vendorList.Concat(vendor1);
                    var result = PagedList<Vendor>.ToPagedList(vendorList, props.PageNumber, props.PageSize);
                    return result;
                }
                var vendors = await _dbContext!.Vendors.OrderByDescending(c => c.CreatedAt).Include(p => p.Products).Include(v => v.Addresses).AsSplitQuery()
                    .Where(c => c.Name!.ToLower().Contains(props.SearchString!.ToLower()))
                    .ToListAsync();
                vendorList = vendorList.Concat(vendors);
                var returned = PagedList<Vendor>.ToPagedList(vendorList, props.PageNumber, props.PageSize);
                return returned;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<AuthVendorDtoLite> createAsync(AuthVendorDto vendor)
=======
            _cloudinary = new Cloudinary( account );
=======
            _cloudinary = new Cloudinary(account);
>>>>>>> 98415b4 (done with dashboard)
        }
        public async Task<IEnumerable<VendorDTO>> allAsync(int pageNumber, int pageSize)
=======
        public async Task<IEnumerable<VendorDto>> allAsync(int pageNumber, int pageSize)
>>>>>>> 836ec36 (changed all DTO to Dto)
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
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<AuthVendorDTOLite> createAsync(AuthVendorDTO vendor)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<AuthVendorDtoLite> createAsync(AuthVendorDto vendor)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var newVendor = _mapper.Map<Vendor>(vendor);
<<<<<<< HEAD
                var vendorExist = await vendorExists(vendor.Email!);
                if (vendorExist) throw new AlreadyExistException("Vendor already exists");
                newVendor.PasswordHash = BCrypt.Net.BCrypt.HashPassword(vendor.Password);
                newVendor.IsActive = false;
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
                    LocalGovt = vendor.LocalGovt!,
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
=======
                newVendor.PasswordHash = BCrypt.Net.BCrypt.HashPassword(vendor.Password);
                newVendor.SearchString = vendor.VendorType!.ToUpper() + " " + vendor.Name!.Replace(" ", "").ToUpper();
                await _dbContext!.Vendors.AddAsync(newVendor);
                await _dbContext!.SaveChangesAsync();
                var authUserDTO = _mapper.Map<AuthVendorDtoLite>(newVendor);
                return authUserDTO;
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
                var vendor = await _dbContext!.Vendors.FirstOrDefaultAsync(v => v.Id == id);
                if (vendor == null) return null!;
<<<<<<< HEAD
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
=======
                return "Vendor deleted";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<IEnumerable<VendorDTOLite>> searchAsync(string searchString)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
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
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<VendorDtoLite>> searchAsync(string searchString)
>>>>>>> 836ec36 (changed all DTO to Dto)
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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
                var vendorDTOLite = _mapper.Map<List<VendorDTOLite>>(vendorList);
                return vendorDTOLite;
=======
                var VendorDtoLite = _mapper.Map<List<VendorDtoLite>>(vendorList);
                return VendorDtoLite;
>>>>>>> 836ec36 (changed all DTO to Dto)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<AuthVendorDTOLite> updateAsync(AuthVendorDTOLite vendor, int id)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<AuthVendorDtoLite> updateAsync(AuthVendorDtoLite vendor, int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var initialVendor = await _dbContext!.Vendors.FirstOrDefaultAsync(v => v.Id == id);
<<<<<<< HEAD
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
                currentAddress.LocalGovt = vendor.LocalGovt;
                currentAddress.PostalCode = vendor.PostalCode;
                currentAddress.Longitude = vendor.Longitude;
                currentAddress.Latitude = vendor.Latitude;
                _dbContext!.Addresses.Update(currentAddress);
                _dbContext.Vendors.Update(initialVendor);
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
=======
                if (initialVendor == null) return null!;
                initialVendor.SearchString = vendor.VendorType!.ToUpper() + " " + vendor.Name!.Replace(" ", "").ToUpper();
                initialVendor.Name = vendor.Name;
                initialVendor.VendorType = vendor.VendorType;
                initialVendor.Email = vendor.Email;
                initialVendor.PhoneNumber = vendor.PhoneNumber;
                initialVendor.ContactAddress = vendor.ContactAddress;
                initialVendor.Tag = vendor.Tag;
                initialVendor.UpdatedAt = DateTime.UtcNow;
                _dbContext.Vendors.Attach(initialVendor);
                await _dbContext.SaveChangesAsync();
                var currentVendor = _mapper.Map<AuthVendorDtoLite>(initialVendor);

                return currentVendor;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<VendorDTO> uploadVendorImg(int id, IFormFile image)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<VendorDto> uploadVendorImg(int id, IFormFile image)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                string? folderName = "Vendors";
                var vendor = await _dbContext!.Vendors.FirstOrDefaultAsync(v => v.Id == id);
                if (vendor == null) return null!;
                var imgPath = await UploadImage.uploadImg(image, _cloudinary, folderName);
<<<<<<< HEAD
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
=======
                if (imgPath == null) throw new Exception("Can not upload the vendor image");
                vendor.VendorImgUrl = imgPath;
                _dbContext!.Vendors.Attach(vendor);
                await _dbContext.SaveChangesAsync();
                var VendorDto = _mapper.Map<VendorDto>(vendor);
                return VendorDto;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<IEnumerable<VendorDTOLite>> vendorsOnly()
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IEnumerable<VendorDtoLite>> vendorsOnly()
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var vendors = await _dbContext!.Vendors.ToListAsync();
<<<<<<< HEAD
<<<<<<< HEAD
                var VendorDtoLite = _mapper.Map<List<VendorDtoLite>>(vendors);
                return VendorDtoLite;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDtoLite>> vendorsProduct(int id)
=======
                var vendorDTOLite = _mapper.Map<List<VendorDTOLite>>(vendors);
                return vendorDTOLite;
=======
                var VendorDtoLite = _mapper.Map<List<VendorDtoLite>>(vendors);
                return VendorDtoLite;
>>>>>>> 836ec36 (changed all DTO to Dto)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<IEnumerable<ProductDTOLite>> vendorsProduct(int id)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IEnumerable<ProductDtoLite>> vendorsProduct(int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var vendor = await _dbContext!.Vendors
                    .Include(v => v.Products!)
<<<<<<< HEAD
<<<<<<< HEAD
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
                        .Include(p => p.Vendor)
                        .ThenInclude(v => v!.Addresses!)
                        .AsSplitQuery()
                        .OrderByDescending(p => p.CreatedAt)
                        .ToListAsync();
                    

                    productList = productList.Concat(_mapper.Map<List<ProductDto>>(products));
                    var result = PagedList<ProductDto>.ToPagedList(productList, props.PageNumber, props.PageSize);
                    return result;
                }
                var products1 = await _dbContext!.Products
                    .Where(p => p.VendorId == id)
                    .Include(p => p.Category)
                    .Include(p => p.Vendor)
                    .ThenInclude(v => v.Addresses!)
                    .Where(p => p.Name!.ToLower().Contains(props.SearchString!.ToLower()))
                    .AsSplitQuery()
                    .OrderByDescending(p => p.CreatedAt)
                    .ToListAsync();
                productList = productList.Concat(_mapper.Map<List<ProductDto>>(products1));
                var returned = PagedList<ProductDto>.ToPagedList(productList, props.PageNumber, props.PageSize);
                return returned;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }
    
    public async Task<object> changeVendorActivation(int id){
        var vendor = await _dbContext!.Vendors!.FirstOrDefaultAsync(v => v.Id == id);
        if(vendor == null) throw new ServiceException("Vendor does not exist");
        if(vendor.IsActive == false){
            vendor.IsActive = true;
            _dbContext!.Vendors!.Update(vendor);
            await _dbContext!.SaveChangesAsync();
            return new{
                message = "Vendor activated successfully",
            };
        }
            vendor.IsActive = false;
            _dbContext!.Vendors!.Update(vendor);
            await _dbContext!.SaveChangesAsync();
            return new
            {
                message = "Vendor Deactivated successfully",
            };


        }

        public async Task<string> activateVendor(int id)
        {
            try{
                var vendor = await _dbContext!.Vendors!.FirstOrDefaultAsync(v => v.Id == id);
                if(vendor == null) throw new ServiceException("Vendor does not exist");
                vendor.IsActive = true;
                _dbContext!.Vendors!.Update(vendor);
                await _dbContext!.SaveChangesAsync();
                return "Vendor activated successfully";
            }catch(Exception ex){
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<string> deactivateVendor(int id)
        {
            try{
                var vendor = await _dbContext!.Vendors!.FirstOrDefaultAsync(v => v.Id == id);
                if(vendor == null) throw new ServiceException("Vendor does not exist");
                vendor.IsActive = false;
                _dbContext!.Vendors!.Update(vendor);
                await _dbContext!.SaveChangesAsync();
                return "Vendor deactivated successfully";
            }catch(Exception ex){
                throw new ServiceException(ex.Message);
            }
        }
    }
    
    }

=======
                    .ThenInclude(p => p.Service)
                    .Include(v => v.Products!)
=======
>>>>>>> 58020e7 (removed service from product)
                    .ThenInclude(p => p.Category)
                    .FirstOrDefaultAsync(v => v.Id == id);
                var products = _mapper.Map<List<ProductDtoLite>>(vendor!.Products);
                return products;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
>>>>>>> ee48634 (done with service, category and product controllers.)
