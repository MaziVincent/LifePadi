using System.ComponentModel.DataAnnotations;
using Api.Validation;

namespace Api.DTO
{
    public class UserDto
    {
        public int? Id { get; set; }
        [Required(ErrorMessage = "First name is required")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "First name must be between 2 and 50 characters")]
        [NameValidation(ErrorMessage = "First name contains invalid characters")]
        [NoHtmlValidation(ErrorMessage = "First name cannot contain HTML or script content")]
        public string? FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "Last name must be between 2 and 50 characters")]
        [NameValidation(ErrorMessage = "Last name contains invalid characters")]
        [NoHtmlValidation(ErrorMessage = "Last name cannot contain HTML or script content")]
        public string? LastName { get; set; }

        [EmailValidation(ErrorMessage = "Please enter a valid email address")]
        [NoHtmlValidation(ErrorMessage = "Email cannot contain HTML or script content")]
        public string? Email { get; set; }

        [PhoneValidation(ErrorMessage = "Please enter a valid phone number")]
        [NoHtmlValidation(ErrorMessage = "Phone number cannot contain HTML or script content")]
        public string? PhoneNumber { get; set; }

        [PasswordValidation(MinLength = 8, RequireUppercase = true, RequireLowercase = true,
                           RequireDigit = true, RequireSpecialChar = true,
                           ErrorMessage = "Password must be at least 8 characters with uppercase, lowercase, digit, and special character")]
        public string? Password { get; set; }
        public string? ContactAddress { get; set; }
        public string? RefreshToken { get; set; }
        public string? SearchString { get; set; }
        public List<AddressDtoLite>? Addresses { get; set; }
    }

    public class UserDtoLiteMessage
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
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
        public string? RefreshToken { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class AuthUserDto
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

    public class AuthUserDtoLite
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailValidation(ErrorMessage = "Please enter a valid email address")]
        [NoHtmlValidation(ErrorMessage = "Email cannot contain HTML or script content")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [PasswordValidation(MinLength = 6, 
                           ErrorMessage = "Password must be at least 8 characters with uppercase, lowercase, digit, and special character")]
        public string? Password { get; set; }
    }

    public class ForgotPasswordDTO
    {
        [EmailValidation(ErrorMessage = "Please enter a valid email address")]
        [NoHtmlValidation(ErrorMessage = "Email cannot contain HTML or script content")]
        public string? Email { get; set; }

        [PhoneValidation(ErrorMessage = "Please enter a valid phone number")]
        [NoHtmlValidation(ErrorMessage = "Phone number cannot contain HTML or script content")]
        public string? PhoneNumber { get; set; }

        [Required(ErrorMessage = "New password is required")]
        [PasswordValidation(MinLength = 6, 
                           ErrorMessage = "New password must be at least 8 characters with uppercase, lowercase, digit, and special character")]
        public string? NewPassword { get; set; }
    }
}

