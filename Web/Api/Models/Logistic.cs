using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class Logistic
    {
        public int Id { get; set; }
        public string? SenderName { get; set; }
        public string? SenderPhone { get; set; }
        public string? SenderAddressOld { get; set; }
        public int? SenderAddressId  {get; set;}
        public Address? SenderAddress {get; set;}
        public string? ReceiverName { get; set; }
        public string? ReceiverPhone { get; set; }
        public string? ReceiverAddressOld { get; set; }
        public int? RecieverAddressId {get; set;}
        public Address? RecieverAddress {get; set;}
        public string? Item { get; set; }
        public string? ItemDescription { get; set; }
        public double? ItemWeight { get; set; }
        public bool? IsFragile {get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public string? TrackingNumber { get; set; }
        public string? Status { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
