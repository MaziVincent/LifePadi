namespace Api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public string? Status { get; set; }
        public bool? IsDelivered { get; set; }
<<<<<<< HEAD
        public string? SearchString { get; set; }
        public string? Type { get; set; } = "Normal";
        public string? Instruction { get; set; }
        public string? Order_Id { get; set; }
=======
>>>>>>> 28d4101 (finished with rider and order)
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
<<<<<<< HEAD
<<<<<<< HEAD
        public double? TotalAmount { get; set; } = 0;
        public string? PaymentChannel { get; set; }
=======
        public int? RiderId { get; set; }
        public Rider? Rider { get; set; }
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        
>>>>>>> 4641615 (finished with delivery service and controller)
        public List<OrderItem>? OrderItems { get; set; }
        public List<Logistic>? Logistics { get; set; }

    }
}
