using Api.Models;

namespace Api.DTO
{
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public Double Amount { get; set; }
        public Double TotalAmount { get; set; }
        public int ProductId { get; set; }
        public ProductDtoLite? Product { get; set; }
        public int OrderId { get; set; }
        public OrderDtoLite? Order { get; set; }
    }

    public class OrderItemDtoLite
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public Double Amount { get; set; }
        public Double TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
