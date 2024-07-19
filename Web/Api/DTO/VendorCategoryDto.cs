using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTO
{
    public class VendorCategoryDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? IconUrl { get; set; }
        public List<VendorDtoLite>? Vendors { get; set; }
    }

    public class VendorCategoryDtoLite
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? IconUrl { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class CreateVendorCategoryDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? IconUrl { get; set; }
        public IFormFile? Icon { get; set; }
    }
}