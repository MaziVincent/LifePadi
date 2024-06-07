using Api.DTO;
<<<<<<< HEAD
<<<<<<< HEAD
using Api.Exceptions;
using Api.Helpers;
=======
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
using Api.Helpers;
>>>>>>> ee48634 (done with service, category and product controllers.)
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
<<<<<<< HEAD
<<<<<<< HEAD
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
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email!.ToLower() == email.ToLower());
=======
        public UserService(DBContext dbContext, IMapper mapper) { 
=======
        private readonly IConfiguration? _config;
<<<<<<< HEAD
        public UserService(DBContext dbContext, IMapper mapper, IConfiguration config) { 
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public UserService(DBContext dbContext, IMapper mapper, IConfiguration config)
        {
>>>>>>> 98415b4 (done with dashboard)
            _dbContext = dbContext;
            _mapper = mapper;
            _config = config;
        }
        public async Task<bool> checkEmail(string email)
        {
            try
            {
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
>>>>>>> 9a80707 (created the interfaces and the DTOs)
                if (user == null)
                {
                    return false;
                }
                return true;
<<<<<<< HEAD
<<<<<<< HEAD
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<AuthUserDto> createAsync(UserDto user)
        {
            try
            {
                var response = await checkEmail(user.Email!);
                if (response)
                {
                    throw new ServiceException("Email already exists");
                }
                var newAdmin = _mapper.Map<Admin>(user);
                newAdmin.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
                newAdmin.SearchString = user.FirstName!.ToUpper() + " " + user.LastName!.ToUpper() + " " + user.Email!.ToUpper();
                await _dbContext.Admins.AddAsync(newAdmin);
                await _dbContext.SaveChangesAsync();
                var authuser = _mapper.Map<AuthUserDto>(newAdmin);
                return authuser;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
=======
            }catch(Exception ex)
=======
            }
            catch (Exception ex)
>>>>>>> 98415b4 (done with dashboard)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<AuthUserDto> createAsync(UserDto user)
        {
            try
            {
                var newAdmin = _mapper.Map<Admin>(user);
                newAdmin.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
                newAdmin.SearchString = user.FirstName!.ToUpper() + " " + user.LastName!.ToUpper() + " " + user.Email!.ToUpper();
                await _dbContext.Admins.AddAsync(newAdmin);
                await _dbContext.SaveChangesAsync();
                var authuser = _mapper.Map<AuthUserDto>(newAdmin);
                return authuser;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
>>>>>>> 9a80707 (created the interfaces and the DTOs)
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var user = await _dbContext.Admins.FirstOrDefaultAsync(u => u.Id == id);
<<<<<<< HEAD
<<<<<<< HEAD
                if (user == null) return null!;
                _dbContext.Remove(user);
                await _dbContext.SaveChangesAsync();
                return "User deleted";
            }
            catch (Exception ex)
<<<<<<< HEAD
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<IEnumerable<UserDtoLite>> getAllAsync(int pageNumber, int pageSize)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var users = await _dbContext.Admins.Skip(skip).Take(pageSize).OrderByDescending(a => a.CreatedAt).ToListAsync();
                var UserDtos = _mapper.Map<List<UserDtoLite>>(users);

                return UserDtos!;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<UserDto> getAsync(int id)
=======
                if (user == null) return "User not found";
=======
                if (user == null) return null!;
>>>>>>> ee48634 (done with service, category and product controllers.)
                _dbContext.Remove(user);
                await _dbContext.SaveChangesAsync();
                return "User deleted";
            }catch(Exception ex)
=======
>>>>>>> 98415b4 (done with dashboard)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<UserDtoLite>> getAllAsync(int pageNumber, int pageSize)
        {
            try
            {
                var skip = (pageNumber - 1) * pageSize;
                var users = await _dbContext.Admins.Skip(skip).Take(pageSize).OrderByDescending(a => a.CreatedAt).ToListAsync();
                var UserDtos = _mapper.Map<List<UserDtoLite>>(users);

                return UserDtos!;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public async Task<UserDTO> getAsync(int id)
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public async Task<UserDto> getAsync(int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var user = await _dbContext.Admins.FirstOrDefaultAsync(u => u.Id == id);
<<<<<<< HEAD
<<<<<<< HEAD
                var UserDto = _mapper.Map<UserDto>(user);
                return UserDto;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public Task<IEnumerable<OrderDto>> getUserOders(int id)
=======
                var userDTO = _mapper.Map<UserDTO>(user);
                return userDTO;
=======
                var UserDto = _mapper.Map<UserDto>(user);
                return UserDto;
>>>>>>> 836ec36 (changed all DTO to Dto)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

<<<<<<< HEAD
        public Task<IEnumerable<OrderDTO>> getUserOders(int id)
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public Task<IEnumerable<OrderDto>> getUserOders(int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            throw new NotImplementedException();
        }

<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<AuthUserDto> login(AuthUserDtoLite user)
        {
            try
            {
                var authUser = await authenticate(user);
                if (authUser == null) return null!;
                var genTokenDto = _mapper.Map<GenTokenDto>(authUser);
                var genToken = new GenerateToken(_config!);
                var accessToken = genToken.generateAccessToken(genTokenDto);
                var refreshToken = genToken.generateRefreshToken(genTokenDto);
                authUser.Token!.AccessToken = accessToken;
                authUser.Token!.RefreshToken = refreshToken;

                return authUser;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<AuthUserDto> authenticate(AuthUserDtoLite user)
=======
        public async Task<AuthUserDTO> login(AuthUserDTOLite user)
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public async Task<AuthUserDto> login(AuthUserDtoLite user)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var authUser = await authenticate(user);
                if (authUser == null) return null!;
                var genTokenDto = _mapper.Map<GenTokenDto>(authUser);
                var genToken = new GenerateToken(_config!);
                var accessToken = genToken.generateAccessToken(genTokenDto);
                var refreshToken = genToken.generateRefreshToken(genTokenDto);
                authUser.Token!.AccessToken = accessToken;
                authUser.Token!.RefreshToken = refreshToken;

                return authUser;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<AuthUserDto> authenticate(AuthUserDtoLite user)
        {
            try
            {
                var loginUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
                if (loginUser == null) return null!;
                if (BCrypt.Net.BCrypt.Verify(user.Password, loginUser.PasswordHash))
                {
<<<<<<< HEAD
<<<<<<< HEAD
                    var authUser = _mapper.Map<AuthUserDto>(loginUser);
                    return authUser;
                }
                return null!;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
=======
                    var authUser = _mapper.Map<AuthUserDTO>(loginUser);
=======
                    var authUser = _mapper.Map<AuthUserDto>(loginUser);
>>>>>>> 836ec36 (changed all DTO to Dto)
                    return authUser;
                }
                return null!;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
>>>>>>> 9a80707 (created the interfaces and the DTOs)
            }
        }

        public Task<bool> resetPassword(ForgotPasswordDTO forgotPassword)
        {
            throw new NotImplementedException();
        }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<UserDtoLite> updateAsync(UserDtoLite user, int id)
=======
        public async Task<UserDTO> updateAsync(UserDTO user, int id)
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public async Task<UserDTOLite> updateAsync(UserDTOLite user, int id)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<UserDtoLite> updateAsync(UserDtoLite user, int id)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                var updateUser = await _dbContext.Admins.FirstOrDefaultAsync(u => u.Id == id);
                if (updateUser == null) return null!;
                updateUser.FirstName = user.FirstName;
                updateUser.LastName = user.LastName;
                updateUser.Email = user.Email;
                updateUser.PhoneNumber = user.PhoneNumber;
<<<<<<< HEAD
<<<<<<< HEAD
                updateUser.ContactAddress = user.ContactAddress;
                updateUser.SearchString = user.FirstName!.ToUpper() + " " + user.LastName!.ToUpper() + " " + user.Email!.ToUpper();
                updateUser.UpdatedAt = DateTime.UtcNow;

                _dbContext.Admins.Attach(updateUser);
                await _dbContext.SaveChangesAsync();
                var updatedUser = _mapper.Map<UserDtoLite>(updateUser);
<<<<<<< HEAD
                return updatedUser;

            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
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
                throw new ServiceException(ex.Message);
=======
                updateUser.ContactAdress = user.ContactAdress;
=======
                updateUser.ContactAddress = user.ContactAddress;
>>>>>>> 28d4101 (finished with rider and order)
                updateUser.SearchString = user.FirstName!.ToUpper() + " " + user.LastName!.ToUpper() + " " + user.Email!.ToUpper();
                updateUser.UpdatedAt = DateTime.UtcNow;

                _dbContext.Admins.Attach(updateUser);
                await _dbContext.SaveChangesAsync();
                var updatedUser = _mapper.Map<UserDTOLite>(updateUser);
=======
>>>>>>> 836ec36 (changed all DTO to Dto)
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
>>>>>>> 9a80707 (created the interfaces and the DTOs)
            }
        }
    }
}
