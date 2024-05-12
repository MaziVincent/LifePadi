using System.ComponentModel.DataAnnotations;

namespace Api.DTO
{
<<<<<<< HEAD
    public class UserDto
    {
        public int? Id { get; set; }
=======
    public class UserDTO
    {
<<<<<<< HEAD
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public int? Id { get; set; }
>>>>>>> ee48634 (done with service, category and product controllers.)
        [Required]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(@"^([A-Za-z-.']+)$", ErrorMessage = "format not accepted")]
        public string? FirstName { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)]
        [RegularExpression(@"^([A-Za-z-.']+)$", ErrorMessage = "format not accepted")]
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
<<<<<<< HEAD
        public string? ContactAddress { get; set; }
        public string? RefreshToken { get; set; }
        public string? SearchString { get; set; }
        public List<AddressDtoLite>? Addresses { get; set; }
    }

    public class UserDtoLiteMessage
=======
        public string? ContactAdress { get; set; }
        public string? RefreshToken { get; set; }
        public string? SearchString { get; set; }
    }

    public class UserDTOLite
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
        public string? ContactAddress { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class UserDtoLite
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
=======
        public string? PasswordHash { get; set; }
=======
>>>>>>> ee48634 (done with service, category and product controllers.)
        public string? ContactAdress { get; set; }
>>>>>>> 9a80707 (created the interfaces and the DTOs)
        public string? RefreshToken { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

<<<<<<< HEAD
    public class AuthUserDto
=======
    public class AuthUserDTO
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
<<<<<<< HEAD
        public string? ContactAddress { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public Token? Token { get; set; }
    }

    public class Token
    {
        public string? RefreshToken { get; set; }
        public string? AccessToken { get; set; }
    }

    public class AuthUserDtoLite
=======
        public string? ContactAdress { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public Token? Token { get; set; }
    }

    public class Token
    {
        public string? RefreshToken { get; set; }
        public string? AccessToken { get; set; }
    }

    public class AuthUserDTOLite
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }

    public class ForgotPasswordDTO
    {
        public string? Email { get; set; }
        public string? NewPassword { get; set; }
        public string? PasswordResetToken { get; set; }
    }
}

