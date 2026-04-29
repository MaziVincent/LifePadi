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
        public string? Tag { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public int VendorId { get; set; }
        public Vendor? Vendor { get; set; }
        public string? SearchString { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public List<ProductReview>? ProductReviews { get; set; }
        public List<Favourite>? Favourites { get; set; }
        public List<ProductVariant>? Variants { get; set; }
        public List<ProductExtra>? Extras { get; set; }
    }
}
