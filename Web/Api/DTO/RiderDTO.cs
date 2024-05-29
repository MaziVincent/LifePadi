using Api.Models;

namespace Api.DTO
{
    public class RiderDTO
    {
        public int? Id { get; set; }
        public string?  FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public string? EmergencyContact { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsVerified { get; set; }
        public string? Password { get; set; }
        public List<OrderDTOLite>? Orders { get; set; }
    }

    public class GetRiderDTO
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public string? EmergencyContact { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsVerified { get; set; }
        public List<OrderDTOLite>? Orders { get; set; }
    }

    public class RiderDTOLite
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public string? EmergencyContact { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsVerified { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }


    public class CreateRiderDTO
    {
        public int? Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ContactAddress { get; set; }
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public IFormFile? IdentityImg { get; set; }
        public string? EmergencyContact { get; set; }
        public string? Password { get; set; }
        public List<OrderDTOLite>? Orders { get; set; }
    }

    public class AuthRiderDTO : AuthUserDTO
    {
        public bool? IsVerified { get; set; }
    }
}
