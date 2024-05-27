namespace Api.Models
{
    public class Voucher
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Code { get; set; }
        public string? Type { get; set; }
<<<<<<< HEAD
<<<<<<< HEAD
        public bool? IsActive { get; set; } = false;
        public bool? IsExpired { get; set; } = false;
        public int? TotalNumberAvailable { get; set; }
        public int? TotalNumberUsed { get; set; } = 0;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? DiscountPercentage { get; set; }
        public double? DiscountAmount { get; set; }
        public string? Status { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        public List<Transaction>? Transactions { get; set; }
        public List<CustomerVoucher>? CustomerVouchers { get; set; }
        public List<VoucherNotification>? voucherNotifications { get; set; }
=======
        public bool? IsActive { get; set; }
=======
        public bool? IsActive { get; set; } = false;
        public bool? IsExpired { get; set; } = false;
>>>>>>> 7f9ad44 (done with payment and voucher)
        public int? TotalNumberAvailable { get; set; }
        public int? TotalNumberUsed { get; set; } = 0;
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? DiscountPercentage { get; set; }
        public string? Status { get; set; }
<<<<<<< HEAD
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
>>>>>>> 28d4101 (finished with rider and order)
=======
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        public List<Transaction>? Transactions { get; set; }
>>>>>>> 7f9ad44 (done with payment and voucher)
    }
}
