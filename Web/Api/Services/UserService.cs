using Api.DTO;
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
        public UserService(DBContext dbContext, IMapper mapper) { 
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<bool> checkEmail(string email)
        {
            try{
                var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
                if (user == null)
                {
                    return false;
                }
                return true;
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
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var user = await _dbContext.Admins.FirstOrDefaultAsync(u => u.Id == id);
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
        {
            try
            {
                var user = await _dbContext.Admins.FirstOrDefaultAsync(u => u.Id == id);
                var userDTO = _mapper.Map<UserDTO>(user);
                return userDTO;
            }catch (Exception ex)
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
                var loginUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
                if (loginUser == null) return null!;
                if (BCrypt.Net.BCrypt.Verify(user.Password, loginUser.PasswordHash))
                {
                    var authUser = _mapper.Map<AuthUserDTO>(loginUser);
                    return authUser;
                }
                return null!;
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Task<bool> resetPassword(ForgotPasswordDTO forgotPassword)
        {
            throw new NotImplementedException();
        }

        public async Task<UserDTO> updateAsync(UserDTO user, int id)
        {
            try
            {
                var updateUser = await _dbContext.Admins.FirstOrDefaultAsync(u => u.Id == id);
                if (updateUser == null) return null!;
                updateUser.FirstName = user.FirstName;
                updateUser.LastName = user.LastName;
                updateUser.Email = user.Email;
                updateUser.PhoneNumber = user.PhoneNumber;
                updateUser.ContactAdress = user.ContactAdress;

                _dbContext.Admins.Attach(updateUser);
                await _dbContext.SaveChangesAsync();
                var updatedUser = _mapper.Map<UserDTO>(updateUser);
                return updatedUser;

            }catch(Exception ex) 
            { 
                throw new Exception(ex.Message);
            }
        }
    }
}
