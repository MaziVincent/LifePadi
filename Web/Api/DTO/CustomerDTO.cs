using Api.Models;
using System.ComponentModel.DataAnnotations;

namespace Api.DTO
{
    public class CustomerDto
    {
        public int? Id { get; set; }
        [Required]
        // [StringLength(50, MinimumLength = 2)]
        // [RegularExpression(@"^([A-Za-z-.']+)$", ErrorMessage = "format not accepted")]
        public string? FirstName { get; set; }

        [Required]
        //[StringLength(50, MinimumLength = 2)]
       // [RegularExpression(@"^([A-Za-z-.']+)$", ErrorMessage = "format not accepted")]
        public string? LastName { get; set; }
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public string? ContactAddress { get; set; }
        public string? RefreshToken { get; set; }
        public string? SearchString { get; set; }
        public WalletDto? Wallet { get; set; }
        public DateTime DOB { get; set; }
        public List<AddressDtoLite>? Addresses { get; set; }
        public List<OrderDtoLite>? Orders { get; set; }
    }

    public class CustomerDtoLite
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
        public DateTime DOB { get; set; }
        public WalletDto? Wallet { get; set; }
    }

    public class AuthCustomerDto
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
        public WalletDto? Wallet { get; set; }
    }

    public class checkUserExistsDto
    {
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
    }
}
