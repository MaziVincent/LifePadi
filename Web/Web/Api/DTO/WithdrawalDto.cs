using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using Api.Models;

namespace Api.DTO
{
    public class WithdrawalDto
    {
        public int Id { get; set; }
        public Double Amount { get; set; }
        public int WalletId { get; set; }
        public Wallet? Wallet { get; set; }
        public string? Status { get; set; }
        public string? ReferenceId { get; set; }
        public string? PaymentMethod { get; set; }
        public int OrderId { get; set; }
        public string? VoucherId { get; set; }
        public Double DeliveryFee { get; set; }
        public Double TotalAmount { get; set; }
        public BigInteger? TransactionId { get; set; }
        public string? Type { get; set; }  //transfer, withdrawal
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}