using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;

namespace Api.DTO
{
    public class SearchDTO
    {
        public List<VendorCategoryDto>? VendorCategories { get; set; }
        public List<CategoryDtoLite>? Categories { get; set; }
        public List<ProductDtoLite>? Products { get; set; }
        public List<VendorDtoLite>? Vendors { get; set; }
        public List<ServiceDtoLite>? Services { get; set; }

        // Pagination Metadata
        public int? CurrentPage { get; set; }
        public int? TotalPages { get; set; }
        public int? TotalCount { get; set; }
        public bool? HasNext { get; set; }
        public bool? HasPrevious { get; set; }
    }
}