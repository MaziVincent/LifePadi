using Api.Models;

namespace Api.DTO
{
    public class ServiceDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ServiceIconUrl { get; set; }
        public IFormFile? ServiceIcon { get; set; }
        public List<VendorDtoLite>? Vendors { get; set; }
        public bool? IsActive { get; set; }
    }

    public class ServiceDtoLite
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ServiceIconUrl { get; set; }
        public bool? IsActive { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
