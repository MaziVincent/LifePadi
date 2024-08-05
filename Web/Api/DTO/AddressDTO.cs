using Api.Models;

namespace Api.DTO
{
    public class AddressDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Town { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
        public int UserId { get; set; }
        public UserDtoLite? User { get; set; }
    }

    public class AddressDtoLite
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public string? Town { get; set; }
        public string? City { get; set; }
        public string? LocalGovt { get; set; }
        public string? State { get; set; }
        public string? PostalCode { get; set; }
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int CustomerId { get; set;}
    }
}
