using Api.Models;

namespace Api.DTO
{
    public class VendorDTO
    {
        public int? Id { get; set; }
        public string? ContactAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public string? VendorType { get; set; }
        public string? VendorImgUrl { get; set; }
        public string? SearchString { get; set; }
        public List<ProductDTOLite>? Products { get; set; }
    }

    public class VendorDTOLite
    {
        public string? ContactAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public string? VendorType { get; set; }
        public string? VendorImgUrl { get; set; }
        public string? SearchString { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class AuthVendorDTO
    {
        public int? Id { get; set; }
        public string? Email { get; set; }
        public string? VendorType { get; set; }
        public string? ContactAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public string? Password { get; set; }
    }

    public class AuthVendorDTOLite
    {
        public int? Id { get; set; }
        public string? Email { get; set; }
        public string? VendorType { get; set; }
        public string? ContactAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class ImageDTO
    {
        public IFormFile? Image { get; set; }
    }

}
