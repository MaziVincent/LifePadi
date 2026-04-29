namespace Api.Models
{
    /// <summary>
    /// An additive optional add-on for a product (e.g. +Cheese, +Bacon).
    /// Multiple extras may be selected per order item; their prices stack
    /// on top of the base/variant price.
    /// </summary>
    public class ProductExtra
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double Price { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
