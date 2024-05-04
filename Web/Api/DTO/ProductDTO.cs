using Api.Models;

namespace Api.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? Status { get; set; }
        public Double? Price { get; set; }
        public string? ProductImgUrl { get; set; }
        public int Category_Id { get; set; }
        public Category? Category { get; set; }
        public int Vendor_Id { get; set; }
        public Vendor? Vendor { get; set; }
        public int Service_Id { get; set; }
        public Service? Service { get; set; }
    }

    public class ProductDTOLite
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? Status { get; set; }
        public Double? Price { get; set; }
        public string? ProductImgUrl { get; set; }
        public int Category_Id { get; set; }
        public int Vendor_Id { get; set; }
        public int Service_Id { get; set; }
    }
}
