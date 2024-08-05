using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using API.DTO;

namespace Api.Interfaces
{
    public interface IProductReview
    {
        public Task<PageList<ProductReviewDto>> allAsync(SearchPaging props);
    }
}