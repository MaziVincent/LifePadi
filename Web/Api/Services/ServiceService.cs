using Api.DTO;
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
                _config["Cloudinary:Cloud_Name"],
                _config["Cloudinary:Api_Key"],
                _config["Cloudinary:Api_Secret"]
            );
            _cloudinary = new Cloudinary(account);

        }
        public async Task<IEnumerable<ServiceDTO>> allAsync()
        {
            try
            {
                var services = await _dbContext!.Services.Include(s => s.Products)!
                                  .ThenInclude(p => p.Vendor)
                                  .OrderByDescending(s => s.CreatedAt)
                                  .Where(s => s.IsActive == true)
                                  .ToListAsync();
                var serviceDTO = _mapper!.Map<List<ServiceDTO>>(services);
                return serviceDTO;

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ServiceDTOLite> createAsync(ServiceDTO service)
        {
            try
            {
                var newService = _mapper!.Map<Service>(service);
                newService.IsActive = true;
                await _dbContext!.Services.AddAsync(newService);
                await _dbContext!.SaveChangesAsync();
                var serviceDOLite = _mapper.Map<ServiceDTOLite>(newService);
                return serviceDOLite;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var service = await _dbContext!.Services.FirstOrDefaultAsync(s => s.Id == id);
                if (service != null) { return null!; }
                _dbContext.Services.Remove(service!);
                await _dbContext!.SaveChangesAsync();
                return "Service deleted";
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ServiceDTO> getAsync(int id)
        {
            try
            {
                var service = await _dbContext!.Services.Include(s => s.Products)!
                    .ThenInclude(p => p.Vendor)
                    .FirstOrDefaultAsync(s => s.Id == id);
                if (service == null) return null!;
                var serviceDTO = _mapper!.Map<ServiceDTO>(service);
                return serviceDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<ProductDTO>> getServiceProducts(int id)
        {
            try
            {
                var service = await _dbContext!.Services.Include(s => s.Products)!
                    .ThenInclude(p => p.Vendor).FirstOrDefaultAsync(s => s.Id == id);
                var products = _mapper!.Map<List<ProductDTO>>(service!.Products);
                return products;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> isActive(int id)
        {
            try
            {
                var response = await _dbContext!.Services.FirstOrDefaultAsync(s => s.Id == id);
                if (response!.IsActive == true) return true;
                return false;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<bool> nameExists(string name)
        {
            try
            {
                var response = await _dbContext!.Services.FirstOrDefaultAsync(s => s.Name == name);
                if (response == null) return false;
                return true;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<ServiceDTOLite>> nonActiveService()
        {
            try
            {
                var services = await _dbContext!.Services.Where(s => s.IsActive == false).ToListAsync();
                var serviceDTOLite = _mapper!.Map<List<ServiceDTOLite>>(services);
                return serviceDTOLite;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Task<IEnumerable<ServiceDTO>> searchByName(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<ServiceDTOLite>> servicesLite()
        {
            try
            {
                var services = await _dbContext!.Services.ToListAsync();
                var serviceDTOLite = _mapper!.Map<List<ServiceDTOLite>>(services);
                return serviceDTOLite;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ServiceDTOLite> updateAsync(ServiceDTO service, int id)
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
                var serviceDTOLite = _mapper!.Map<ServiceDTOLite>(initialService);
                return serviceDTOLite;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ServiceDTO> uploadImgUrl(int id, IFormFile image)
        {
            try
            {
                string? folderName = "Services";
                var service = await _dbContext!.Services.FirstOrDefaultAsync(s => s.Id == id);
                if (service == null) return null!;
                var imgPath = await UploadImage.uploadImg(image, _cloudinary!, folderName);
                if (imgPath == null) throw new Exception("Can not upload image");
                service.ServiceIconUrl = imgPath;
                _dbContext!.Services.Attach(service);
                await _dbContext.SaveChangesAsync();
                var serviceDTO = _mapper!.Map<ServiceDTO>(service);
                return serviceDTO;

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
