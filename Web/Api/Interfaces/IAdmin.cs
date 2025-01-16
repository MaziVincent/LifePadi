using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Models;
using Api.Services;

namespace Api.Interfaces
{
    public interface IAdmin
    {
        public Task<AuthUserDto> createAsync(AdminDto admin);
        public Task<PagedList<Admin>> getAllAsync(SearchPaging props);
        public Task<AdminDtoLite> updateAsync(AdminDto admin, int id);
        public Task<object> deleteAsync(int id);
        public Task<AdminDto> getAsync(int id);
        public Task<object> verifyOtp(string pinId, string pin);
        public Task<string> verifyPhone(string phoneNumber);
        public Task<string> passwordReset(string phoneNumber);
        public Task<bool> checkPhoneExists(string phoneNumber);
        public Task<string> sendOtp(string phoneNumber);
        public Task<object> toggleStatus(int id);
    }
}