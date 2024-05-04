using Api.Models;

namespace Api.DTO
{
<<<<<<< HEAD
    public class OrderDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public CustomerDtoLite? Customer { get; set; }
        public string? Status { get; set; }
        public bool? IsDelivered { get; set; }
        public string? Type { get; set; }
        public string? Instruction { get; set; }
        public string? Order_Id { get; set; }
        public double TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public List<OrderItemDto>? OrderItems { get; set; }
    }

    public class OrderDtoLite
    {
        public int Id { get; set; }
        public string? Status { get; set; }
        public bool? IsDelivered { get; set; }
        public string? Type { get; set;}
        public string? Instruction { get; set; }
        public string? Order_Id { get; set; }
        public double? TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class OrderDtoLiteB
    {
        public int Id { get; set; }
        public string? Status { get; set; }
        public bool? IsDelivered { get; set; }
        public string? Type { get; set;}
        public string? Instruction { get; set; }
        public string? Order_Id { get; set; }
        public double? TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public int? Customer_Id { get; set; }
        public CustomerDtoLite? Customer { get; set; }
    }

    public class SingleOrderDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public CustomerDtoLite? Customer { get; set; }
        public string? Status { get; set; }
        public bool? IsDelivered { get; set; }
        public string? Type { get; set; }
        public string? Instruction { get; set; }
        public string? Order_Id { get; set; }
        public double? TotalAmount { get; set; }
        public double? DeliveryFee { get; set; }
        public string? PaymentChannel { get; set; }
        public AddressDtoLite? DeliveryAddress { get; set; }
        public AddressDtoLite? PickUpAddress { get; set; }
        public List<LogisticDto>? Logistics { get; set; }
        public RiderDtoLite? Rider { get; set; }
        
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 
        public List<OrderItemDto>? OrderItems { get; set; }
=======
    public class OrderDTO
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

    public class OrderDTOLite
    {
        public int Id { get; set; }
        public int Customer_Id { get; set; }
        public Customer? Customer { get; set; }
        public bool? Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    }
}
