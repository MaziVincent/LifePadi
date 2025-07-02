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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AddressService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AddressDto>> allAsync()
        {
            try
            {
                var addresses = await _unitOfWork.Addresses.GetAsync(
                    orderBy: q => q.OrderByDescending(a => a.CreatedAt),
                    includeProperties: "User");

                // Update addresses with null IsActive to true (maintaining existing behavior)
                var addressesToUpdate = new List<Address>();
                foreach (var ad in addresses)
                {
                    if (ad.IsActive == null)
                    {
                        ad.IsActive = true;
                        addressesToUpdate.Add(ad);
                    }
                }

                if (addressesToUpdate.Any())
                {
                    _unitOfWork.Addresses.UpdateRange(addressesToUpdate);
                    await _unitOfWork.SaveChangesAsync();
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
                // Check for existing address with same details or coordinates
                var initialAddress = await _unitOfWork.Addresses.GetFirstOrDefaultAsync(a =>
                    (a.UserId == address.UserId && a.Name == address.Name && a.Town == address.Town &&
                     a.City == address.City && a.State == address.State) ||
                    (a.Latitude == address.Latitude && a.Longitude == address.Longitude));

                if (initialAddress != null) throw new Exceptions.ServiceException("Address already exist");

                // Check if user has any default address
                var defaultAddress = await _unitOfWork.Addresses.GetFirstOrDefaultAsync(a =>
                    a.UserId == address.UserId && a.DefaultAddress == true);

                if (defaultAddress == null) address.DefaultAddress = true;
                address.IsActive = true;

                var newaddress = _mapper.Map<Address>(address);
                await _unitOfWork.Addresses.AddAsync(newaddress);
                await _unitOfWork.SaveChangesAsync();

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
                var address = await _unitOfWork.Addresses.GetByIdAsync(id);
                if (address == null) return null!;

                var delivery = await _unitOfWork.Deliveries.GetFirstOrDefaultAsync(d =>
                    d.PickUpAddressId == id || d.DeliveryAddressId == id);

                if (delivery != null)
                {
                    address.IsActive = false;
                    _unitOfWork.Addresses.Update(address);
                }
                else
                {
                    _unitOfWork.Addresses.Remove(address);
                }

                await _unitOfWork.SaveChangesAsync();
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
                var addresses = await _unitOfWork.Addresses.GetAsync(a => a.UserId == customerId);
                if (addresses == null || !addresses.Any()) return null!;

                var addressesToUpdate = new List<Address>();
                foreach (var address in addresses)
                {
                    if (address.DefaultAddress == true)
                    {
                        address.DefaultAddress = false;
                        addressesToUpdate.Add(address);
                    }
                    if (address.Id == id)
                    {
                        address.DefaultAddress = true;
                        addressesToUpdate.Add(address);
                    }
                }

                if (addressesToUpdate.Any())
                {
                    _unitOfWork.Addresses.UpdateRange(addressesToUpdate);
                }

                await _unitOfWork.SaveChangesAsync();
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
                var address = await _unitOfWork.Addresses.GetFirstOrDefaultAsync(
                    a => a.Id == id,
                    "User");

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
                var addresses = await _unitOfWork.Addresses.GetAsync(
                    filter: a => a.UserId == customerId && a.IsActive == true);

                if (addresses == null || !addresses.Any()) return null!;

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
                var userAddress = await _unitOfWork.Addresses.GetAsync(
                    filter: a => a.UserId == userId,
                    includeProperties: "User");

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
                var initialAddress = await _unitOfWork.Addresses.GetByIdAsync(id);
                if (initialAddress == null) return null!;

                initialAddress.Name = address.Name;
                initialAddress.PostalCode = address.PostalCode;
                initialAddress.City = address.City;
                initialAddress.Latitude = address.Latitude;
                initialAddress.Longitude = address.Longitude;
                initialAddress.State = address.State;
                initialAddress.Town = address.Town;
                initialAddress.UpdatedAt = DateTime.UtcNow;

                _unitOfWork.Addresses.Update(initialAddress);
                await _unitOfWork.SaveChangesAsync();

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
