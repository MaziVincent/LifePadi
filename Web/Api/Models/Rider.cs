namespace Api.Models
{
    public class Rider: User
    {
        public Rider(): base() { }
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public string? EmergencyContact { get; set; }
        public bool? IsVerified { get; set; }
        public List<Delivery>? Deliveries { get; set; }
        public List<RiderReview>? RiderReviews { get; set; }
    }
}
