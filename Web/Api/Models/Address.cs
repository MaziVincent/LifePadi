namespace Api.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Town { get; set;}
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set ; }
    }
}
