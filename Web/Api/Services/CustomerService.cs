using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using FuzzySharp;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Customer = Api.Models.Customer;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Text;
using Api.Helpers;
using RestSharp;


namespace Api.Services
{
    public class CustomerService : ICustomer
    {
        private readonly HttpClient _httpClient;
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly IOtherService _oService;

        public CustomerService(DBContext dBContext, IMapper mapper, IConfiguration config, HttpClient httpClient, IOtherService oService)
        {
            _dbContext = dBContext;
            _mapper = mapper;
            _config = config;
            _httpClient = httpClient;
            _oService = oService;
        }

        public async Task<bool> checkPhoneAndEmail(string phoneNumber, string email)
        {
            try
            {
                var user = await _dbContext.Customers.FirstOrDefaultAsync(c => c.PhoneNumber == phoneNumber);
                if (user != null) throw new Exceptions.ServiceException("Phone number already exists");
                var customer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.Email!.ToLower() == email.ToLower());
                if (customer != null) throw new Exceptions.ServiceException("Email already exists");
                return true;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<bool> checkPhoneExists(string phoneNumber)
        {
            try
            {
                var user = await _dbContext.Customers.FirstOrDefaultAsync(c => c.PhoneNumber == phoneNumber);
                if (user != null) return true;
                return false;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<AuthUserDto> createAsync(CustomerDto customer)
        {
            try
            {
                var initialCustomer = await getByEmail(customer.Email!);
                if (initialCustomer != null) throw new Exceptions.ServiceException("Email already exists");
                var newCustomer = _mapper.Map<Customer>(customer);
                newCustomer.PasswordHash = BCrypt.Net.BCrypt.HashPassword(customer.Password);
                newCustomer.SearchString = customer.FirstName!.ToUpper() + " " + customer.LastName!.ToUpper() + " " + customer.Email!.ToUpper();
                newCustomer.PhoneNumberConfirmed = true;
                await _dbContext.Customers.AddAsync(newCustomer);

                await _dbContext.SaveChangesAsync();

                await _dbContext.Wallets.AddAsync(new Wallet
                {
                    CustomerId = newCustomer.Id,
                    InitialBalance = 0.0,
                    Balance = 0.0
                });

                await _dbContext.SaveChangesAsync();

                var authUserDTO = _mapper.Map<AuthUserDto>(newCustomer);
                return authUserDTO;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<AddressDtoLite>> customerAddresses(int id)
        {
            try
            {
                var customer = await _dbContext.Customers.Include(c => c.Addresses).FirstOrDefaultAsync(c => c.Id == id);
                if (customer == null) return null!;
                var addresses = _mapper.Map<List<AddressDtoLite>>(customer.Addresses);
                return addresses;
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
                var customer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.Id == id);
                if (customer == null) return null!;
                _dbContext.Customers.Remove(customer);
                await _dbContext.SaveChangesAsync();
                return "Customer account deleted";
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<Customer>> getAllAsync(SearchPaging props)
        {
            try
            {
                IQueryable<Customer> customerList = Enumerable.Empty<Customer>().AsQueryable();
                if (props.SearchString is null)
                {
                    var customerLs = await _dbContext.Customers.Include(c => c.Addresses).Include(c=>c.Wallet)
                        .OrderByDescending(r => r.CreatedAt)
                        .ToListAsync();
                //    foreach (var customer in customerLs){
                //     if (customer.Wallet == null){
                //             await _dbContext.Wallets.AddAsync(new Wallet
                //             {
                //                 CustomerId = customer.Id,
                //                 InitialBalance = 0.0,
                //                 Balance = 0.0
                //             });
                //         }
                //         customer.IsActive ??= true;
                //    }
                //    await _dbContext.SaveChangesAsync();

                    customerList = customerList.Concat(customerLs);
                    var result = PagedList<Customer>.ToPagedList(customerList, props.PageNumber, props.PageSize);

                    return result;

                }
                var customers = await _dbContext.Customers
                        .Include(c => c.Addresses)
                        .Include(c => c.Wallet)
                        .OrderByDescending(r => r.CreatedAt)
                        .Where(r => r.SearchString!.ToLower().Contains(props.SearchString.ToLower()))
                        .ToListAsync();
                customerList = customerList.Concat(customers);
                var response = PagedList<Customer>.ToPagedList(customerList, props.PageNumber, props.PageSize);

                return response;

            }

            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<CustomerDto> getAsync(int id)
        {
            try
            {
                var customer = await _dbContext.Customers.Where(c => c.Id == id)
                .Include(c => c.Addresses)
                .Include(c => c.Orders)
                .Include(c => c.Wallet)
                .FirstOrDefaultAsync();
                if (customer == null) return null!;
                var CustomerDto = new CustomerDto
                {
                    Id = customer.Id,
                    FirstName = customer.FirstName,
                    LastName = customer.LastName,
                    Email = customer.Email,
                    DOB = customer.DOB,
                    PhoneNumber = customer.PhoneNumber,
                    ContactAddress = customer.ContactAddress,
                    Addresses = _mapper.Map<List<AddressDtoLite>>(customer.Addresses),
                    Orders = _mapper.Map<List<OrderDtoLite>>(customer.Orders)
                };
                return CustomerDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<Customer> getByEmail(string email)
        {
            try
            {
                var customer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.Email!.ToLower() == email.ToLower());
                return customer!;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<Customer> getByPhone(string phone)
        {
            try
            {
                var customer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.PhoneNumber! == phone);
                return customer!;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<OrderDtoLite>> getCustomerOders(int id)
        {
            try
            {
                var customer = await _dbContext.Customers.Include(c => c.Orders).FirstOrDefaultAsync(c => c.Id == id);
                if (customer == null) return null!;
                var orders = _mapper.Map<List<OrderDtoLite>>(customer.Orders);
                return orders;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<int> numberOfCustomers()
        {
            try
            {
                var customers = await _dbContext.Customers.CountAsync();
                return customers;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> passwordReset(string phoneNumber)
        {
            try
            {
                var verify = new SendOtp(_config, _httpClient);
                var response = await verify.sendOtp(phoneNumber);
                return response;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<CustomerDtoLite>> search(string searchString)
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
                var CustomerDtoLite = _mapper.Map<List<CustomerDtoLite>>(customerList);
                return CustomerDtoLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }


        public async Task<CustomerDtoLite> updateAsync(CustomerDto customer, int id)
        {
            try
            {
                var initialCustomer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.Id == id);
                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
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
                var CustomerDtoLite = _mapper.Map<CustomerDtoLite>(initialCustomer);
                var Type = _oService.Strip(user!.GetType().ToString());
                CustomerDtoLite.Role = Type;
                return CustomerDtoLite;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> verifyOtp(string pinId, string pin)
        {
            try
            {
                var client = new RestSharp.RestClient(_config["Termii:VerifyOtp_Url"]!);
                var request = new RestRequest(_config["Termii:VerifyOtp_Url"], Method.Post);
                request.AddHeader("Content-Type", "application/json");
                var payload = new
                {
                    pin_id = pinId,
                    pinId = pinId,
                    pin = pin,
                    api_key = _config["Termii:Api_Key"]
                };
                request.AddJsonBody(payload);

                var response = await client.ExecuteAsync(request);

                if (response.IsSuccessful)
                {
                    return response.Content!;
                }

                throw new Exceptions.ServiceException(response.ErrorMessage ?? response.StatusCode.ToString());
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> verifyPhone(string phoneNumber)
        {
            try
            {
                string phone = "+" + phoneNumber;
                var user = await _dbContext.Customers.FirstOrDefaultAsync(c => c.PhoneNumber == phone);
                if (user != null) throw new Exceptions.ServiceException("Phone number already exists");
                var requestUri = _config["Termii:SendOtp_Url"]; // Termii API endpoint for sending SMS

                var payload = new
                {
                    to = phoneNumber,
                    from = _config["Termii:Sender_Id"],
                    message_type = "NUMERIC",
                    channel = "dnd",
                    api_key = _config["Termii:Api_Key"],
                    pin_length = 4,
                    pin_placeholder = "< 1234 >",
                    message_text = "Your Lifepadi verification code is < 1234 >, it will expire in 5 minutes",
                    pin_attempts = 3,
                    pin_time_to_live = 5,
                    pin_type = "NUMERIC"
                };
                var jsonPayload = JsonConvert.SerializeObject(payload);
                var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(requestUri, content);
                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }

                throw new Exceptions.ServiceException(response.ReasonPhrase!);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<string> sendOtp(string phoneNumber)
        {
            try
            {
                var phone = "+" + phoneNumber;
                var user = await _dbContext.Customers.FirstOrDefaultAsync(c => c.PhoneNumber == phone);
                if (user != null) throw new Exceptions.ServiceException("Phone number already exists");

                var client = new RestSharp.RestClient(_config["Termii:SendOtp_Url"]!);
                var request = new RestRequest(_config["Termii:SendOtp_Url"], Method.Post);
                request.AddHeader("Content-Type", "application/json");

                var payload = new
                {
                    to = phoneNumber,
                    from = _config["Termii:Sender_Id"],
                    message_type = "NUMERIC",
                    channel = "dnd",
                    api_key = _config["Termii:Api_Key"],
                    pin_length = 4,
                    pin_placeholder = "< 1234 >",
                    message_text = "Your Lifepadi verification code is < 1234 >, it will expire in 5 minutes",
                    pin_attempts = 3,
                    pin_time_to_live = 5,
                    pin_type = "NUMERIC"
                };

                // Add body
                request.AddJsonBody(payload);

                var response = await client.ExecuteAsync(request);

                if (response.IsSuccessful)
                {
                    return response.Content!;
                }

                throw new Exceptions.ServiceException(response.ErrorMessage ?? response.StatusCode.ToString());
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> toggleStatus(int id)
        {
            try
            {
                var customer = await _dbContext.Customers.FirstOrDefaultAsync(c => c.Id == id);
                if (customer == null) throw new Exceptions.ServiceException("Customer not found");
                if (customer.IsActive == true)
                {
                    customer.IsActive = false;
                }
                else
                {
                    customer.IsActive = true;
                }
                await _dbContext.SaveChangesAsync();
                return new {success = true, message = "Customer status updated"};
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

    }
}
