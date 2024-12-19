using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public User? Sender { get; set; }
        public int RecipientId { get; set; }
        public User? Recipient { get; set; }
        public string? Content { get; set; }
        public bool IsRead { get; set; } = false;
        public bool IsDelivered { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}