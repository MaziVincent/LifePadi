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
    public class RiderService : IRider
    {
        private readonly Cloudinary _cloudinary;
        private readonly IConfiguration _config;
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;
        public RiderService(IConfiguration config, DBContext dbContext, IMapper mapper)
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

        public async Task<object> activateRider(int id)
        {
            try
            {
                var rider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Id == id);
                if (rider == null) return null!;
                rider.IsActive = true;
                _dbContext.Riders.Update(rider);
                await _dbContext.SaveChangesAsync();
                return new { success = "Rider activated" };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<AuthRiderDto> createAsync(CreateRiderDto rider)
        {
            try
            {
                var folderName = "Riders";
                var  initialRider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Email == rider.Email || r.PhoneNumber == rider.PhoneNumber);
                if (initialRider != null) throw new Exceptions.ServiceException("Rider already exists");
                var newRider = _mapper.Map<Rider>(rider);
                newRider.PasswordHash = BCrypt.Net.BCrypt.HashPassword(rider.Password);
                newRider.IsActive = false;
                newRider.IsVerified = false;
                newRider.SearchString = rider.FirstName!.ToUpper() + " " + rider.LastName!.ToUpper() + " " + rider.Email!.ToUpper() + " " + rider.PhoneNumber;
                var imgPath = await UploadImage.uploadImg(rider.IdentityImg!, _cloudinary, folderName);
                if (imgPath == null!) throw new Exceptions.ServiceException("Can not upload the product image");
                newRider.IdentityImgUrl = imgPath;
                await _dbContext.Riders.AddAsync(newRider);
                await _dbContext.SaveChangesAsync();
                var authRiderDto = _mapper.Map<AuthRiderDto>(newRider);
                return authRiderDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> deactivateRider(int id)
        {
            try
            {
                var rider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Id == id);
                if (rider == null) return null!;
                rider.IsActive = false;
                _dbContext.Riders.Update(rider);
                await _dbContext.SaveChangesAsync();
                return new { success = "Rider deactivated" };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> deleteAsync(int id)
        {
            try
            {
                var rider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Id == id);
                if (rider == null) return null!;
                _dbContext.Riders.Remove(rider);
                await _dbContext.SaveChangesAsync();
                return new {success = "Rider deleted"};
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<Rider>> getAllAsync(SearchPaging props)
        {
            try
            {
                IQueryable<Rider> ridersList = Enumerable.Empty<Rider>().AsQueryable();
                if (props.SearchString is null)
                {
                    var ridersLs = await _dbContext.Riders
                        .Include(r => r.Deliveries)
                        .OrderByDescending(r => r.CreatedAt)
                        .AsSplitQuery()
                        .ToListAsync();

                    ridersList = ridersList.Concat(ridersLs);
                    var result = PagedList<Rider>.ToPagedList(ridersList, props.PageNumber, props.PageSize);

                    return result;

                }
                var riders = await _dbContext.Riders
                        .Include(r => r.Deliveries)
                        .OrderByDescending(r => r.CreatedAt)
                        .Where(r => r.SearchString!.ToLower().Contains(props.SearchString.ToLower()))
                        .AsSplitQuery()
                        .ToListAsync();
                ridersList = ridersList.Concat(riders);
                var response = PagedList<Rider>.ToPagedList(ridersList, props.PageNumber, props.PageSize);

                return response;

            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<GetRiderDto> getAsync(int id)
        {
            try
            {
                var rider = await _dbContext.Riders.Include(r => r.Deliveries)
                    .FirstOrDefaultAsync(r => r.Id == id);
                if (rider == null) return null!;
                var getRiderDto = _mapper.Map<GetRiderDto>(rider);
                return getRiderDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<DeliveryDto>> getRiderDeliveries(int id)
        {
            try
            {
                var delivery = await _dbContext.Deliveries
                    .Include(d => d.Rider)
                    .Where(d => d.RiderId == id)
                    .ToListAsync();
                if (delivery == null) return null!;
                var deliveryDTO = _mapper.Map<List<DeliveryDto>>(delivery);
                return deliveryDTO;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<Order>> getRiderOrders(SearchPaging props, int id)
        {
            try
            {
                IQueryable<Order> listOfOrders = Enumerable.Empty<Order>().AsQueryable();

                    if(props.SearchString is null){

                var deliveries = await _dbContext.Deliveries
                   .Include(d => d.Rider)
                    .Include(d => d.Order)
                    .ThenInclude(o => o!.OrderItems)!
                    .ThenInclude(o => o.Product)
                    .ThenInclude(p => p!.Vendor)
                    .Where(d => d.RiderId == id)
                    .OrderByDescending(d => d.CreatedAt)
                    .AsSplitQuery()
                    .ToListAsync();

                if (deliveries == null || !deliveries.Any()) return null!;

                var orderList = deliveries
                    .Where(d => d.Order != null) // Ensure no null orders are added
                    .Select(d => d.Order!)
                    .ToList();

                 listOfOrders = listOfOrders.Concat(orderList);
                    var result = PagedList<Order>.ToPagedList(listOfOrders, props.PageNumber, props.PageSize);

                return result;
                    }

                           

                var deliveriesWithSearch = await _dbContext.Deliveries
                    .Include(d => d.Rider)
                    .Include(d => d.Order)
                    .ThenInclude(o => o!.OrderItems)!
                    .ThenInclude(o => o.Product)
                    .ThenInclude(p => p!.Vendor)
                    .ThenInclude(v => v!.Addresses)
                    .Where(d => d.RiderId == id)
                    .OrderByDescending(d => d.CreatedAt)
                    .AsSplitQuery()
                    .ToListAsync();

                if (deliveriesWithSearch == null || !deliveriesWithSearch.Any()) return null!;

                var orderListWithSearch = deliveriesWithSearch
                    .Where(d => d.Order != null) // Ensure no null orders are added
                    .Select(d => d.Order!) 
                    .Where(o => o.SearchString!.ToLower().Contains(props.SearchString!.ToLower()))
                    .ToList();

                 listOfOrders = listOfOrders.Concat(orderListWithSearch);
                    var resultWithSearch = PagedList<Order>.ToPagedList(listOfOrders, props.PageNumber, props.PageSize);

                return resultWithSearch;

               
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> getRiderStats()
        {
            try
            {
                var totalRiders = await totalNumberOfRiders();
                var totalActiveRiders = await totalNumberOfActiveRiders();
                var totalNonActiveRiders = await totalNumberOfNonActiveRiders();
                var totalVerifiedRiders = await totalNumberOfVerifiedRiders();
                var totalUnverifiedRiders = await totalNumberOfUnverifiedRiders();
                var stats = new
                {
                    totalRiders,
                    totalActiveRiders,
                    totalNonActiveRiders,
                    totalVerifiedRiders,
                    totalUnverifiedRiders
                };
                return stats;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<GetRiderDto>> nonActiveRiders()
        {
            try
            {
                var riders = await _dbContext.Riders.Include(r => r.Deliveries).Where(r => r.IsActive == false)
                    .ToListAsync();
                var getRiderDto = _mapper.Map<List<GetRiderDto>>(riders);
                return getRiderDto;

            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public Task<IEnumerable<OrderDto>> orderLists(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<GetRiderDto>> searchAsync(string searchString)
        {
            try
            {
                var riderList = new List<Rider>();
                var riders = await _dbContext.Riders.Include(r => r.Deliveries).ToListAsync();
                foreach (var rider in riders)
                {
                    var searchParam = rider.SearchString!.ToLower().Split(" ");
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
                        riderList.Add(rider);
                    }
                }

                var getRiderDto = _mapper.Map<List<GetRiderDto>>(riderList);
                return getRiderDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<DeliveryDtoLite>> successfulDeliveries(int riderId)
        {
            try
            {

                var deliveries = await _dbContext.Deliveries.OrderByDescending(r => r.CreatedAt)
                    .Include(d => d.Rider)
                    .Where(d => d.Rider!.Id == riderId && d.Status!.ToLower() == "delivered")
                    .ToListAsync();
                var deliveryDTOLite = _mapper.Map<List<DeliveryDtoLite>>(deliveries);
                return deliveryDTOLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> toggleRiderStatus(int id)
        {
            try
            {
                var rider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Id == id);
                if (rider == null) return null!;
                rider.IsActive = !rider.IsActive;
                _dbContext.Riders.Attach(rider);
                await _dbContext.SaveChangesAsync();
                if (rider.IsActive == false) return "Rider deactivated";
                return "Rider activated";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfActiveRiders()
        {
            try
            {
                var riders = await _dbContext.Riders.Where(r => r.IsActive == true).CountAsync();
                return riders;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfNonActiveRiders()
        {
            try
            {
                var riders = await _dbContext.Riders.Where(r => r.IsActive == false).CountAsync();
                return riders;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfRiders()
        {
            try
            {
                var riders = await _dbContext.Riders.CountAsync();
                return riders;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfUnverifiedRiders()
        {
            try
            {
                var riders = await _dbContext.Riders.Where(r => r.IsVerified == false).CountAsync();
                return riders;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> totalNumberOfVerifiedRiders()
        {
            try
            {
                var riders = await _dbContext.Riders.Where(r => r.IsVerified == true).CountAsync();
                return riders;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<DeliveryDtoLite>> pendingDeliveries(int riderId)
        {
            try
            {

                var deliveries = await _dbContext.Deliveries.OrderByDescending(r => r.CreatedAt)
                    .Include(d => d.Rider)
                    .Where(d => d.Rider!.Id == riderId && d.Status!.ToLower() == "pending")
                    .ToListAsync();
                var deliveryDTOLite = _mapper.Map<List<DeliveryDtoLite>>(deliveries);
                return deliveryDTOLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<GetRiderDto> updateAsync(CreateRiderDto rider, int id)
        {
            try
            {
                var initialRider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Id == id);
                if (initialRider == null!) return null!;
                initialRider.FirstName = rider.FirstName;
                initialRider.LastName = rider.LastName;
                initialRider.IdentityNumber = rider.IdentityNumber;
                initialRider.PhoneNumber = rider.PhoneNumber;
                initialRider.ContactAddress = rider.ContactAddress;
                initialRider.Email = rider.Email;
                initialRider.SearchString = rider.FirstName!.ToUpper() + " " + rider.LastName!.ToUpper() + " " + rider.Email!.ToUpper() + " " + rider.PhoneNumber;
                if (rider.IdentityImg != null!)
                {
                    var folderName = "Riders";
                    var imgPath = await UploadImage.uploadImg(rider.IdentityImg!, _cloudinary, folderName);
                    if (imgPath == null!) throw new Exceptions.ServiceException("Can not upload the product image");
                    initialRider.IdentityImgUrl = imgPath;
                }
                initialRider.UpdatedAt = DateTime.UtcNow;
                _dbContext.Riders.Attach(initialRider);
                await _dbContext.SaveChangesAsync();
                var getRiderDto = _mapper.Map<GetRiderDto>(initialRider);
                return getRiderDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<GetRiderDto> uploadRiderIdentityImg(int id, IFormFile riderIdendityImg)
        {
            try
            {
                var folderName = "Riders";
                var rider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Id == id);
                if (rider == null!) return null!;
                var imgPath = await UploadImage.uploadImg(riderIdendityImg, _cloudinary, folderName);
                if (imgPath == null!) throw new Exceptions.ServiceException("Can not upload the product image");
                rider.IdentityImgUrl = imgPath;
                _dbContext.Riders.Attach(rider);
                await _dbContext.SaveChangesAsync();
                var getRiderDto = _mapper.Map<GetRiderDto>(rider);
                return getRiderDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> verifyRider(int id)
        {
            try
            {
                var rider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Id == id);
                if (rider == null) return null!;
                rider.IsVerified = true;
                _dbContext.Riders.Attach(rider);
                await _dbContext.SaveChangesAsync();
                return "Rider verified";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }


        public async Task<string> updateDefaultLocation(int id, RiderLocation location)
        {
            try
            {
                var address = await _dbContext.Addresses.Where(a => a.DefaultAddress == true).FirstOrDefaultAsync(a => a.UserId == id);

                if (address == null){
                    var newAddress = new Address
                    {
                        UserId = id,
                        DefaultAddress = true,
                        Latitude = location.Latitude,
                        Longitude = location.Longitude,
                    };
                    await _dbContext.Addresses.AddAsync(newAddress);
                    await _dbContext.SaveChangesAsync();
                    return "Default location updated";
                }
                else{
                    address.Latitude = location.Latitude;
                    address.Longitude = location.Longitude;
                    _dbContext.Addresses.Update(address);
                    await _dbContext.SaveChangesAsync();
                    return "Default location updated";
                }
                
               
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<Rider>> getAllActive(SearchPaging props)
        {
            try
            {
                IQueryable<Rider> ridersList = Enumerable.Empty<Rider>().AsQueryable();
                if (props.SearchString is null)
                {
                    var ridersLs = await _dbContext.Riders
                        .Include(r => r.Deliveries)
                        .Where(r => r.IsActive == true)
                        .OrderByDescending(r => r.CreatedAt)
                        .AsSplitQuery()
                        .ToListAsync();

                    ridersList = ridersList.Concat(ridersLs);
                    var result = PagedList<Rider>.ToPagedList(ridersList, props.PageNumber, props.PageSize);

                    return result;

                }
                var riders = await _dbContext.Riders
                        .Include(r => r.Deliveries)
                        .OrderByDescending(r => r.CreatedAt)
                        .Where(r => r.IsActive == true)
                        .Where(r => r.SearchString!.ToLower().Contains(props.SearchString.ToLower()))
                        .AsSplitQuery()
                        .ToListAsync();
                ridersList = ridersList.Concat(riders);
                var response = PagedList<Rider>.ToPagedList(ridersList, props.PageNumber, props.PageSize);

                return response;

            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

    }
}
