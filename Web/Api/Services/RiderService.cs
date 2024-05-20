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
                _config["Cloudinary:Cloud_Name"],
                _config["Cloudinary:Api_Key"],
                _config["Cloudinary:Api_Secret"]
            );
            _cloudinary = new Cloudinary( account );
        }

        public async Task<string> activateRider(int id)
        {
            try
            {
                var rider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Id == id);
                if (rider == null) return null!;
                rider.IsActive = true;
                _dbContext.Riders.Attach(rider);
                await _dbContext.SaveChangesAsync();
                return "Rider activated";
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> assignOrderToRider(int riderId, int orderId)
        {
            try
            {
                var order = await _dbContext.Orders.FirstOrDefaultAsync(o => o.Id == orderId);
                if (order == null) return null!;
                order.RiderId = riderId;
                _dbContext.Orders.Attach(order);
                await _dbContext.SaveChangesAsync();
                return "Order successfuly assigned";
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<AuthRiderDTO> createAsync(CreateRiderDTO rider)
        {
            try
            {
                var folderName = "Riders";
                var newRider = _mapper.Map<Rider>(rider);
                newRider.PasswordHash = BCrypt.Net.BCrypt.HashPassword(rider.Password);
                newRider.IsActive = true;
                newRider.IsVerified = false;
                newRider.SearchString = rider.FirstName!.ToUpper()+" "+rider.LastName!.ToUpper()+" "+rider.Email!.ToUpper()+" "+rider.PhoneNumber;
                var imgPath = await UploadImage.uploadImg(rider.IdentityImg!, _cloudinary, folderName);
                if (imgPath == null!) throw new Exception("Can not upload the product image");
                newRider.IdentityImgUrl = imgPath;
                await _dbContext.Riders.AddAsync(newRider);
                await _dbContext.SaveChangesAsync();
                var authRiderDTO = _mapper.Map<AuthRiderDTO>(newRider);
                return authRiderDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> deactivateRider(int id)
        {
            try
            {
                var rider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Id == id);
                if (rider == null) return null!;
                rider.IsActive = false;
                _dbContext.Riders.Attach(rider);
                await _dbContext.SaveChangesAsync();
                return "Rider deactivated";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var rider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Id == id);
                if (rider == null) return null!;
                _dbContext.Riders.Remove(rider);
                await _dbContext.SaveChangesAsync();
                return "Rider deleted";
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<GetRiderDTO>> getAllAsync(int pageNumber, int pageSize, string searchString)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                if (searchString == "")
                {
                    var riders1 = await _dbContext.Riders.Skip(skip).Take(pageSize)
                        .Include(r => r.Orders)
                        .OrderByDescending(r => r.CreatedAt)
                        .Where(r => r.IsActive == true)
                        .ToListAsync();
                    var getRiderDTO1 = _mapper.Map<List<GetRiderDTO>>(riders1);
                    return getRiderDTO1;
                }
                var riders = await _dbContext.Riders.Skip(skip).Take(pageSize)
                        .Include(r => r.Orders)
                        .OrderByDescending(r => r.CreatedAt)
                        .Where(r => r.SearchString!.ToLower().Contains(searchString.ToLower()))
                        .ToListAsync();
                        
                var getRiderDTO = _mapper.Map<List<GetRiderDTO>>(riders);
                return getRiderDTO;

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<GetRiderDTO> getAsync(int id)
        {
            try
            {
                var rider = await _dbContext.Riders.Include(r => r.Orders)
                    .FirstOrDefaultAsync(r => r.Id == id);
                if (rider == null) return null!;
                var getRiderDTO = _mapper.Map<GetRiderDTO>(rider);
                return getRiderDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<OrderDTO>> getRiderOrders(int id)
        {
            try
            {
                var rider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Id == id);
                if (rider == null) return null!;
                var orderDTO = _mapper.Map<List<OrderDTO>>(rider.Orders);
                return orderDTO;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<GetRiderDTO>> nonActiveRiders()
        {
            try
            {
                var riders = await _dbContext.Riders.Include(r => r.Orders).Where(r => r.IsActive == false)
                    .ToListAsync();
                var getRiderDTO = _mapper.Map<List<GetRiderDTO>>(riders);
                return getRiderDTO;

            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Task<IEnumerable<OrderDTO>> orderLists(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<GetRiderDTO>> searchAsync(string searchString)
        {
            try
            {
                var riderList = new List<Rider>();
                var riders = await _dbContext.Riders.Include(r => r.Orders).ToListAsync();
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

                var getRiderDTO = _mapper.Map<List<GetRiderDTO>>(riderList);
                return getRiderDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<DeliveryDTOLite>> successfulDeliveries(int riderId)
        {
            try
            {
                
                var deliveries = await _dbContext.Deliveries.OrderByDescending(r => r.CreatedAt)
                    .Include(d => d.Rider)
                    .Where(d => d.Rider!.Id == riderId && d.Status == "successful")
                    .ToListAsync();
                var deliveryDTOLite = _mapper.Map<List<DeliveryDTOLite>>(deliveries);
                return deliveryDTOLite;                
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<DeliveryDTOLite>> unsuccessfulDeliveries(int riderId)
        {
            try
            {

                var deliveries = await _dbContext.Deliveries.OrderByDescending(r => r.CreatedAt)
                    .Include(d => d.Rider)
                    .Where(d => d.Rider!.Id == riderId && d.Status == "unsuccessful")
                    .ToListAsync();
                var deliveryDTOLite = _mapper.Map<List<DeliveryDTOLite>>(deliveries);
                return deliveryDTOLite;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<GetRiderDTO> updateAsync(CreateRiderDTO rider, int id)
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
                    if (imgPath == null!) throw new Exception("Can not upload the product image");
                    initialRider.IdentityImgUrl = imgPath;
                }
                initialRider.UpdatedAt = DateTime.UtcNow;
                _dbContext.Riders.Attach(initialRider);
                await _dbContext.SaveChangesAsync();
                var getRiderDTO = _mapper.Map<GetRiderDTO>(initialRider);
                return getRiderDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<GetRiderDTO> uploadRiderIdentityImg(int id, IFormFile riderIdendityImg)
        {
            try
            {
                var folderName = "Riders";
                var rider = await _dbContext.Riders.FirstOrDefaultAsync(r => r.Id == id);
                if (rider == null!) return null!;
                var imgPath = await UploadImage.uploadImg(riderIdendityImg, _cloudinary, folderName);
                if (imgPath == null!) throw new Exception("Can not upload the product image");
                rider.IdentityImgUrl = imgPath;
                _dbContext.Riders.Attach(rider);
                await _dbContext.SaveChangesAsync();
                var getRiderDTO = _mapper.Map<GetRiderDTO>(rider);
                return getRiderDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
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
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
