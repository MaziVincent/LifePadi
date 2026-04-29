namespace Api.Models
{
    /// <summary>
    /// A mutually-exclusive choice that replaces a product's base price
    /// (e.g. Small / Medium / Large for a pizza).
    /// </summary>
    public class ProductVariant
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double Price { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public bool IsDefault { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
