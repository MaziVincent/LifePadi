using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.DTO
{
    public class LogisticDto
    {
        
        public int Id { get; set; }
        public string? SenderName { get; set; }
        public string? SenderPhone { get; set; }
        public string? SenderAddress { get; set; }
        public int? SenderAddressId {get; set;}
        public AddressDto? SenderAddressModel {get; set;}
        public string? ReceiverName { get; set; }
        public string? ReceiverPhone { get; set; }
        public string? ReceiverAddress { get; set; }
         public int? RecieverAddressId {get; set;}
        public AddressDto? RecieverAddressModel {get; set;}
        public string? Item { get; set; }
        public string? ItemDescription { get; set; }
        public double? ItemWeight { get; set; }
        public bool? IsFragile {get; set; }
        public int OrderId { get; set; }
        public OrderDto? Order { get; set; }
        public string? TrackingNumber { get; set; }
        public string? Status { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
