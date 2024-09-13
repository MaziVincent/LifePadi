using System;
using System.Collections.Generic;
using System.Linq;
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
}