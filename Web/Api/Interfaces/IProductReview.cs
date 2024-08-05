using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Services;

namespace Api.Interfaces
{
    public interface IProductReview
    {
        public Task<PagedList<ProductReviewDto>> allAsync(SearchPaging props);
    }
}