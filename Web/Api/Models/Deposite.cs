using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace Api.Models
{
    public class Deposite
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public int WalletId { get; set; }
        public Wallet? Wallet { get; set; }
        public string? Status { get; set; }
        public string? ReferenceId { get; set; }
        public string? PaymentMethod { get; set; }
        public BigInteger transactionId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}