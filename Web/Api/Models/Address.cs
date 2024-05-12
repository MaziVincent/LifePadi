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
<<<<<<< HEAD
        public double? Longitude { get; set; }
        public double? Latitude { get; set; }
        public bool? DefaultAddress {get; set;} = false;
        public bool? IsActive { get; set; } = true;
        public int UserId { get; set; }
        public User? User { get; set; }

=======
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
>>>>>>> ee48634 (done with service, category and product controllers.)
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set ; } = DateTime.UtcNow;
    }
}
