using Api.Models;

namespace Api.DTO
{
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public Double Amount { get; set; }
        public Double TotalAmount { get; set; }
        public string? Name { get; set; }
        public double? Weight { get; set; }
        public string? Description { get; set; }
        public bool? IsFragile { get; set; }
        public int ProductId { get; set; }
        public ProductDtoLite? Product { get; set; }
        public int OrderId { get; set; }
        public OrderDtoLite? Order { get; set; }
        public int? SelectedVariantId { get; set; }
        public string? SelectedVariantName { get; set; }
        public double? SelectedVariantPrice { get; set; }
        public string? SelectedExtrasJson { get; set; }
    }

    public class OrderItemDtoLite
    {
        public int Id { get; set; }
        public int Quantity { get; set; }
        public Double Amount { get; set; }
        public Double TotalAmount { get; set; }
        public string? Name { get; set; }
        public double? Weight { get; set; }
        public string? Description { get; set; }
        public bool? IsFragile { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
