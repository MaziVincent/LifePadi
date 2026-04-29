using Api.Models;

namespace Api.DTO
{
    public class VendorDto
    {
        public int? Id { get; set; }
        public string? ContactAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public string? VendorImgUrl { get; set; }
        public string? SearchString { get; set; }
        public string? Tag { get; set; }
        public bool? IsActive { get; set; }
        public string? TimeTakesToPurchase { get; set; }
        public int? ServiceId { get; set; }
        public Service? Service { get; set; }
        public List<ProductDtoLite>? Products { get; set; }
        public string? OpeningHours { get; set; }
        public string? ClosingHours { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public List<VendorReview>? VendorReviews { get; set; }
    }

    public class VendorDtoLite
    {
        public int? Id { get; set; }
        public string? ContactAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public string? VendorImgUrl { get; set; }
        public string? SearchString { get; set; }
        public string? Tag { get; set; }
        public bool? IsActive { get; set; }
        public string? ApprovalStatus { get; set; }
        public string? ApprovalReason { get; set; }
        public DateTime? ApprovalDecisionAt { get; set; }
        public string? Email { get; set; }
        public string? TimeTakesToPurchase { get; set; }
        public string? OpeningHours { get; set; }
        public string? ClosingHours { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<AddressDtoLite>? Addresses {get; set; }
        public List<VendorReview>? VendorReviews { get; set; }
    }

    public class AuthVendorDto
    {
        public int? Id { get; set; }
        public string? Email { get; set; }
        public string? ContactAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public string? Tag { get; set; }
        public bool? IsActive { get; set; }

        public string? TimeTakesToPurchase { get; set; }
        public string? OpeningHours { get; set; }
        public string? ClosingHours { get; set; }
        public string? Password { get; set; }
        public string? Town { get; set;}
        public string? City { get; set; }
        public string? LocalGovt { get; set; }

        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public string? VendorImgUrl { get; set; }
        public int? ServiceId { get; set; }
        public int? VendorCategoryId {get; set;}
        public List<ProductDtoLite>? Products { get; set; }
    }

    public class AuthVendorDtoLite
    {
        public int? Id { get; set; }
        public string? Email { get; set; }
        public string? ContactAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public string? Tag { get; set; }
        public bool? IsActive { get; set; }
        public string? ApprovalStatus { get; set; }

        public string? OpeningHours { get; set; }
        public int? ServiceId {get; set;}
        public int? VendorCategoryId {get; set;}
        public string? ClosingHours { get; set; }
        
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class ImageDto
    {
        public IFormFile? Image { get; set; }
    }

}
