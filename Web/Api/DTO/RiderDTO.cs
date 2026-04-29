using Api.Models;

namespace Api.DTO
{
    public class RiderDto
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
        public List<OrderDtoLite>? Orders { get; set; }
        public List<RiderReview>? RiderReviews { get; set; }
    }

    public class GetRiderDto
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
        public List<DeliveryDtoLite>? Deliveries { get; set; }
        public List<RiderReview>? RiderReviews { get; set; }
    }

    public class RiderDtoLite
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
        public string? ApprovalStatus { get; set; }
        public string? ApprovalReason { get; set; }
        public DateTime? ApprovalDecisionAt { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class CreateRiderDto
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
        public List<OrderDtoLite>? Orders { get; set; }
    }

    public class AuthRiderDto : AuthUserDto
    {
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public string? EmergencyContact { get; set; }
        public bool? IsVerified { get; set; }
        public bool? IsActive {get; set;}
        public string? ApprovalStatus { get; set; }
    }
}
