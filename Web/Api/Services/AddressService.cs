using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
<<<<<<< HEAD
using Microsoft.AspNetCore.Mvc;
=======
>>>>>>> ee48634 (done with service, category and product controllers.)
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

<<<<<<< HEAD
        public async Task<IEnumerable<AddressDto>> allAsync()
=======
        public async Task<IEnumerable<AddressDTO>> allAsync()
>>>>>>> ee48634 (done with service, category and product controllers.)
        {
            try
            {
                var addresses = await _dbContext.Addresses
<<<<<<< HEAD
                    .Include(a => a.User)
                    .OrderByDescending(a => a.CreatedAt).ToListAsync();
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
                var initialAddress = await _dbContext.Addresses.FirstOrDefaultAsync(a => a.UserId == address.UserId && a.Name == address.Name && a.Town == address.Town && a.City == address.City && a.State == address.State);
                if (initialAddress != null) throw new Exceptions.ServiceException("Address already exist");
<<<<<<< HEAD
<<<<<<< HEAD
                var defaultAddress = await _dbContext.Addresses.FirstOrDefaultAsync(a => a.UserId == address.UserId && a.DefaultAddress == true);
                if (defaultAddress == null) address.DefaultAddress = true;
=======
>>>>>>> 67ef8ba (updated payment)
=======
                var defaultAddress = await _dbContext.Addresses.FirstOrDefaultAsync(a => a.UserId == address.UserId && a.DefaultAddress == true);
                if (defaultAddress == null) address.DefaultAddress = true;
>>>>>>> 8ad4440 (wallet and transaction commits)
                var newaddress = _mapper.Map<Address>(address);
                await _dbContext.Addresses.AddAsync(newaddress);
                await _dbContext.SaveChangesAsync();
                var AddressDtoLite = _mapper.Map<AddressDtoLite>(newaddress);
                return AddressDtoLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
=======
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
>>>>>>> ee48634 (done with service, category and product controllers.)
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var address = await _dbContext.Addresses.FirstOrDefaultAsync(a => a.Id == id);
                if (address == null) return null!;
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8ad4440 (wallet and transaction commits)
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
=======
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
>>>>>>> ee48634 (done with service, category and product controllers.)
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
<<<<<<< HEAD
                var AddressDtoLite = _mapper.Map<AddressDtoLite>(initialAddress);
                return AddressDtoLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
=======
                var addressDTOLite = _mapper.Map<AddressDTOLite>(initialAddress);
                return addressDTOLite;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
>>>>>>> ee48634 (done with service, category and product controllers.)
            }
        }
    }
}
