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
        public int? ServiceId { get; set; }
        public Service? Service { get; set; }
        public List<ProductDtoLite>? Products { get; set; }
        public string? OpeningHours { get; set; }
        public string? ClosingHours { get; set; }
    }

    public class VendorDtoLite
    {
        public string? ContactAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public string? VendorImgUrl { get; set; }
        public string? SearchString { get; set; }
        public string? Tag { get; set; }
        public string? OpeningHours { get; set; }
        public string? ClosingHours { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class AuthVendorDto
    {
        public int? Id { get; set; }
        public string? Email { get; set; }
        public string? ContactAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public string? Tag { get; set; }
        public string? OpeningHours { get; set; }
        public string? ClosingHours { get; set; }
        public string? Password { get; set; }
        public int? ServiceId { get; set; }
    }

    public class AuthVendorDtoLite
    {
        public int? Id { get; set; }
        public string? Email { get; set; }
        public string? ContactAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public string? Tag { get; set; }
        public string? OpeningHours { get; set; }
        public string? ClosingHours { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class ImageDto
    {
        public IFormFile? Image { get; set; }
    }

}
