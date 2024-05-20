<<<<<<< HEAD
﻿using Api.Models;

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
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? DiscountPercentage { get; set; }
        public double? DiscountAmount { get; set; }
        public string? Status { get; set; }
        public CustomerVoucher? CustomerVouchers { get; set; }
    }

    public class VoucherDtoLite
=======
﻿namespace Api.DTO
{
    public class VoucherDTO
>>>>>>> 28d4101 (finished with rider and order)
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Code { get; set; }
        public string? Type { get; set; }
        public bool? IsActive { get; set; }
        public int? TotalNumberAvailable { get; set; }
<<<<<<< HEAD
        public int? TotalNumberUsed { get; set; } = 0;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? DiscountPercentage { get; set; }
=======
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? DiscountPercentage { get; set; }
        public string? Status { get; set; }
    }

    public class VoucherDTOLite
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Code { get; set; }
        public string? Type { get; set; }
        public bool? IsActive { get; set; }
        public int? TotalNumberAvailable { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? DiscountPercentage { get; set; }
>>>>>>> 28d4101 (finished with rider and order)
        public string? Status { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
