using Api.DTO;

namespace Api.Interfaces
{
    public interface IUser
    {
        public Task<IEnumerable<UserDTO>> getAllAsync();
        public Task<UserDTO> getAsync(int id);
        public Task<UserDTO> updateAsync(UserDTO user, int id);
        public Task<string> deleteAsync(int id);
        public Task<AuthUserDTO> createAsync(UserDTO user);
        public Task<bool> checkEmail(string email);
        public Task<bool> resetPassword(ForgotPasswordDTO forgotPassword);
        public Task<IEnumerable<OrderDTO>> getUserOders(int id);
        public Task<AuthUserDTO> login(AuthUserDTOLite user);
    }
}