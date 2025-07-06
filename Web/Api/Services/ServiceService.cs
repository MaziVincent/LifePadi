using Api.DTO;
using Api.Exceptions;
using Api.Helpers;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using CloudinaryDotNet;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace Api.Services
{
    public class ServiceService : IService
    {
        private readonly IConfiguration? _config;
        private readonly DBContext? _dbContext;
        private readonly Cloudinary? _cloudinary;
        private readonly IMapper? _mapper;

        public ServiceService(IConfiguration config, DBContext dbContext, IMapper mapper)
        {
            _config = config;
            _dbContext = dbContext;
            _mapper = mapper;
            var account = new Account(
                 Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME") ??_config["Cloudinary:Cloud_Name"],
                Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY") ??_config["Cloudinary:Api_Key"],
               Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET") ?? _config["Cloudinary:Api_Secret"]
            );
            _cloudinary = new Cloudinary(account);

        }
        public async Task<PagedList<Service>> allAsync(SearchPaging props)
        {
            try
            {
                IQueryable<Service> servicesList = Enumerable.Empty<Service>().AsQueryable();

                if (props.SearchString is null)
                {
                    var services = await _dbContext!.Services.Include(s => s.Vendors)!
                                      .ThenInclude(p => p.Products)
                                      .OrderByDescending(s => s.CreatedAt)
                                      .ToListAsync();
                    servicesList = servicesList.Concat(services);

                    var result = PagedList<Service>.ToPagedList(servicesList, props.PageNumber, props.PageSize);
                    return result;

                }

                var servicesSearch = await _dbContext!.Services.Include(s => s.Vendors)!
                                  .ThenInclude(p => p.Products)
                                  .OrderByDescending(s => s.CreatedAt)
                                  .Where(s => s.SearchString!.Contains(props.SearchString!.ToUpper())).ToListAsync();
                
                servicesList = servicesList.Concat(servicesSearch);

                var returned = PagedList<Service>.ToPagedList(servicesList, props.PageNumber, props.PageSize);
                return returned;

            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<Service>> allActive(SearchPaging props)
        {
            try
            {
                //create base query
                var query = _dbContext!.Services
                    .Include(s => s.Vendors)!
                    .ThenInclude(v => v.Products)
                    .Where(s => s.IsActive == true)
                    .AsSplitQuery();

                if (!string.IsNullOrEmpty(props.SearchString))
                {
                    query = query.Where(c => c.SearchString!.ToLower().Contains(props.SearchString!.ToLower()));
                }

                // Execute the query and get the results
                var serviceList = await query.ToListAsync();
                // Check if the vendor list is empty
                if (serviceList.Count == 0)
                {
                    // If empty, return an empty PagedList
                    var emptyResult = PagedList<Service>.ToPagedList(Enumerable.Empty<Service>().AsQueryable(), props.PageNumber, props.PageSize);
                    return emptyResult;
                }

                //Randomize the vendor list
                var random = new Random();
                serviceList = [.. serviceList.OrderBy(x => random.Next())];

                var returned = PagedList<Service>.ToPagedList(serviceList.AsQueryable(), props.PageNumber, props.PageSize);
                return returned;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }

        }
        public async Task<ServiceDtoLite> createAsync(ServiceDto service)
        {
            try
            {
                string folderName = "Services";
                var newService = _mapper!.Map<Service>(service);
                newService.IsActive = true;
                newService.SearchString = (service.Name + " " + service.Description).ToUpper();
                if (service.ServiceIcon != null)
                {
                    var imgPath = await UploadImage.uploadImg(service.ServiceIcon, _cloudinary!, folderName);
                    if (imgPath == null) throw new ServiceException("Can not upload image");
                    newService.ServiceIconUrl = imgPath;
                }
                await _dbContext!.Services.AddAsync(newService);
                await _dbContext!.SaveChangesAsync();
                var serviceDOLite = _mapper.Map<ServiceDtoLite>(newService);
                return serviceDOLite;
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
                var service = await _dbContext!.Services.FirstOrDefaultAsync(s => s.Id == id);
                if (service == null) { return null!; }
                _dbContext.Services.Remove(service!);
                await _dbContext!.SaveChangesAsync();
                return "Service deleted";
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<ServiceDto> getAsync(int id)
        {
            try
            {
                var service = await _dbContext!.Services.Where(s => s.Id == id)
                    .Include(s => s.Vendors)!
                    .ThenInclude(p => p.Products)
                    .FirstOrDefaultAsync();

                if (service == null) return null!;
                var ServiceDto = _mapper!.Map<ServiceDto>(service);
                
                return ServiceDto;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDto>> getServiceProducts(int id)
        {
            try
            {
                var service = await _dbContext!.Services.Include(s => s.Vendors)!
                    .ThenInclude(p => p.Products).FirstOrDefaultAsync(s => s.Id == id);
                var products = _mapper!.Map<List<ProductDto>>(service!.Vendors!.SelectMany(v => v.Products!));
                return products;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<VendorDtoLite>> getVendorsForService(int id)
        {
            try
            {
                var service = await _dbContext!.Services.Include(s => s.Vendors)!
                    .ThenInclude(v => v.Addresses)
                    .Include(s => s.Vendors!)
                    .ThenInclude(v => v.Products)
                    .AsSplitQuery()
                    .FirstOrDefaultAsync(s => s.Id == id);
                var vendors = _mapper!.Map<List<VendorDtoLite>>(service!.Vendors);
                return vendors;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<bool> isActive(int id)
        {
            try
            {
                var response = await _dbContext!.Services.FirstOrDefaultAsync(s => s.Id == id);
                if (response!.IsActive == true) return true;
                return false;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<bool> nameExists(string name)
        {
            try
            {
                var response = await _dbContext!.Services.FirstOrDefaultAsync(s => s.Name!.ToLower() == name.ToLower());
                if (response == null) return false;
                return true;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<ServiceDtoLite>> nonActiveService()
        {
            try
            {
                var services = await _dbContext!.Services.Where(s => s.IsActive == false).ToListAsync();
                var ServiceDtoLite = _mapper!.Map<List<ServiceDtoLite>>(services);
                return ServiceDtoLite;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public Task<IEnumerable<ServiceDto>> searchByName(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ServiceDtoLite>> servicesLite()
        {
            try
            {
                var services = await _dbContext!.Services.ToListAsync();
                var ServiceDtoLite = _mapper!.Map<List<ServiceDtoLite>>(services);
                return ServiceDtoLite;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<object> serviceStats()
        {
            try
            {
                var stats = new
                {
                    totalNumberOfServices = await totalNumberOfServices(),
                    totalNumberOfActiveServices = await totalNumberOfActiveServices(),
                    totalNumberOfNonActiveServices = await totalNumberOfNonActiveServices()
                };
                return stats;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfActiveServices()
        {
            try
            {
                var response = await _dbContext!.Services.Where(s => s.IsActive == true).CountAsync();
                return response;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfNonActiveServices()
        {
            try
            {
                var response = await _dbContext!.Services.Where(s => s.IsActive == false).CountAsync();
                return response;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfServices()
        {
            try
            {
                var response = await _dbContext!.Services.CountAsync();
                return response;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<ServiceDtoLite> updateAsync(ServiceDto service, int id)
        {
            try
            {
                var initialService = await _dbContext!.Services.FirstOrDefaultAsync(s => s.Id == id);
                if (initialService == null) return null!;
                initialService.Name = service.Name;
                initialService.Description = service.Description;
                initialService.IsActive = service.IsActive;
                initialService.UpdatedAt = DateTime.UtcNow;
                _dbContext.Services.Attach(initialService);
                await _dbContext.SaveChangesAsync();
                var ServiceDtoLite = _mapper!.Map<ServiceDtoLite>(initialService);
                return ServiceDtoLite;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<ServiceDto> uploadImgUrl(int id, IFormFile image)
        {
            try
            {
                string? folderName = "Services";
                var service = await _dbContext!.Services.FirstOrDefaultAsync(s => s.Id == id);
                if (service == null) return null!;
                var imgPath = await UploadImage.uploadImg(image, _cloudinary!, folderName);
                if (imgPath == null) throw new ServiceException("Can not upload image");
                service.ServiceIconUrl = imgPath;
                _dbContext!.Services.Attach(service);
                await _dbContext.SaveChangesAsync();
                var ServiceDto = _mapper!.Map<ServiceDto>(service);
                return ServiceDto;

            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }


        public async Task<object> ChangeActivation(int id)
        {
            try
            {
                var service = await _dbContext!.Services.FirstOrDefaultAsync(s => s.Id == id);
                if (service!.IsActive == true){
                    service.IsActive = false;
                    _dbContext.Update(service);
                    await _dbContext.SaveChangesAsync();
                    return new
                    {
                        message = "Service deactivated Successfully",
                    }; 
                }
                service.IsActive = true;
                _dbContext.Update(service);
                await _dbContext.SaveChangesAsync();
                return new
                {
                    message = "Service Activated Successfully",
                };
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }
    }
}
