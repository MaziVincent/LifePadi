namespace Api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public string? Status { get; set; }
        public bool? IsDelivered { get; set; }
        public string? SearchString { get; set; }
        public string? Type { get; set; } = "Normal";
        public string? Instruction { get; set; }
        public string? Order_Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public double? TotalAmount { get; set; } = 0;
        public string? PaymentMethod { get; set; } = "PayStack";
        public List<OrderItem>? OrderItems { get; set; }
        public List<Logistic>? Logistics { get; set; }

    }
}
