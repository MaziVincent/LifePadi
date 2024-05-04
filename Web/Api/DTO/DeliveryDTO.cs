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
    }
}
