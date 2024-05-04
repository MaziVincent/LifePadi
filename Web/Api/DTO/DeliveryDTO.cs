using Api.Models;

namespace Api.DTO
{
<<<<<<< HEAD
    public class DeliveryDto
    {
        public int Id { get; set; }
        public int? PickupAddressId { get; set; }
        public AddressDto? PickUpAddress {get; set;}
        public string? PickupType { get; set; }
        public double DeliveryFee { get; set; }
        public string? Status { get; set; }
        public int OrderId { get; set; }
        public OrderDto? Order { get; set; }
        public int? RiderId { get; set; }
        public RiderDtoLite? Rider { get; set; }
        public int? DeliveryAddressId { get; set; }
        public AddressDto? DeliveryAddress { get; set; }
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

=======
    public class DeliveryDTO
    {
        public int Id { get; set; }
        public string? PickupAdress { get; set; }
        public string? PickupType { get; set; }
        public Double DeliveryFee { get; set; }
        public bool? Status { get; set; }
        public int Order_Id { get; set; }
        public Order? Order { get; set; }
        public int Rider_Id { get; set; }
        public Rider? Rider { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }

    public class DeliveryDTOLite
    {
        public int Id { get; set; }
        public string? PickupAdress { get; set; }
        public string? PickupType { get; set; }
        public Double DeliveryFee { get; set; }
        public bool? Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    }
}
