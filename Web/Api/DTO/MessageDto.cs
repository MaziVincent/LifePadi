using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Models;

namespace Api.DTO
{
    public class MessageDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public UserDtoLiteMessage? Sender { get; set; }
        public int RecipientId { get; set; }
        public UserDtoLiteMessage? Recipient { get; set; }
        public string? Content { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class RegisterMessageUser
    {
        public string? Email { get; set; }
        public string? ConnectionId { get; set; }
    }
}