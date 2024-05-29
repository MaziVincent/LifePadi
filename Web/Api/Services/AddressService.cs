using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
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

        public async Task<IEnumerable<AddressDTO>> allAsync()
        {
            try
            {
                var addresses = await _dbContext.Addresses
                    .Include(a => a.Customer)
                    .OrderByDescending(a => a.CreatedAt).ToListAsync();
                var addressDTOLite = _mapper.Map<List<AddressDTO>>(addresses);
                return addressDTOLite;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<AddressDTOLite> createAsync(AddressDTO address)
        {
            try
            {
                var newaddress = _mapper.Map<Address>(address);
                await _dbContext.Addresses.AddAsync(newaddress);
                await _dbContext.SaveChangesAsync();
                var addressDTOLite = _mapper.Map<AddressDTOLite>(newaddress);
                return addressDTOLite;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var address = await _dbContext.Addresses.FirstOrDefaultAsync(a => a.Id == id);
                if (address == null) return null!;
                _dbContext.Addresses.Remove(address);
                await _dbContext.SaveChangesAsync();
                return "Deleted successfuly";
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<AddressDTO> getAsync(int id)
        {
            try
            {
                var address = await _dbContext.Addresses.Include(a => a.Customer).FirstOrDefaultAsync(a => a.Id == id);
                if (address == null) return null!;
                var addressDTO = _mapper.Map<AddressDTO>(address);
                return addressDTO;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<AddressDTOLite>> getCustomersAddresses(int customerId)
        {
            try
            {
                var addresses = await _dbContext.Addresses.Where(a => a.CustomerId == customerId).ToListAsync();
                if (addresses == null) return null!;
                var addressDTOLite = _mapper.Map<List<AddressDTOLite>>(addresses);
                return addressDTOLite;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<AddressDTOLite> updateAsync(AddressDTO address, int id)
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
                var addressDTOLite = _mapper.Map<AddressDTOLite>(initialAddress);
                return addressDTOLite;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
