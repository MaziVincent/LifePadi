using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace Api.Models
{
    public class Withdrawal
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public int WalletId { get; set; }
        public Wallet? Wallet { get; set; }
        public string? Status { get; set; }
        public string? ReferenceId { get; set; }
        public string? PaymentMethod { get; set; }
        public BigInteger TransactionId { get; set; }
        public string? Type { get; set; }  //transfer, withdrawal
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
