using Api.Models;

namespace Api.Models
{
    public class Delivery
    {
        public int Id { get; set; }
        
         public int? PickUpAddressId { get; set; }
        public Address? PickUpAddress {get; set;}
        
        public int? DeliveryAddressId { get; set; }
        public Address? DelAddress { get; set; }
        
        public string? PickupType { get; set; }
        public double DeliveryFee { get; set; }
        public string? Status { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public int? RiderId { get; set; }
        public Rider? Rider { get; set; }
        public string? DeliveryAddress { get; set; }
        public string? PickupAddress { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
