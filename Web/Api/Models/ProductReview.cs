using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class ProductReview : Review
    {
        public ProductReview() : base() { }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}