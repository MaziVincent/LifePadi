using Api.DTO;
<<<<<<< HEAD
using Api.Models;
using Api.Services;
=======
>>>>>>> 9a80707 (created the interfaces and the DTOs)

namespace Api.Interfaces
{
    public interface ICustomer
    {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        public Task<AuthUserDto> createAsync(CustomerDto customer);
        public Task<PagedList<Customer>> getAllAsync (SearchPaging props);
        public Task<Customer> getByEmail(string email);
        public Task<Customer> getByPhone(string phone);
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
        public Task<string> passwordReset(string phoneNumber);
        public Task<bool> checkPhoneExists(string phoneNumber);
=======
        public Task<AuthCustomerDTO> createAsync(CustomerDTO customer);
        public Task<IEnumerable<CustomerDTO>> getAllAsync();
        public Task<CustomerDTO> updateAsync(CustomerDTO customer, int id);
        public Task<string> deleteAsync(int id);
        public Task<CustomerDTO> getAsync(int id);
        public Task<IEnumerable<CustomerDTO>> search(string searchString);
        public Task<IEnumerable<AddressDTO>> customerAddresses(int id);
        public Task<IEnumerable<OrderDTO>> getCustomerOders(int id);
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public Task<AuthUserDTO> createAsync(CustomerDTO customer);
        public Task<IEnumerable<CustomerDTOLite>> getAllAsync(int pageNumber, int pageSize);
        public Task<CustomerDTOLite> updateAsync(CustomerDTO customer, int id);
        public Task<string> deleteAsync(int id);
        public Task<CustomerDTO> getAsync(int id);
        public Task<IEnumerable<CustomerDTOLite>> search(string searchString);
        public Task<IEnumerable<AddressDTOLite>> customerAddresses(int id);
        public Task<IEnumerable<OrderDTOLite>> getCustomerOders(int id);
<<<<<<< HEAD
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
=======
        public Task<AuthUserDto> createAsync(CustomerDto customer);
        public Task<IEnumerable<CustomerDtoLite>> getAllAsync(int pageNumber, int pageSize);
        public Task<CustomerDtoLite> updateAsync(CustomerDto customer, int id);
        public Task<string> deleteAsync(int id);
        public Task<CustomerDto> getAsync(int id);
        public Task<IEnumerable<CustomerDtoLite>> search(string searchString);
        public Task<IEnumerable<AddressDtoLite>> customerAddresses(int id);
        public Task<IEnumerable<OrderDtoLite>> getCustomerOders(int id);
>>>>>>> 836ec36 (changed all DTO to Dto)
        public Task<int> numberOfCustomers();
>>>>>>> 98415b4 (done with dashboard)
    }
}
