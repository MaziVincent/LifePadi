namespace Api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int Customer_Id { get; set; }
        public Customer? Customer { get; set; }
        public bool? Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public int Rider_Id { get; set; }
        public Rider? Rider { get; set; }
        public List<OrderItem>? OrderItems { get; set; }

    }
}
