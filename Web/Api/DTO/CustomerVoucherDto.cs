using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTO
{
    public class CustomerVoucherDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public CustomerDtoLite? Customer { get; set; }
        public int VoucherId { get; set; }
        public VoucherDto? Voucher { get; set; }
        public int TransactionId { get; set; }
        public TransactionDto? Transaction { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}