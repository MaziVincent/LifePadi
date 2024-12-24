using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace Api.Models
{
    public class Wallet
    {
        public int Id { get; set; }
        public double Balance { get; set; } = 0.0;
        public double InitialBalance { get; set; } = 0.0;
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
        public List<Deposite>? Deposites { get; set; }
        public List<Withdrawal>? Withdrawals { get; set; }

    }

   
}