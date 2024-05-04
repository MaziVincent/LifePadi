using Api.Models;

namespace Api.DTO
{
    public class RiderDTO
    {
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public string? EmergencyContact { get; set; }
        public bool? IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<Order>? Orders { get; set; }
    }

    public class RiderDTOLite
    {
        public string? IdentityType { get; set; }
        public string? IdentityNumber { get; set; }
        public string? IdentityImgUrl { get; set; }
        public string? EmergencyContact { get; set; }
        public bool? IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
