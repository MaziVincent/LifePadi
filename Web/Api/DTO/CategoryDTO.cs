using Api.Models;

namespace Api.DTO
{
    public class CategoryDTO
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<ProductDTOLite>? Products { get; set; }
    }

    public class CategoryDTOLite
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
