using Api.DTO;
using Api.Helpers;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Api.Services
{
    public class UserService : IUser
    {
        private readonly DBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IConfiguration? _config;
        public UserService(DBContext dbContext, IMapper mapper, IConfiguration config)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _config = config;
        }
        public async Task<bool> checkEmail(string email)
        {
            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
                if (user == null)
                {
                    return false;
                }
                return true;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<AuthUserDTO> createAsync(UserDTO user)
        {
            try
            {
                var newAdmin = _mapper.Map<Admin>(user);
                newAdmin.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
                newAdmin.SearchString = user.FirstName!.ToUpper() + " " + user.LastName!.ToUpper() + " " + user.Email!.ToUpper();
                await _dbContext.Admins.AddAsync(newAdmin);
                await _dbContext.SaveChangesAsync();
                var authuser = _mapper.Map<AuthUserDTO>(newAdmin);
                return authuser;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var user = await _dbContext.Admins.FirstOrDefaultAsync(u => u.Id == id);
                if (user == null) return null!;
                _dbContext.Remove(user);
                await _dbContext.SaveChangesAsync();
                return "User deleted";
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<UserDTOLite>> getAllAsync(int pageNumber, int pageSize)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var users = await _dbContext.Admins.Skip(skip).Take(pageSize).OrderByDescending(a => a.CreatedAt).ToListAsync();
                var userDTOs = _mapper.Map<List<UserDTOLite>>(users);

                return userDTOs!;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<UserDTO> getAsync(int id)
        {
            try
            {
                var user = await _dbContext.Admins.FirstOrDefaultAsync(u => u.Id == id);
                var userDTO = _mapper.Map<UserDTO>(user);
                return userDTO;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Task<IEnumerable<OrderDTO>> getUserOders(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<AuthUserDTO> login(AuthUserDTOLite user)
        {
            try
            {
                var authUser = await authenticate(user);
                if (authUser == null) return null!;
                var genTokenDTO = _mapper.Map<GenTokenDTO>(authUser);
                var genToken = new GenerateToken(_config!);
                var accessToken = genToken.generateAccessToken(genTokenDTO);
                var refreshToken = genToken.generateRefreshToken(genTokenDTO);
                authUser.Token!.AccessToken = accessToken;
                authUser.Token!.RefreshToken = refreshToken;

                return authUser;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<AuthUserDTO> authenticate(AuthUserDTOLite user)
        {
            try
            {
                var loginUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
                if (loginUser == null) return null!;
                if (BCrypt.Net.BCrypt.Verify(user.Password, loginUser.PasswordHash))
                {
                    var authUser = _mapper.Map<AuthUserDTO>(loginUser);
                    return authUser;
                }
                return null!;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Task<bool> resetPassword(ForgotPasswordDTO forgotPassword)
        {
            throw new NotImplementedException();
        }

        public async Task<UserDTOLite> updateAsync(UserDTOLite user, int id)
        {
            try
            {
                var updateUser = await _dbContext.Admins.FirstOrDefaultAsync(u => u.Id == id);
                if (updateUser == null) return null!;
                updateUser.FirstName = user.FirstName;
                updateUser.LastName = user.LastName;
                updateUser.Email = user.Email;
                updateUser.PhoneNumber = user.PhoneNumber;
                updateUser.ContactAddress = user.ContactAddress;
                updateUser.SearchString = user.FirstName!.ToUpper() + " " + user.LastName!.ToUpper() + " " + user.Email!.ToUpper();
                updateUser.UpdatedAt = DateTime.UtcNow;

                _dbContext.Admins.Attach(updateUser);
                await _dbContext.SaveChangesAsync();
                var updatedUser = _mapper.Map<UserDTOLite>(updateUser);
                return updatedUser;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<int> totalNumberOfUsers()
        {
            try
            {
                var response = await _dbContext.Users.CountAsync();
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
