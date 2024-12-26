using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace Api.DTO
{
    public class WalletDto
    {
        public int Id { get; set; }
        public double Balance { get; set; }
        public double InitialBalance { get; set; }
        public int CustomerId { get; set; }
        public CustomerDtoLite? Customer { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class WalletDtoLite
    {
        public int Id { get; set; }
        public double Balance { get; set; }
        public double InitialBalance { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class WalletTransaction
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public int WalletId { get; set; }
        public WalletDtoLite? Wallet { get; set; }
        public string? Status { get; set; }
        public string? ReferenceId { get; set; }
        public string? PaymentMethod { get; set; }
        public BigInteger TransactionId { get; set; }
        public string? Type { get; set; }  //transfer, withdrawal
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}