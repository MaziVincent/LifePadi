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
    public class AdminService : IAdmin
    {
        private readonly HttpClient _httpClient;
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        private readonly IOtherService _oService;

        public AdminService(DBContext dBContext, IMapper mapper, IConfiguration config, HttpClient httpClient, IOtherService oService)
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
                var user = await _dbContext.Admins.FirstOrDefaultAsync(c => c.PhoneNumber == phoneNumber);
                if (user != null) throw new Exceptions.ServiceException("Phone number already exists");
                var admin = await _dbContext.Admins.FirstOrDefaultAsync(c => c.Email!.ToLower() == email.ToLower());
                if (admin != null) throw new Exceptions.ServiceException("Email already exists");
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
                var user = await _dbContext.Admins.FirstOrDefaultAsync(c => c.PhoneNumber == phoneNumber);
                if (user != null) return true;
                return false;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<AuthUserDto> createAsync(AdminDto admin)
        {
            try
            {
                var initialAdmin = await getByEmail(admin.Email!);
                if (initialAdmin != null) throw new Exceptions.ServiceException("Email already exists");
                var newAdmin = _mapper.Map<Admin>(admin);
                newAdmin.PasswordHash = BCrypt.Net.BCrypt.HashPassword(admin.Password);
                newAdmin.SearchString = admin.FirstName!.ToUpper() + " " + admin.LastName!.ToUpper() + " " + admin.Email!.ToUpper();
                newAdmin.PhoneNumberConfirmed = true;
                await _dbContext.Admins.AddAsync(newAdmin);

                await _dbContext.SaveChangesAsync();

                var authUserDTO = _mapper.Map<AuthUserDto>(newAdmin);
                return authUserDTO;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<object> deleteAsync(int id)
        {
            try
            {
                var admin = await _dbContext.Admins.FirstOrDefaultAsync(c => c.Id == id);
                if (admin == null) return null!;
                _dbContext.Admins.Remove(admin);
                await _dbContext.SaveChangesAsync();
                return new { success = true, message = "Admin deleted" };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<PagedList<Admin>> getAllAsync(SearchPaging props)
        {
            try
            {
                IQueryable<Admin> adminList = Enumerable.Empty<Admin>().AsQueryable();
                if (props.SearchString is null)
                {
                    var admins1 = await _dbContext.Admins.Include(c => c.Addresses)
                        .OrderByDescending(r => r.CreatedAt)
                        .ToListAsync();
                    foreach(var admin in admins1){
                        if(admin.IsActive == null){
                            admin.IsActive = true;
                            _dbContext.Update(admin);
                        }
                    }
                    await _dbContext.SaveChangesAsync();
                    adminList = adminList.Concat(admins1);
                    var result = PagedList<Admin>.ToPagedList(adminList, props.PageNumber, props.PageSize);

                    return result;

                }
                var admins2 = await _dbContext.Admins
                        .Include(c => c.Addresses)
                        .OrderByDescending(r => r.CreatedAt)
                        .Where(r => r.SearchString!.ToLower().Contains(props.SearchString.ToLower()))
                        .ToListAsync();
                adminList = adminList.Concat(admins2);
                var response = PagedList<Admin>.ToPagedList(adminList, props.PageNumber, props.PageSize);

                return response;

            }

            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<AdminDto> getAsync(int id)
        {
            try
            {
                var admin = await _dbContext.Admins.Where(c => c.Id == id)
                .Include(c => c.Addresses)
                .FirstOrDefaultAsync();
                if (admin == null) return null!;
                var AdminDto = new AdminDto
                {
                    Id = admin.Id,
                    FirstName = admin.FirstName,
                    LastName = admin.LastName,
                    Email = admin.Email,
                    PhoneNumber = admin.PhoneNumber,
                    ContactAddress = admin.ContactAddress,
                    Addresses = _mapper.Map<List<AddressDtoLite>>(admin.Addresses),
                    
                };
                return AdminDto;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<Admin> getByEmail(string email)
        {
            try
            {
                var admin = await _dbContext.Admins.FirstOrDefaultAsync(c => c.Email!.ToLower() == email.ToLower());
                return admin!;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        public async Task<Admin> getByPhone(string phone)
        {
            try
            {
                var admin = await _dbContext.Admins.FirstOrDefaultAsync(c => c.PhoneNumber! == phone);
                return admin!;
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

        public async Task<AdminDtoLite> updateAsync(AdminDto admin, int id)
        {
            try
            {
                var initialAdmin = await _dbContext.Admins.FirstOrDefaultAsync(c => c.Id == id);
                var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
                if (initialAdmin == null) return null!;
                initialAdmin.ContactAddress = admin.ContactAddress;
                initialAdmin.FirstName = admin.FirstName;
                initialAdmin.LastName = admin.LastName;
                initialAdmin.Email = admin.Email;
                initialAdmin.PhoneNumber = admin.PhoneNumber;
                initialAdmin.SearchString = admin.FirstName!.ToUpper() + " " + admin.LastName!.ToUpper() + " " + admin.Email!.ToUpper();
                initialAdmin.UpdatedAt = DateTime.UtcNow;
                _dbContext.Admins.Attach(initialAdmin);
                await _dbContext.SaveChangesAsync();
                var AdminDtoLite = _mapper.Map<AdminDtoLite>(initialAdmin);
                var Type = _oService.Strip(user!.GetType().ToString());
                AdminDtoLite.Role = Type;
                return AdminDtoLite;
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
                    api_key = Environment.GetEnvironmentVariable("TERMII_API_KEY") ?? _config["Termii:Api_Key"]
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
                var user = await _dbContext.Admins.FirstOrDefaultAsync(c => c.PhoneNumber == phone);
                if (user != null) throw new Exceptions.ServiceException("Phone number already exists");
                var requestUri = _config["Termii:SendOtp_Url"]; // Termii API endpoint for sending SMS

                var payload = new
                {
                    to = phoneNumber,
                    from = Environment.GetEnvironmentVariable("TERMII_SENDER_ID") ?? _config["Termii:Sender_Id"],
                    message_type = "NUMERIC",
                    channel = "dnd",
                    api_key = Environment.GetEnvironmentVariable("TERMII_API_KEY") ?? _config["Termii:Api_Key"],
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
                var user = await _dbContext.Admins.FirstOrDefaultAsync(c => c.PhoneNumber == phone);
                if (user != null) throw new Exceptions.ServiceException("Phone number already exists");

                var client = new RestSharp.RestClient(_config["Termii:SendOtp_Url"]!);
                var request = new RestRequest(_config["Termii:SendOtp_Url"], Method.Post);
                request.AddHeader("Content-Type", "application/json");

                var payload = new
                {
                    to = phoneNumber,
                    from = Environment.GetEnvironmentVariable("TERMII_SENDER_ID") ?? _config["Termii:Sender_Id"],
                    message_type = "NUMERIC",
                    channel = "dnd",
                    api_key = Environment.GetEnvironmentVariable("TERMII_API_KEY") ?? _config["Termii:Api_Key"],
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
                var admin = await _dbContext.Admins.FirstOrDefaultAsync(c => c.Id == id);
                if (admin == null) throw new Exceptions.ServiceException("Customer not found");
                if (admin.IsActive == true)
                {
                    admin.IsActive = false;
                }
                else
                {
                    admin.IsActive = true;
                }
                await _dbContext.SaveChangesAsync();
                return new { success = true, message = "Customer status updated" };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

    }
}
