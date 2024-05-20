namespace Api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public string? Status { get; set; }
        public bool? IsDelivered { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public int? RiderId { get; set; }
        public Rider? Rider { get; set; }
        public List<OrderItem>? OrderItems { get; set; }

    }
}
