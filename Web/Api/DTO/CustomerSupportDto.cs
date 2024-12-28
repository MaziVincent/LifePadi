using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTO
{
    public class CustomerSupportDto
    {
        public int Id { get; set; }
        public string? Subject { get; set; }
        public string? Message { get; set; }
        public int CustomerId { get; set; }
        public CustomerDtoLite? Customer { get; set; }
    }
}