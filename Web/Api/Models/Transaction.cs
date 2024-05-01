using System.Numerics;

namespace Api.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public BigInteger PaymentId { get; set; }
        public string? TransactionRef { get; set; }
        public Double TotalAmount { get; set; }
        public bool? Status { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
