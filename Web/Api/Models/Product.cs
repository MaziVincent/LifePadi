namespace Api.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool? Status { get; set; }
        public double? Price { get; set; }
        public string? ProductImgUrl { get; set; }
<<<<<<< HEAD
        public string? Tag { get; set; }
=======
>>>>>>> ee48634 (done with service, category and product controllers.)
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public int VendorId { get; set; }
        public Vendor? Vendor { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
=======
        public int Service_Id { get; set;}
=======
        public int ServiceId { get; set;}
>>>>>>> ee48634 (done with service, category and product controllers.)
        public Service? Service { get; set; }
>>>>>>> 9a80707 (created the interfaces and the DTOs)
        public string? SearchString { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public List<ProductReview>? ProductReviews { get; set; }
        public List<Favourite>? Favourites { get; set; }
    }
}
