using Api.Models;
using System.Numerics;

namespace Api.DTO
{
    public class TransactionDTO
    {
        public int Id { get; set; }
        public BigInteger PaymentId { get; set; }
        public string? TransactionRef { get; set; }
        public Double TotalAmount { get; set; }
        public bool? Status { get; set; }
        public int OrderId { get; set; }
        public OrderDTOLite? Order { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class TransactionDTOLite
    {
        public int Id { get; set; }
        public BigInteger PaymentId { get; set; }
        public string? TransactionRef { get; set; }
        public Double TotalAmount { get; set; }
        public bool? Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
