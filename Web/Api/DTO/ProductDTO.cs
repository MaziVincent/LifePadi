using Api.Models;

namespace Api.DTO
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? Status { get; set; }
        public Double? Price { get; set; }
        public string? ProductImgUrl { get; set; }
        public string? Tag { get; set; }
        public int CategoryId { get; set; }
        public CategoryDtoLite? Category { get; set; }
        public int VendorId { get; set; }
        public VendorDtoLite? Vendor { get; set; }
        public List<ProductReview>? ProductReviews { get; set; }

    }

    public class ProductDtoLite
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? Status { get; set; }
        public Double? Price { get; set; }
        public string? ProductImgUrl { get; set; }
        public string? Tag { get; set; }
        public int? CategoryId {get; set;}
        public int? VendorId {get; set;}
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateProductDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? Status { get; set; }
        public Double? Price { get; set; }
        public string? ProductImgUrl { get; set; }
        public string? Tag { get; set; }
        public IFormFile? Image { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public int VendorId { get; set; }
        public Vendor? Vendor { get; set; }
    }
}
