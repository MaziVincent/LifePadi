using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Api.Validation;

namespace Api.DTO
{
    public class LoginDto
    {
        [EmailValidation(ErrorMessage = "Please enter a valid email address")]
        [NoHtmlValidation(ErrorMessage = "Email cannot contain HTML or script content")]
        public string? Email { get; set; }

        [PhoneValidation(ErrorMessage = "Please enter a valid phone number")]
        [NoHtmlValidation(ErrorMessage = "Phone number cannot contain HTML or script content")]
        public string? PhoneNumber { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Password is required")]
        [NoHtmlValidation(ErrorMessage = "Password cannot contain HTML or script content")]
        public string? Password { get; set; }
    }

    public class LoggedInUserDto
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Role { get; set; }
        public string? ContactAddress { get; set; }
        public string? RefreshToken { get; set; }
        public string? AccessToken { get; set; }
        public WalletDtoLite? Wallet { get; set; }

    }
}