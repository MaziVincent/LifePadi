using Api.Models;

namespace Api.DTO
{
    public class AddressDTO
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Town { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
        public int CustomerId { get; set; }
        public CustomerDTOLite? Customer { get; set; }
    }

    public class AddressDTOLite
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Town { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int CustomerId { get; set;}
    }
}
