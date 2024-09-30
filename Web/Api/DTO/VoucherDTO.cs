using Api.Models;

namespace Api.DTO
{
    public class VoucherDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Code { get; set; }
        public string? Type { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsExpired { get; set; }
        public int? TotalNumberAvailable { get; set; }
        public int? TotalNumberUsed { get; set; } = 0;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? DiscountPercentage { get; set; }
        public string? Status { get; set; }
        public CustomerVoucher? CustomerVouchers { get; set; }
    }

    public class VoucherDtoLite
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Code { get; set; }
        public string? Type { get; set; }
        public bool? IsActive { get; set; }
        public int? TotalNumberAvailable { get; set; }
        public int? TotalNumberUsed { get; set; } = 0;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? DiscountPercentage { get; set; }
        public string? Status { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
