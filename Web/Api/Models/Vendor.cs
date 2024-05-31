namespace Api.Models
{
    public class Vendor: User
    {
        public Vendor(): base() { }
        public string? Name { get; set; }
<<<<<<< HEAD
=======
        public string? VendorType { get; set; }
>>>>>>> ee48634 (done with service, category and product controllers.)
        public string? VendorImgUrl { get; set; }
<<<<<<< HEAD
        public string? Tag { get; set; }
        public int? ServiceId { get; set; }
        public Service? Service { get; set; }
        public int? VendorCategoryId { get; set; }
        public string? TimeTakesToPurchase { get; set; }
        public VendorCategory? VendorCategory { get; set; }
        public string? OpeningHours { get; set; }
        public string? ClosingHours { get; set; }
=======
        public int? ServiceId { get; set; }
        public Service? Service { get; set; }
>>>>>>> 58020e7 (removed service from product)
        public List<Product>? Products { get; set; }
        public List<VendorReview>? VendorReviews { get; set; }
    }
}
