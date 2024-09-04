using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace Api.DTO
{
    public class DepositeDto
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public int WalletId { get; set; }
        public WalletDto? Wallet { get; set; }
        public string? Status { get; set; }
        public string? ReferenceId { get; set; }
        public string? PaymentMethod { get; set; }
        public BigInteger transactionId { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}