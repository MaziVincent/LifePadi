using Api.Models;

namespace Api.DTO
{
    public class DeliveryDto
    {
        public int Id { get; set; }
        public string? PickupAddress { get; set; }
        public string? PickupType { get; set; }
        public Double DeliveryFee { get; set; }
        public string? Status { get; set; }
        public int OrderId { get; set; }
        public OrderDtoLite? Order { get; set; }
        public int? RiderId { get; set; }
        public RiderDtoLite? Rider { get; set; }
    }

    public class DeliveryDtoLite
    {
        public int Id { get; set; }
        public string? PickupAddress { get; set; }
        public string? PickupType { get; set; }
        public Double DeliveryFee { get; set; }
        public string? Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdateAt { get; set; }
    }

    public class CreateDeliveryDto
    {
        public int Id { get; set; }
        public string? PickupAddress { get; set; }
        public string? PickupType { get; set; }
        public Double DeliveryFee { get; set; }
        public int OrderId { get; set; }
    }
}
