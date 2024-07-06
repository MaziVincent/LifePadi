using Api.Models;

namespace Api.DTO
{
<<<<<<< HEAD
<<<<<<< HEAD
    public class ProductDto
=======
    public class ProductDTO
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
    public class ProductDto
>>>>>>> 836ec36 (changed all DTO to Dto)
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? Status { get; set; }
        public Double? Price { get; set; }
        public string? ProductImgUrl { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
        public string? Tag { get; set; }
        public int CategoryId { get; set; }
        public CategoryDtoLite? Category { get; set; }
        public int VendorId { get; set; }
        public VendorDtoLite? Vendor { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public List<ProductReviewDto>? ProductReviews { get; set; }

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
<<<<<<< HEAD
        public CategoryDtoLite? Category { get; set; }
        public int? VendorId {get; set;}
        public VendorDtoLite? Vendor { get; set; }

        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateProductDto
    {
        public int? Id { get; set; }
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
=======
        public int Category_Id { get; set; }
        public Category? Category { get; set; }
        public int Vendor_Id { get; set; }
        public Vendor? Vendor { get; set; }
        public int Service_Id { get; set; }
        public Service? Service { get; set; }
=======
        public int CategoryId { get; set; }
        public CategoryDtoLite? Category { get; set; }
        public int VendorId { get; set; }
        public VendorDtoLite? Vendor { get; set; }

>>>>>>> ee48634 (done with service, category and product controllers.)
    }

    public class ProductDtoLite
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? Status { get; set; }
        public Double? Price { get; set; }
        public string? ProductImgUrl { get; set; }
<<<<<<< HEAD
        public int Category_Id { get; set; }
        public int Vendor_Id { get; set; }
        public int Service_Id { get; set; }
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
=======
        public int? VendorId {get; set;}
>>>>>>> 4dc5d34 (worked on product component)
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
        public IFormFile? Image { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public int VendorId { get; set; }
        public Vendor? Vendor { get; set; }
<<<<<<< HEAD
        public int ServiceId { get; set; }
        public Service? Service { get; set; }
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
>>>>>>> 58020e7 (removed service from product)
    }
}
