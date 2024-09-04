using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class Withdrawal
    {
        public int Id { get; set; }
        public double Amount { get; set; }
        public int WalletId { get; set; }
        public Wallet? Wallet { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
