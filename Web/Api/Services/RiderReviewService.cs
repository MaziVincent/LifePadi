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
    public class RiderReviewService : BaseReviewService<RiderReview, RiderReviewDto>
    {
        public RiderReviewService(IUnitOfWork unitOfWork, IMapper mapper)
            : base(unitOfWork, mapper)
        {
        }

        protected override Expression<Func<RiderReview, bool>> GetObjectFilterExpression(int objectId)
        {
            return rr => rr.RiderId == objectId;
        }

        protected override Expression<Func<RiderReview, DateTime>> GetCreatedAtSelector()
        {
            return rr => rr.CreatedAt;
        }

        protected override Expression<Func<RiderReview, double>> GetRatingSelector()
        {
            return rr => rr.Rating;
        }

        protected override string GetIncludeProperties()
        {
            return "Customer,Rider";
        }

        protected override string GetEntityName()
        {
            return "Rider";
        }

        protected override void SetUpdatedAt(RiderReview entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
        }

        protected override async Task ValidateUniqueReview(RiderReviewDto reviewDto)
        {
            var existingReview = await _repository.GetFirstOrDefaultAsync(
                rr => rr.CustomerId == reviewDto.CustomerId && rr.RiderId == reviewDto.RiderId
            );

            if (existingReview != null)
            {
                throw new Exceptions.ServiceException("You have already reviewed this rider");
            }
        }

        // Additional rider-specific methods
        public async Task<List<RiderReviewDto>> GetReviewsByCustomer(int customerId)
        {
            try
            {
                var reviews = await _repository.GetAsync(
                    filter: rr => rr.CustomerId == customerId,
                    orderBy: q => q.OrderByDescending(rr => rr.CreatedAt),
                    includeProperties: GetIncludeProperties()
                );

                return _mapper.Map<List<RiderReviewDto>>(reviews);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error retrieving customer reviews: {ex.Message}");
            }
        }

        public async Task<object> GetRiderPerformanceStats(int riderId)
        {
            try
            {
                var reviews = await _repository.GetAsync(filter: rr => rr.RiderId == riderId);

                if (!reviews.Any())
                {
                    return new
                    {
                        totalReviews = 0,
                        averageRating = 0.0,
                        ratingBreakdown = new Dictionary<int, int>(),
                        performanceLevel = "No reviews yet"
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

                var averageRating = Math.Round(reviews.Average(r => r.Rating), 1);
                var performanceLevel = GetPerformanceLevel(averageRating);

                return new
                {
                    totalReviews = reviews.Count(),
                    averageRating = averageRating,
                    ratingBreakdown = ratingBreakdown.OrderByDescending(kvp => kvp.Key),
                    performanceLevel = performanceLevel
                };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error getting rider performance stats: {ex.Message}");
            }
        }

        private string GetPerformanceLevel(double averageRating)
        {
            return averageRating switch
            {
                >= 4.5 => "Excellent",
                >= 4.0 => "Very Good",
                >= 3.5 => "Good",
                >= 3.0 => "Average",
                >= 2.0 => "Below Average",
                _ => "Poor"
            };
        }
    }
}