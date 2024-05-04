using Api.Models;

namespace Api.DTO
{
    public class OrderItemDTO
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public Double Amount { get; set; }
        public int Product_Id { get; set; }
        public Product? Product { get; set; }
        public int Order_Id { get; set; }
        public Order? Order { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class OrderItemDTOLite
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public Double Amount { get; set; }
        public int Product_Id { get; set; }
        public Product? Product { get; set; }
        public int Order_Id { get; set; }
        public Order? Order { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
