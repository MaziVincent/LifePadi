using Api.Models;

namespace Api.DTO
{
    public class CategoryDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<ProductDtoLite>? Products { get; set; }
    }

    public class CategoryDtoLite
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
