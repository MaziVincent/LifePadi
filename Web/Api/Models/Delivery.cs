using Api.Models;

namespace Api.Models
{
    public class Delivery
    {
        public int Id { get; set; }
<<<<<<< HEAD
        
         public int? PickUpAddressId { get; set; }
        public Address? PickUpAddress {get; set;}
        
        public int? DeliveryAddressId { get; set; }
        public Address? DeliveryAddress { get; set; }
        
=======
        public string? PickupAddress { get; set; }
>>>>>>> 4641615 (finished with delivery service and controller)
        public string? PickupType { get; set; }
<<<<<<< HEAD
        public double DeliveryFee { get; set; }
        public string? Status { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public int? RiderId { get; set; }
=======
        public Double DeliveryFee { get; set; }
        public string? Status { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public int RiderId { get; set; }
>>>>>>> ee48634 (done with service, category and product controllers.)
        public Rider? Rider { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
