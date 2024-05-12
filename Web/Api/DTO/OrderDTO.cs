using Api.Models;

namespace Api.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public CustomerDTOLite? Customer { get; set; }
        public bool? Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public int? RiderId { get; set; }
        public RiderDTOLite? Rider { get; set; }
        public List<OrderItemDTOLite>? OrderItems { get; set; }
    }

    public class OrderDTOLite
    {
        public int Id { get; set; }
        public int? Customer_Id { get; set; }
        public Customer? Customer { get; set; }
        public bool? Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
