using Api.DTO;

namespace Api.Interfaces
{
    public interface IUser
    {
        public Task<IEnumerable<UserDtoLite>> getAllAsync(int pageNumber, int pageSize);
        public Task<UserDto> getAsync(int id);
        public Task<UserDtoLite> updateAsync(UserDtoLite user, int id);
        public Task<string> deleteAsync(int id);
        public Task<AuthUserDto> createAsync(UserDto user);
        public Task<bool> checkEmail(string email);
        public Task<bool> resetPassword(ForgotPasswordDTO forgotPassword);
        public Task<IEnumerable<OrderDto>> getUserOders(int id);
        public Task<AuthUserDto> login(AuthUserDtoLite user);
        public Task<int> totalNumberOfUsers();
    }
}