using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Validation;

namespace Api.DTO
{
    public class AdminDto
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

        [Required(ErrorMessage = "Email is required")]
        [StringLength(100, ErrorMessage = "Email cannot exceed 100 characters")]
        [EmailValidation(ErrorMessage = "Please enter a valid email address")]
        [NoHtmlValidation(ErrorMessage = "Email cannot contain HTML or script content")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Phone number is required")]
        [PhoneValidation(ErrorMessage = "Please enter a valid phone number")]
        [NoHtmlValidation(ErrorMessage = "Phone number cannot contain HTML or script content")]
        public string? PhoneNumber { get; set; }

        [PasswordValidation(MinLength = 6, RequireUppercase = false, RequireLowercase = false,
                           RequireDigit = false, RequireSpecialChar = false,
                           ErrorMessage = "Password must be at least 8 characters with uppercase, lowercase, digit, and special character")]
        public string? Password { get; set; }
        public string? ContactAddress { get; set; }
        public string? RefreshToken { get; set; }
        public string? SearchString { get; set; }
        public bool? IsActive { get; set; }
        public List<AddressDtoLite>? Addresses { get; set; }
    }

    public class AdminDtoLite
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Role { get; set; }
        public bool? IsActive { get; set; }
        public string? ContactAddress { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<AddressDtoLite>? Addresses { get; set; }
    }

    public class AuthAdminDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
        public string? RefreshToken { get; set; }
        public string? AccessToken { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }


}