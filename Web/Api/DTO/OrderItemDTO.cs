using Api.Models;

namespace Api.DTO
{
    public class OrderItemDTO
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public Double Amount { get; set; }
        public int ProductId { get; set; }
        public ProductDTOLite? Product { get; set; }
        public int OrderId { get; set; }
        public OrderDTOLite? Order { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class OrderItemDTOLite
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public Double Amount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
