using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class VendorReview : Review
    {
        public int VendorId { get; set; }
        public Vendor? Vendor { get; set; }
    }
}