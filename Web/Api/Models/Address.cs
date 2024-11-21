namespace Api.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Town { get; set;}
        public string? City { get; set; }
        public string? LocalGovt { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public bool? DefaultAddress {get; set;} = false;
        public int UserId { get; set; }
        public User? User { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set ; } = DateTime.UtcNow;
    }
}
