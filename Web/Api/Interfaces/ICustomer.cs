using Api.DTO;

namespace Api.Interfaces
{
    public interface ICustomer
    {
        public Task<AuthUserDto> createAsync(CustomerDto customer);
        public Task<IEnumerable<CustomerDtoLite>> getAllAsync(int pageNumber, int pageSize);
        public Task<CustomerDtoLite> updateAsync(CustomerDto customer, int id);
        public Task<string> deleteAsync(int id);
        public Task<CustomerDto> getAsync(int id);
        public Task<IEnumerable<CustomerDtoLite>> search(string searchString);
        public Task<IEnumerable<AddressDtoLite>> customerAddresses(int id);
        public Task<IEnumerable<OrderDtoLite>> getCustomerOders(int id);
        public Task<int> numberOfCustomers();
    }
}
