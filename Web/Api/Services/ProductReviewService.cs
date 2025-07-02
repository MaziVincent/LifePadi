using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Api.Services
{
    public class ProductReviewService : BaseReviewService<ProductReview, ProductReviewDto>
    {
        public ProductReviewService(IUnitOfWork unitOfWork, IMapper mapper)
            : base(unitOfWork, mapper)
        {
        }

        protected override Expression<Func<ProductReview, bool>> GetObjectFilterExpression(int objectId)
        {
            return pr => pr.ProductId == objectId;
        }

        protected override Expression<Func<ProductReview, DateTime>> GetCreatedAtSelector()
        {
            return pr => pr.CreatedAt;
        }

        protected override Expression<Func<ProductReview, double>> GetRatingSelector()
        {
            return pr => pr.Rating;
        }

        protected override string GetIncludeProperties()
        {
            return "Customer,Product";
        }

        protected override string GetEntityName()
        {
            return "Product";
        }

        protected override void SetUpdatedAt(ProductReview entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
        }

        protected override async Task ValidateUniqueReview(ProductReviewDto reviewDto)
        {
            var existingReview = await _repository.GetFirstOrDefaultAsync(
                pr => pr.CustomerId == reviewDto.CustomerId && pr.ProductId == reviewDto.ProductId
            );

            if (existingReview != null)
            {
                throw new Exceptions.ServiceException("You have already reviewed this product");
            }
        }

        // Additional product-specific methods
        public async Task<List<ProductReviewDto>> GetReviewsByCustomer(int customerId)
        {
            try
            {
                var reviews = await _repository.GetAsync(
                    filter: pr => pr.CustomerId == customerId,
                    orderBy: q => q.OrderByDescending(pr => pr.CreatedAt),
                    includeProperties: GetIncludeProperties()
                );

                return _mapper.Map<List<ProductReviewDto>>(reviews);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error retrieving customer reviews: {ex.Message}");
            }
        }

        public async Task<object> GetProductRatingBreakdown(int productId)
        {
            try
            {
                var reviews = await _repository.GetAsync(filter: pr => pr.ProductId == productId);

                if (!reviews.Any())
                {
                    return new
                    {
                        totalReviews = 0,
                        averageRating = 0.0,
                        ratingBreakdown = new Dictionary<int, int>()
                    };
                }

                var ratingBreakdown = reviews
                    .GroupBy(r => (int)Math.Round(r.Rating))
                    .ToDictionary(g => g.Key, g => g.Count());

                // Ensure all ratings 1-5 are represented
                for (int i = 1; i <= 5; i++)
                {
                    if (!ratingBreakdown.ContainsKey(i))
                        ratingBreakdown[i] = 0;
                }

                return new
                {
                    totalReviews = reviews.Count(),
                    averageRating = Math.Round(reviews.Average(r => r.Rating), 1),
                    ratingBreakdown = ratingBreakdown.OrderByDescending(kvp => kvp.Key)
                };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error getting rating breakdown: {ex.Message}");
            }
        }
    }
}