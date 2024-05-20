namespace Api.Models
{
    public class Rider: User
    {
        public Rider(): base() { }
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public string? EmergencyContact { get; set; }
<<<<<<< HEAD
        public bool? IsVerified { get; set; }
        public List<Delivery>? Deliveries { get; set; }
        public List<RiderReview>? RiderReviews { get; set; }
=======
        public bool? IsActive { get; set; }
        public bool? IsVerified { get; set; }
        public List<Order>? Orders { get; set; }
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    }
}
