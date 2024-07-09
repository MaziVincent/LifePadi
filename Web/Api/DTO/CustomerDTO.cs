using Api.Models;
using System.ComponentModel.DataAnnotations;

namespace Api.DTO
{
<<<<<<< HEAD
<<<<<<< HEAD
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
        public List<CustomerVoucherDto>? CustomerVouchers { get; set;}
    }

    public class CustomerDtoLite
    {
        public int? Id { get; set; }
=======
    public class CustomerDTO
=======
    public class CustomerDto
>>>>>>> 836ec36 (changed all DTO to Dto)
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
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? PhoneNumber { get; set; }
        public string? Password { get; set; }
        public string? ContactAddress { get; set; }
        public string? RefreshToken { get; set; }
        public string? SearchString { get; set; }
        public DateTime DOB { get; set; }
<<<<<<< HEAD
        public List<AddressDTOLite>? Addresses { get; set; }
        public List<OrderDTOLite>? Orders { get; set; }
=======
        public List<AddressDtoLite>? Addresses { get; set; }
        public List<OrderDtoLite>? Orders { get; set; }
>>>>>>> 836ec36 (changed all DTO to Dto)
    }

    public class CustomerDtoLite
    {
<<<<<<< HEAD
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public int? Id { get; set; }
>>>>>>> ee48634 (done with service, category and product controllers.)
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        public string? Role { get; set; }
        public string? ContactAddress { get; set; }
        public DateTime DOB { get; set; }
        public WalletDto? Wallet { get; set; }
    }

    public class AuthCustomerDto
=======
        public string? PasswordHash { get; set; }
=======
>>>>>>> ee48634 (done with service, category and product controllers.)
        public string? ContactAdress { get; set; }
=======
        public string? ContactAddress { get; set; }
>>>>>>> a2698f4 (Finishing touches on the admin portal)
        public string? RefreshToken { get; set; }
        public string? SearchString { get; set; }
        public DateTime DOB { get; set; }
    }

<<<<<<< HEAD
    public class AuthCustomerDTO
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
    public class AuthCustomerDto
>>>>>>> 836ec36 (changed all DTO to Dto)
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
<<<<<<< HEAD
        public string? ContactAddress { get; set; }
=======
        public string? ContactAdress { get; set; }
>>>>>>> 9a80707 (created the interfaces and the DTOs)
        public string? RefreshToken { get; set; }
        public string? AccessToken { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
<<<<<<< HEAD
        public WalletDto? Wallet { get; set; }
    }

    public class checkUserExistsDto
    {
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
=======
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    }
}
