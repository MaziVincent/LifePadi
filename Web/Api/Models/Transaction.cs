using System.Numerics;

namespace Api.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public BigInteger PaymentId { get; set; }
        public string? TransactionRef { get; set; }
        public double TotalAmount { get; set; }
        public double AmountPaid { get; set; }  
        public string? Status { get; set; }
        public int? VoucherId { get; set; }
        public Voucher? Voucher { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public DateTime? PaidAt { get; set; }
        public string? PaymentChannel {get; set;}
        public double? DeliveryFee {get; set;}
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
