using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class CustomerSupport
    {
        public int Id { get; set; }
        public string? Subject { get; set; }
        public string? Message { get; set; }
        public int CustomerId { get; set; }
        public Customer? Customer { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}