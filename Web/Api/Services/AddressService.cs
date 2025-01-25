using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class AddressService : IAddress
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;

        public AddressService(DBContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AddressDto>> allAsync()
        {
            try
            {
                var addresses = await _dbContext.Addresses
                    .Include(a => a.User)
                    .OrderByDescending(a => a.CreatedAt).ToListAsync();
                foreach (var ad in addresses)
                {
                    if (ad.IsActive == null)
                    {
                        ad.IsActive = true;
                        _dbContext.Addresses.Update(ad);
                        await _dbContext.SaveChangesAsync();
                    }
                }
                
                var AddressDtoLite = _mapper.Map<List<AddressDto>>(addresses);
                return AddressDtoLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<AddressDtoLite> createAsync(AddressDto address)
        {
            
            try
            {
                var initialAddress = await _dbContext.Addresses.Where(a => (a.UserId == address.UserId && a.Name == address.Name && a.Town == address.Town && a.City == address.City && a.State == address.State) || (a.Latitude == address.Latitude && a.Longitude == address.Longitude)).FirstOrDefaultAsync();
                if (initialAddress != null) throw new Exceptions.ServiceException("Address already exist");
                var defaultAddress = await _dbContext.Addresses.FirstOrDefaultAsync(a => a.UserId == address.UserId && a.DefaultAddress == true);
                if (defaultAddress == null) address.DefaultAddress = true;
                address.IsActive = true;
                var newaddress = _mapper.Map<Address>(address);
                await _dbContext.Addresses.AddAsync(newaddress);
                await _dbContext.SaveChangesAsync();
                var AddressDtoLite = _mapper.Map<AddressDtoLite>(newaddress);
                return AddressDtoLite;
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
                var address = await _dbContext.Addresses.FirstOrDefaultAsync(a => a.Id == id);
                if (address == null) return null!;
                var delivery = await _dbContext
                .Deliveries.FirstOrDefaultAsync(d => d.PickUpAddressId == id || d.DeliveryAddressId == id);
                if (delivery != null) {
                    address.IsActive = false;
                    _dbContext.Addresses.Update(address);
                }else{
                    _dbContext.Addresses.Remove(address);
                }
                await _dbContext.SaveChangesAsync();
                return "Deleted successfuly";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

           public async Task<string> setAsDefault(int id, int customerId)
        {
            try
            {
                var addresses = await _dbContext.Addresses.Where(a => a.UserId == customerId).ToListAsync();
                if (addresses == null) return null!;
                foreach (var address in addresses)
                {
                    if(address.DefaultAddress == true){
                        address.DefaultAddress = false;
                         _dbContext.Addresses.Update(address);
                    }
                    if(address.Id == id){
                        address.DefaultAddress = true;
                         _dbContext.Addresses.Update(address);
                    }
                }
               
                await _dbContext.SaveChangesAsync();
                return "Address Updated successfully";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<AddressDto> getAsync(int id)
        {
            try
            {
                var address = await _dbContext.Addresses.Include(a => a.User).FirstOrDefaultAsync(a => a.Id == id);
                if (address == null) return null!;
                var AddressDto = _mapper.Map<AddressDto>(address);
                return AddressDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<AddressDtoLite>> getCustomersAddresses(int customerId)
        {
            try
            {
                var addresses = await _dbContext.Addresses.Where(a => a.UserId == customerId)
                .Where(a => a.IsActive == true).ToListAsync();
                if (addresses == null) return null!;
               
                var AddressDtoLite = _mapper.Map<List<AddressDtoLite>>(addresses);
                return AddressDtoLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<AddressDtoLite>> getUsersAddress(int userId)
        {
            try
            {
                var userAddress = await _dbContext.Addresses.Include(a => a.User)
                .Where(a => a.UserId == userId)
                .ToListAsync();
                var addresDtoLite = _mapper.Map<List<AddressDtoLite>>(userAddress);
                return addresDtoLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<AddressDtoLite> updateAsync(AddressDto address, int id)
        {
            try
            {
                var initialAddress = await _dbContext.Addresses.FirstOrDefaultAsync(a => a.Id == id);
                initialAddress!.Name = address.Name;
                initialAddress.PostalCode = address.PostalCode;
                initialAddress.City = address.City;
                initialAddress.Latitude = address.Latitude;
                initialAddress.Longitude = address.Longitude;
                initialAddress.State = address.State;
                initialAddress.Town = address.Town;
                initialAddress.UpdatedAt = DateTime.UtcNow;

                _dbContext.Addresses.Attach(initialAddress);
                await _dbContext.SaveChangesAsync();
                var AddressDtoLite = _mapper.Map<AddressDtoLite>(initialAddress);
                return AddressDtoLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
    }
}
