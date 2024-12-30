using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTO
{
    public class NotificationRequest
    {
        public string? Token { get; set;  }
        public string? Topic { get; set; }
        public string? Title { get; set; }
        public string? Body { get; set; }

    }
}