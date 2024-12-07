using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTO
{
    public class NotificationRequest
    {
        public string? Title { get; set; }
        public string? Message { get; set; }

    }
}