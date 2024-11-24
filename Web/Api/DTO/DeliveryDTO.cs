using Api.Models;

namespace Api.DTO
{
    public class DeliveryDto
    {
        public int Id { get; set; }
        public string? PickupAddress { get; set; }
        public int? PickupAddressId { get; set; }
        public AddressDto? PickUpAddress {get; set;}
        public string? PickupType { get; set; }
        public double DeliveryFee { get; set; }
        public string? Status { get; set; }
        public int OrderId { get; set; }
        public OrderDto? Order { get; set; }
        public int? RiderId { get; set; }
        public RiderDtoLite? Rider { get; set; }
        public string? DeliveryAddress { get; set;}
        public int? DeliveryAddressId { get; set; }
        public AddressDto? DelAddress { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
//Delivery Dto Lite

    public class DeliveryDtoLite
    {
        public int Id { get; set; }
        public string? PickupAddress { get; set; }
        public string? PickupType { get; set; }
        public double DeliveryFee { get; set; }
        public string? Status { get; set; }
        public string? DeliveryAddress { get; set;}
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class CreateDeliveryDto
    {
        public int Id { get; set; }
        public string? PickupAddress { get; set; }
        public string? PickupType { get; set; }
        public double DeliveryFee { get; set; }
        public int OrderId { get; set; }
        public string? DeliveryAddress { get; set; }

    }
}
