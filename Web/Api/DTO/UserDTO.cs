using System.ComponentModel.DataAnnotations;

namespace Api.DTO
{
    public class UserDTO
    {
        public int? Id { get; set; }
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
        public string? ContactAddress { get; set; }
        public string? RefreshToken { get; set; }
        public string? SearchString { get; set; }
        public List<AddressDtoLite>? Addresses { get; set; }
    }

    public class UserDTOLite
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class AuthUserDTO
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
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

    public class AuthUserDTOLite
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

