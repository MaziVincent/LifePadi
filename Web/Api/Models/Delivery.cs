namespace Api.Models
{
    public class Delivery
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
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdateAt { get; set; } = DateTime.UtcNow;
    }
}
