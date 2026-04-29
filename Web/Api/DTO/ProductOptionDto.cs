namespace Api.DTO
{
    public class ProductVariantDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double Price { get; set; }
        public int ProductId { get; set; }
        public bool IsDefault { get; set; }
    }

    public class CreateProductVariantDto
    {
        public string? Name { get; set; }
        public double Price { get; set; }
        public int ProductId { get; set; }
        public bool IsDefault { get; set; }
    }

    public class ProductExtraDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double Price { get; set; }
        public int ProductId { get; set; }
    }

    public class CreateProductExtraDto
    {
        public string? Name { get; set; }
        public double Price { get; set; }
        public int ProductId { get; set; }
    }
}
