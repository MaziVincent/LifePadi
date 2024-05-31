using Api.Models;

namespace Api.DTO
{
<<<<<<< HEAD
    public class ServiceDto
=======
    public class ServiceDTO
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ServiceIconUrl { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        public IFormFile? ServiceIcon { get; set; }
        public List<VendorDtoLite>? Vendors { get; set; }
=======
        public IFormFile? ServiceIcon { get; set; }
        public List<ProductDTOLite>? Products { get; set; }
>>>>>>> c824428 (added creating serviceIcon while creating the service)
        public bool? IsActive { get; set; }
    }

    public class ServiceDtoLite
=======
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public List<ProductDTO>? Products { get; set; }
=======
        public List<ProductDTOLite>? Products { get; set; }
        public bool? IsActive { get; set; }
>>>>>>> ee48634 (done with service, category and product controllers.)
    }

    public class ServiceDTOLite
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? ServiceIconUrl { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
        public bool? IsActive { get; set; }
=======
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
        public bool? IsActive { get; set; }
>>>>>>> ee48634 (done with service, category and product controllers.)
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
