using Api.DTO;
using Api.Models;
using Api.Services;

namespace Api.Interfaces
{
    public interface ICustomer
    {
        public Task<AuthUserDto> createAsync(CustomerDto customer);
        public Task<PagedList<Customer>> getAllAsync (SearchPaging props);
        public Task<Customer> getByEmail(string email);
        public Task<CustomerDtoLite> updateAsync(CustomerDto customer, int id);
        public Task<string> deleteAsync(int id);
        public Task<CustomerDto> getAsync(int id);
        public Task<IEnumerable<CustomerDtoLite>> search(string searchString);
        public Task<IEnumerable<AddressDtoLite>> customerAddresses(int id);
        public Task<IEnumerable<OrderDtoLite>> getCustomerOders(int id);
        public Task<int> numberOfCustomers();
        public Task<object> verifyOtp(string pinId, string pin);
        public Task<string> verifyPhone(string phoneNumber);
        public Task<bool> checkPhoneAndEmail(string phoneNumber, string email);
    }
}
