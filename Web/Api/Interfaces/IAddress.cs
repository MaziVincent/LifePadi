using Api.DTO;
using Api.Models;

namespace Api.Interfaces
{
    public interface IAddress
    {
        public Task<AddressDTO> getAsync(int id);
        public Task<IEnumerable<AddressDTO>> allAsync();
        public Task<AddressDTOLite> createAsync(AddressDTO address);
        public Task<AddressDTOLite> updateAsync(AddressDTO address, int id);
        public Task<string> deleteAsync(int id);
        public Task<IEnumerable<AddressDTOLite>> getCustomersAddresses(int customerId);

    }
}
