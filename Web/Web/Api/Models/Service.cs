namespace Api.Models
{
    public class Service
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public bool? IsActive { get; set; }
        public string? Description { get; set; }
        public string? ServiceIconUrl { get; set; }
        public string? SearchString {get; set;}
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public List<Vendor>? Vendors { get; set; }
    }
}
