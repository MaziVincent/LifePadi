using Api.DTO;

namespace Api.Interfaces
{
    public interface IUser
    {
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
        public Task<IEnumerable<UserDTO>> getAllAsync();
=======
        public Task<IEnumerable<UserDTOLite>> getAllAsync(int pageNumber, int pageSize);
>>>>>>> ee48634 (done with service, category and product controllers.)
        public Task<UserDTO> getAsync(int id);
        public Task<UserDTOLite> updateAsync(UserDTOLite user, int id);
        public Task<string> deleteAsync(int id);
        public Task<AuthUserDTO> createAsync(UserDTO user);
        public Task<bool> checkEmail(string email);
        public Task<bool> resetPassword(ForgotPasswordDTO forgotPassword);
        public Task<IEnumerable<OrderDTO>> getUserOders(int id);
        public Task<AuthUserDTO> login(AuthUserDTOLite user);
<<<<<<< HEAD
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public Task<int> totalNumberOfUsers();
>>>>>>> 98415b4 (done with dashboard)
    }
}