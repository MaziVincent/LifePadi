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
        public BigInteger? TransactionId { get; set; }
        public string? Type { get; set; } = "Deposit";
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class InitiateDepositeDto
    {
        public double Amount { get; set; }
        public int WalletId { get; set; }
    }

    public class DepositeVerificationResponse
    {
        public bool status { get; set; }
        public string? message { get; set; }
        public DepositeVerificationData? data { get; set; }
    }

    public class DepositeVerificationData
    {
        public BigInteger id { get; set; }
        public string? reference { get; set; }
        public string? status { get; set; }
        public string? gateway_response { get; set; }
        public DateTime? paid_at { get; set; }
        public string? channel { get; set; }
        public string? currency { get; set; }
        public string? ip_address { get; set; }
        public int? amount { get; set; }
        public DepositeMetadata? metadata { get; set; }
    }

    public class DepositeMetadata
    {
        public double amount { get; set; }
        public int walletId { get; set; }
        public DateTime? createdAt { get; set; }
    }
}