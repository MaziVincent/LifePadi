using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Api.Validation;

namespace Api.DTO
{
    public class VendorReviewDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Rating is required")]
        [Range(1.0, 5.0, ErrorMessage = "Rating must be between 1 and 5")]
        public double Rating { get; set; }

        [StringLength(1000, ErrorMessage = "Review body cannot exceed 1000 characters")]
        [NoHtmlValidation(ErrorMessage = "Review body cannot contain HTML or script content")]
        public string? Body { get; set; }

        [Required(ErrorMessage = "Customer ID is required")]
        public int CustomerId { get; set; }
        public CustomerDtoLite? Customer { get; set; }

        [Required(ErrorMessage = "Vendor ID is required")]
        public int VendorId { get; set; }
        public VendorDtoLite? Vendor { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}