using Api.Models;

namespace Api.DTO
{
<<<<<<< HEAD
<<<<<<< HEAD
    public class OrderDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public CustomerDtoLite? Customer { get; set; }
        public string? Status { get; set; }
        public bool? IsDelivered { get; set; }
        public string? Type { get; set; }
<<<<<<< HEAD
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
=======
    public class OrderDto
>>>>>>> 836ec36 (changed all DTO to Dto)
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public CustomerDtoLite? Customer { get; set; }
        public string? Status { get; set; }
        public bool? IsDelivered { get; set; }
=======
>>>>>>> 52db56c (made some changes in the delivery and order)
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
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class OrderDtoLiteB
    {
        public int Id { get; set; }
        public string? Status { get; set; }
        public bool? IsDelivered { get; set; }
        public string? Type { get; set;}
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public int? Customer_Id { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
        public Customer? Customer { get; set; }
        public bool? Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public CustomerDTOLite? Customer { get; set; }
<<<<<<< HEAD
        public int? RiderId { get; set; }
        public RiderDTOLite? Rider { get; set; }
>>>>>>> 28d4101 (finished with rider and order)
=======
>>>>>>> 4641615 (finished with delivery service and controller)
=======
        public CustomerDtoLite? Customer { get; set; }
>>>>>>> 836ec36 (changed all DTO to Dto)
    }
}
