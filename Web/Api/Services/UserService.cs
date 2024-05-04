using Api.DTO;
<<<<<<< HEAD
using Api.Exceptions;
using Api.Helpers;
=======
>>>>>>> 9a80707 (created the interfaces and the DTOs)
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
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<bool> checkEmail(string email)
        {
            try{
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
>>>>>>> 9a80707 (created the interfaces and the DTOs)
                if (user == null)
                {
                    return false;
                }
                return true;
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
                var authuser = _mapper.Map<AuthUserDTO>(newAdmin);
                await _dbContext.Admins.AddAsync(newAdmin);
                await _dbContext.SaveChangesAsync();
                return authuser;
            }catch (Exception ex)
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
                if (user == null) return null!;
                _dbContext.Remove(user);
                await _dbContext.SaveChangesAsync();
                return "User deleted";
            }
            catch (Exception ex)
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
                _dbContext.Remove(user);
                await _dbContext.SaveChangesAsync();
                return "User deleted";
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<IEnumerable<UserDTO>> getAllAsync()
        {
            try
            {
                var users = await _dbContext.Admins.ToListAsync();
                var userDTOs = new List<UserDTO>();
                foreach (var user in users)
                {
                    var userDTO = _mapper.Map<UserDTO>(user);
                    userDTOs.Add(userDTO);
                }
                return userDTOs!;
            }catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<UserDTO> getAsync(int id)
>>>>>>> 9a80707 (created the interfaces and the DTOs)
        {
            try
            {
                var user = await _dbContext.Admins.FirstOrDefaultAsync(u => u.Id == id);
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
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Task<IEnumerable<OrderDTO>> getUserOders(int id)
>>>>>>> 9a80707 (created the interfaces and the DTOs)
        {
            throw new NotImplementedException();
        }

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
        {
            try
            {
                var loginUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
                if (loginUser == null) return null!;
                if (BCrypt.Net.BCrypt.Verify(user.Password, loginUser.PasswordHash))
                {
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
                    return authUser;
                }
                return null!;
            }catch (Exception ex)
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
        public async Task<UserDtoLite> updateAsync(UserDtoLite user, int id)
=======
        public async Task<UserDTO> updateAsync(UserDTO user, int id)
>>>>>>> 9a80707 (created the interfaces and the DTOs)
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
                updateUser.ContactAddress = user.ContactAddress;
                updateUser.SearchString = user.FirstName!.ToUpper() + " " + user.LastName!.ToUpper() + " " + user.Email!.ToUpper();
                updateUser.UpdatedAt = DateTime.UtcNow;

                _dbContext.Admins.Attach(updateUser);
                await _dbContext.SaveChangesAsync();
                var updatedUser = _mapper.Map<UserDtoLite>(updateUser);
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

                _dbContext.Admins.Attach(updateUser);
                await _dbContext.SaveChangesAsync();
                var updatedUser = _mapper.Map<UserDTO>(updateUser);
                return updatedUser;

            }catch(Exception ex) 
            { 
                throw new Exception(ex.Message);
>>>>>>> 9a80707 (created the interfaces and the DTOs)
            }
        }
    }
}
