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
        public Task<List<ProductReviewDto>> allAsync();
        public Task<ProductReviewDto> findAsync(int id);
        public Task<ProductReviewDto> createAsync(ProductReviewDto productReviewDto);
        public Task<ProductReviewDto> updateAsync(int id, ProductReviewDto productReviewDto);
        public Task<string> deleteAsync(int id);
        public Task<List<ProductReviewDto>> allByProductAsync(int productId);
        public Task<double> averageRating(int productId);
    }
}
