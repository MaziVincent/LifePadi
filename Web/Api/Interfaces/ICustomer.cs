using Api.DTO;

namespace Api.Interfaces
{
    public interface ICustomer
    {
        public Task<AuthUserDTO> createAsync(CustomerDTO customer);
        public Task<IEnumerable<CustomerDTOLite>> getAllAsync(int pageNumber, int pageSize);
        public Task<CustomerDTOLite> updateAsync(CustomerDTO customer, int id);
        public Task<string> deleteAsync(int id);
        public Task<CustomerDTO> getAsync(int id);
        public Task<IEnumerable<CustomerDTOLite>> search(string searchString);
        public Task<IEnumerable<AddressDTOLite>> customerAddresses(int id);
        public Task<IEnumerable<OrderDTOLite>> getCustomerOders(int id);
    }
}
