using Api.Models;

namespace Api.DTO
{
<<<<<<< HEAD
<<<<<<< HEAD
    public class OrderItemDto
=======
    public class OrderItemDTO
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
    public class OrderItemDto
>>>>>>> 836ec36 (changed all DTO to Dto)
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public Double Amount { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        public Double TotalAmount { get; set; }
        public string? Name { get; set; }
        public double? Weight { get; set; }
        public string? Description { get; set; }
        public bool? IsFragile { get; set; }
        public int ProductId { get; set; }
        public ProductDtoLite? Product { get; set; }
        public int OrderId { get; set; }
        public OrderDtoLite? Order { get; set; }
    }

    public class OrderItemDtoLite
=======
        public int Product_Id { get; set; }
        public Product? Product { get; set; }
        public int Order_Id { get; set; }
        public Order? Order { get; set; }
=======
=======
        public Double TotalAmount { get; set; }
>>>>>>> 4641615 (finished with delivery service and controller)
        public int ProductId { get; set; }
        public ProductDtoLite? Product { get; set; }
        public int OrderId { get; set; }
<<<<<<< HEAD
        public OrderDTOLite? Order { get; set; }
<<<<<<< HEAD
>>>>>>> ee48634 (done with service, category and product controllers.)
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
=======
>>>>>>> 4641615 (finished with delivery service and controller)
    }

    public class OrderItemDTOLite
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public OrderDtoLite? Order { get; set; }
    }

    public class OrderItemDtoLite
>>>>>>> 836ec36 (changed all DTO to Dto)
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public Double Amount { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        public Double TotalAmount { get; set; }
        public string? Name { get; set; }
        public double? Weight { get; set; }
        public string? Description { get; set; }
        public bool? IsFragile { get; set; }
<<<<<<< HEAD
=======
        public int Product_Id { get; set; }
        public Product? Product { get; set; }
        public int Order_Id { get; set; }
        public Order? Order { get; set; }
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public Double TotalAmount { get; set; }
>>>>>>> 4641615 (finished with delivery service and controller)
=======
>>>>>>> 52db56c (made some changes in the delivery and order)
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
