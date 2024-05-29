using Api.Models;

namespace Api.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public CustomerDTOLite? Customer { get; set; }
        public string? Status { get; set; }
        public bool? IsDelivered { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public List<OrderItemDTOLite>? OrderItems { get; set; }
    }

    public class OrderDTOLite
    {
        public int Id { get; set; }
        public string? Status { get; set; }
        public bool? IsDelivered { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class OrderDTOLiteB
    {
        public int Id { get; set; }
        public string? Status { get; set; }
        public bool? IsDelivered { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public int? Customer_Id { get; set; }
        public CustomerDTOLite? Customer { get; set; }
    }
}
