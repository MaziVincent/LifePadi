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
        public int CategoryId { get; set; }
        public CategoryDTOLite? Category { get; set; }
        public int VendorId { get; set; }
        public VendorDTOLite? Vendor { get; set; }

    }

    public class ProductDTOLite
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? Status { get; set; }
        public Double? Price { get; set; }
        public string? ProductImgUrl { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateProductDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? Status { get; set; }
        public Double? Price { get; set; }
        public string? ProductImgUrl { get; set; }
        public IFormFile? Image { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public int VendorId { get; set; }
        public Vendor? Vendor { get; set; }
    }
}
