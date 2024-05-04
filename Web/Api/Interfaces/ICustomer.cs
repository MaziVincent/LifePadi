using Api.DTO;

namespace Api.Interfaces
{
    public interface ICustomer
    {
        public Task<AuthCustomerDTO> createAsync(CustomerDTO customer);
        public Task<IEnumerable<CustomerDTO>> getAllAsync();
        public Task<CustomerDTO> updateAsync(CustomerDTO customer, int id);
        public Task<string> deleteAsync(int id);
        public Task<CustomerDTO> getAsync(int id);
        public Task<IEnumerable<CustomerDTO>> search(string searchString);
        public Task<IEnumerable<AddressDTO>> customerAddresses(int id);
        public Task<IEnumerable<OrderDTO>> getCustomerOders(int id);
    }
}
