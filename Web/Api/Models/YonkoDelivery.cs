using Api.Models;

namespace Api.Models
{
    public class YonkoDelivery
    {
        public int Id { get; set; }
        public string? PickUpAddress {get; set;}
        public string? DeliveryAddress { get; set; }
        public string? PickupType { get; set; } = "Normal";
        public double DeliveryFee { get; set; }
        public string? Status { get; set; }
        public string? CustomerFirstName { get; set; }
        public string? CustomerLastName { get; set; }
        public string? CustomerEmail { get; set; }
        public string? PhoneNumber { get; set; } 
        public int? RiderId { get; set; }
        public Rider? Rider { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
