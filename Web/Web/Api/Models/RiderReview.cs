using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class RiderReview : Review
    {
        public int RiderId { get; set; }
        public Rider? Rider { get; set; }
    }
}