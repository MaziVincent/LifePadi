using Api.Models;

namespace Api.DTO
{
    public class DeliveryDTO
    {
        public int Id { get; set; }
        public string? PickupAdress { get; set; }
        public string? PickupType { get; set; }
        public Double DeliveryFee { get; set; }
        public bool? Status { get; set; }
        public int OrderId { get; set; }
        public OrderDTOLite? Order { get; set; }
        public int RiderId { get; set; }
        public RiderDTOLite? Rider { get; set; }
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
    }
}
