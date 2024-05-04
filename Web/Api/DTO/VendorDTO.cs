using Api.Models;

namespace Api.DTO
{
    public class VendorDTO
    {
        public string? ContactAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public string? Type { get; set; }
        public string? VendorImgUrl { get; set; }
        public string? SearchString { get; set; }
        public List<ProductDTO>? Products { get; set; }
    }

    public class VendorDTOLite
    {
        public string? ContactAddress { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public string? Type { get; set; }
        public string? VendorImgUrl { get; set; }
        public string? SearchString { get; set; }
    }

}
