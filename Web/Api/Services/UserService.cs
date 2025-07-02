using Api.DTO;
using Api.Exceptions;
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
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IConfiguration? _config;

        public UserService(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _config = config;
        }
        public async Task<bool> checkEmail(string email)
        {
            try
            {
                var user = await _unitOfWork.Users.GetFirstOrDefaultAsync(x => x.Email!.ToLower() == email.ToLower());
                if (user == null)
                {
                    return false;
                }
                return true;
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

                await _unitOfWork.Admins.AddAsync(newAdmin);
                await _unitOfWork.SaveChangesAsync();

                var authuser = _mapper.Map<AuthUserDto>(newAdmin);
                return authuser;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var user = await _unitOfWork.Admins.GetByIdAsync(id);
                if (user == null) return null!;

                _unitOfWork.Admins.Remove(user);
                await _unitOfWork.SaveChangesAsync();
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
                var users = await _unitOfWork.Admins.GetAsync(
                    orderBy: q => q.OrderByDescending(a => a.CreatedAt));

                // Apply pagination
                var paginatedUsers = users.Skip((pageNumber - 1) * pageSize).Take(pageSize);
                var UserDtos = _mapper.Map<List<UserDtoLite>>(paginatedUsers);

                return UserDtos!;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<UserDto> getAsync(int id)
        {
            try
            {
                var user = await _unitOfWork.Admins.GetByIdAsync(id);
                var UserDto = _mapper.Map<UserDto>(user);
                return UserDto;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public Task<IEnumerable<OrderDto>> getUserOders(int id)
        {
            throw new NotImplementedException();
        }

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
        {
            try
            {
                var loginUser = await _unitOfWork.Users.GetFirstOrDefaultAsync(u => u.Email == user.Email);
                if (loginUser == null) return null!;
                if (BCrypt.Net.BCrypt.Verify(user.Password, loginUser.PasswordHash))
                {
                    var authUser = _mapper.Map<AuthUserDto>(loginUser);
                    return authUser;
                }
                return null!;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public string formatedPhoneNumber(string phoneNumber)
        {

            if (phoneNumber.StartsWith("+"))
            {
                return phoneNumber;
            }
            // Check if the number starts with '0'
            if (phoneNumber.StartsWith("0"))
            {
                // Remove the first character ('0') and prepend '+234'
                phoneNumber = string.Concat("+234", phoneNumber.AsSpan(1));

            }
            return phoneNumber;

        }
        public async Task<string> resetPassword(ForgotPasswordDTO forgotPassword)
        {
            try
            {

                if (string.IsNullOrEmpty(forgotPassword.NewPassword))
                {
                    throw new ServiceException("New password is required");
                }

                if (forgotPassword.Email is not null)
                {
                    var currentUser = await getUserByEmail(forgotPassword.Email);
                    if (currentUser == null)
                    {
                        throw new ServiceException("User not found");
                    }
                    currentUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(forgotPassword.NewPassword);
                    _unitOfWork.Users.Update(currentUser);
                    await _unitOfWork.SaveChangesAsync();
                    return "Password reset successfully";
                }
                var phoneNumber = formatedPhoneNumber(forgotPassword.PhoneNumber!);
                var currentUserByPhone = await getUserByPhoneNumber(phoneNumber);
                if (currentUserByPhone == null)
                {
                    throw new ServiceException("User not found");
                }
                currentUserByPhone.PasswordHash = BCrypt.Net.BCrypt.HashPassword(forgotPassword.NewPassword);
                _unitOfWork.Users.Update(currentUserByPhone);
                await _unitOfWork.SaveChangesAsync();
                return "Password reset successfully";
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }


        }

        public async Task<UserDtoLite> updateAsync(UserDtoLite user, int id)
        {
            try
            {
                var updateUser = await _unitOfWork.Admins.GetByIdAsync(id);
                if (updateUser == null) return null!;
                updateUser.FirstName = user.FirstName;
                updateUser.LastName = user.LastName;
                updateUser.Email = user.Email;
                updateUser.PhoneNumber = user.PhoneNumber;
                updateUser.ContactAddress = user.ContactAddress;
                updateUser.SearchString = user.FirstName!.ToUpper() + " " + user.LastName!.ToUpper() + " " + user.Email!.ToUpper();
                updateUser.UpdatedAt = DateTime.UtcNow;

                _unitOfWork.Admins.Update(updateUser);
                await _unitOfWork.SaveChangesAsync();
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
                var response = await _unitOfWork.Users.CountAsync();
                return response;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<User> getUserByEmail(string email)
        {
            try
            {
                var user = await _unitOfWork.Users.GetFirstOrDefaultAsync(u => u.Email == email);
                if (user == null) return null!;
                return user;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }

        public async Task<User> getUserByPhoneNumber(string phoneNumber)
        {
            try
            {
                var user = await _unitOfWork.Users.GetFirstOrDefaultAsync(u => u.PhoneNumber == phoneNumber);
                if (user == null) return null!;
                return user;
            }
            catch (Exception ex)
            {
                throw new ServiceException(ex.Message);
            }
        }



    }
}
