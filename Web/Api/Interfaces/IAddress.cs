using Api.DTO;
using Api.Models;

namespace Api.Interfaces
{
    public interface IAddress
    {
<<<<<<< HEAD
        public Task<AddressDto> getAsync(int id);
        public Task<IEnumerable<AddressDto>> allAsync();
        public Task<AddressDtoLite> createAsync(AddressDto address);
        public Task<AddressDtoLite> updateAsync(AddressDto address, int id);
        public Task<string> deleteAsync(int id);
        public Task<string> setAsDefault(int id, int customerId);
        public Task<IEnumerable<AddressDtoLite>> getCustomersAddresses(int customerId);
        public Task<IEnumerable<AddressDtoLite>> getUsersAddress(int userId);
=======
        public Task<AddressDTO> getAsync(int id);
        public Task<IEnumerable<AddressDTO>> allAsync();
        public Task<AddressDTOLite> createAsync(AddressDTO address);
        public Task<AddressDTOLite> updateAsync(AddressDTO address, int id);
        public Task<string> deleteAsync(int id);
        public Task<IEnumerable<AddressDTOLite>> getCustomersAddresses(int customerId);
>>>>>>> ee48634 (done with service, category and product controllers.)

    }
}
