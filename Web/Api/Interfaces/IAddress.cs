using Api.DTO;
using Api.Models;

namespace Api.Interfaces
{
    public interface IAddress
    {
        public Task<AddressDto> getAsync(int id);
        public Task<IEnumerable<AddressDto>> allAsync();
        public Task<AddressDtoLite> createAsync(AddressDto address);
        public Task<AddressDtoLite> updateAsync(AddressDto address, int id);
        public Task<string> deleteAsync(int id);
        public Task<IEnumerable<AddressDtoLite>> getCustomersAddresses(int customerId);
        public Task<IEnumerable<AddressDtoLite>> getUsersAddress(int userId);

    }
}
