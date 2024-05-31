using Api.DTO;

namespace Api.Interfaces
{
    public interface IUser
    {
        public Task<IEnumerable<UserDTOLite>> getAllAsync(int pageNumber, int pageSize);
        public Task<UserDTO> getAsync(int id);
        public Task<UserDTOLite> updateAsync(UserDTOLite user, int id);
        public Task<string> deleteAsync(int id);
        public Task<AuthUserDTO> createAsync(UserDTO user);
        public Task<bool> checkEmail(string email);
        public Task<bool> resetPassword(ForgotPasswordDTO forgotPassword);
        public Task<IEnumerable<OrderDTO>> getUserOders(int id);
        public Task<AuthUserDTO> login(AuthUserDTOLite user);
        public Task<int> totalNumberOfUsers();
    }
}