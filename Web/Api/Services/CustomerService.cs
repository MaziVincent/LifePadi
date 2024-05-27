using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using FuzzySharp;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Customer = Api.Models.Customer;

namespace Api.Services
{
    public class CustomerService : ICustomer
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;
        public CustomerService(DBContext dBContext, IMapper mapper) 
        { 
            _dbContext = dBContext;
            _mapper = mapper;
        }

        public async Task<AuthUserDTO> createAsync(CustomerDTO customer)
        {
            try
            {
                var newCustomer = _mapper.Map<Customer>(customer);
                newCustomer.PasswordHash = BCrypt.Net.BCrypt.HashPassword(customer.Password);
                newCustomer.SearchString = customer.FirstName!.ToUpper() + " " + customer.LastName!.ToUpper() + " " + customer.Email!.ToUpper();
                await _dbContext.Customers.AddAsync(newCustomer);
                await _dbContext.SaveChangesAsync();
                var authUserDTO = _mapper.Map<AuthUserDTO>(newCustomer);
                return authUserDTO;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<AddressDTOLite>> customerAddresses(int id)
        {
            try
            {
                var customer = await _dbContext.Customers.Include(c => c.Addresses).FirstOrDefaultAsync(c => c.Id == id);
                if (customer == null) return null!;
                var addresses = _mapper.Map<List<AddressDTOLite>>(customer.Addresses);
                return addresses;
            }catch(Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var customer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.Id == id);
                if (customer == null) return null!;
                _dbContext.Customers.Remove(customer);
                await _dbContext.SaveChangesAsync();
                return "Customer account deleted";
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<CustomerDTOLite>> getAllAsync(int pageNumber, int pageSize)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var customers = await _dbContext.Customers.Skip(skip).Take(pageSize).OrderByDescending(c => c.CreatedAt).ToListAsync();
                var customerDTOLite = _mapper.Map<List<CustomerDTOLite>>(customers);
                return customerDTOLite;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CustomerDTO> getAsync(int id)
        {
            try
            {
                var customer = await _dbContext.Customers.Include(c => c.Addresses).FirstOrDefaultAsync(c => c.Id == id);
                if (customer == null) return null!;
                var customerDTO = _mapper.Map<CustomerDTO>(customer);
                return customerDTO;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<OrderDTOLite>> getCustomerOders(int id)
        {
            try
            {
                var customer = await _dbContext.Customers.Include(c => c.Orders).FirstOrDefaultAsync(c => c.Id == id);
                if (customer == null) return null!;
                var orders = _mapper.Map<List<OrderDTOLite>>(customer.Orders);
                return orders;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<CustomerDTOLite>> search(string searchString)
        {
            try
            {
                var customerList = new List<Customer>();
                var customers = await _dbContext!.Customers.ToListAsync();
                foreach (var customer in customers)
                {
                    var searchParam = customer.SearchString!.ToLower().Split(" ");
                    bool isMatch = false;
                    foreach (var word in searchParam)
                    {
                        // Fuzzy matching logic using your chosen library
                        var matchRatio = Fuzz.Ratio(word, searchString.ToLower());
                        if (matchRatio >= 0.8) // Set a threshold for acceptable similarity
                        {
                            isMatch = true;
                            break; // Exit inner loop if a match is found
                        }
                    }
                    if (isMatch)
                    {
                        customerList.Add(customer);
                    }
                }
                var customerDTOLite = _mapper.Map<List<CustomerDTOLite>>(customerList);
                return customerDTOLite;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CustomerDTOLite> updateAsync(CustomerDTO customer, int id)
        {
            try
            {
                var initialCustomer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.Id == id);
                if (initialCustomer == null) return null!;
                initialCustomer.ContactAddress = customer.ContactAddress;
                initialCustomer.FirstName = customer.FirstName;
                initialCustomer.LastName = customer.LastName;
                initialCustomer.Email = customer.Email;
                initialCustomer.DOB = customer.DOB;
                initialCustomer.PhoneNumber = customer.PhoneNumber;
                initialCustomer.SearchString = customer.FirstName!.ToUpper() + " " + customer.LastName!.ToUpper() + " " + customer.Email!.ToUpper();
                initialCustomer.UpdatedAt = DateTime.UtcNow;
                _dbContext.Customers.Attach(initialCustomer);
                await _dbContext.SaveChangesAsync();
                var customerDTOLite = _mapper.Map<CustomerDTOLite>(initialCustomer);
                return customerDTOLite;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
