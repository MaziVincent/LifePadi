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
    public class VendorReviewService : BaseReviewService<VendorReview, VendorReviewDto>
    {
        public VendorReviewService(IUnitOfWork unitOfWork, IMapper mapper)
            : base(unitOfWork, mapper)
        {
        }

        protected override Expression<Func<VendorReview, bool>> GetObjectFilterExpression(int objectId)
        {
            return vr => vr.VendorId == objectId;
        }

        protected override Expression<Func<VendorReview, DateTime>> GetCreatedAtSelector()
        {
            return vr => vr.CreatedAt;
        }

        protected override Expression<Func<VendorReview, double>> GetRatingSelector()
        {
            return vr => vr.Rating;
        }

        protected override string GetIncludeProperties()
        {
            return "Customer,Vendor";
        }

        protected override string GetEntityName()
        {
            return "Vendor";
        }

        protected override void SetUpdatedAt(VendorReview entity)
        {
            entity.UpdatedAt = DateTime.UtcNow;
        }

        protected override async Task ValidateUniqueReview(VendorReviewDto reviewDto)
        {
            var existingReview = await _repository.GetFirstOrDefaultAsync(
                vr => vr.CustomerId == reviewDto.CustomerId && vr.VendorId == reviewDto.VendorId
            );

            if (existingReview != null)
            {
                throw new Exceptions.ServiceException("You have already reviewed this vendor");
            }
        }

        // Additional vendor-specific methods
        public async Task<List<VendorReviewDto>> GetReviewsByCustomer(int customerId)
        {
            try
            {
                var reviews = await _repository.GetAsync(
                    filter: vr => vr.CustomerId == customerId,
                    orderBy: q => q.OrderByDescending(vr => vr.CreatedAt),
                    includeProperties: GetIncludeProperties()
                );

                return _mapper.Map<List<VendorReviewDto>>(reviews);
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error retrieving customer reviews: {ex.Message}");
            }
        }

        public async Task<object> GetVendorBusinessInsights(int vendorId)
        {
            try
            {
                var reviews = await _repository.GetAsync(filter: vr => vr.VendorId == vendorId);

                if (!reviews.Any())
                {
                    return new
                    {
                        totalReviews = 0,
                        averageRating = 0.0,
                        ratingBreakdown = new Dictionary<int, int>(),
                        businessLevel = "No reviews yet",
                        recommendation = "Start encouraging customers to leave reviews"
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
                var businessLevel = GetBusinessLevel(averageRating);
                var recommendation = GetBusinessRecommendation(averageRating, reviews.Count());

                return new
                {
                    totalReviews = reviews.Count(),
                    averageRating = averageRating,
                    ratingBreakdown = ratingBreakdown.OrderByDescending(kvp => kvp.Key),
                    businessLevel = businessLevel,
                    recommendation = recommendation
                };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException($"Error getting vendor business insights: {ex.Message}");
            }
        }

        private string GetBusinessLevel(double averageRating)
        {
            return averageRating switch
            {
                >= 4.5 => "Premium Business",
                >= 4.0 => "Excellent Business",
                >= 3.5 => "Good Business",
                >= 3.0 => "Average Business",
                >= 2.0 => "Needs Improvement",
                _ => "Critical Issues"
            };
        }

        private string GetBusinessRecommendation(double averageRating, int totalReviews)
        {
            if (totalReviews < 10)
                return "Focus on getting more customer reviews to build credibility";

            return averageRating switch
            {
                >= 4.5 => "Maintain excellent service standards and leverage positive reviews for marketing",
                >= 4.0 => "Great performance! Consider showcasing reviews to attract new customers",
                >= 3.5 => "Good foundation. Work on addressing common concerns in reviews",
                >= 3.0 => "Focus on improving customer satisfaction and service quality",
                >= 2.0 => "Urgent: Address major service issues highlighted in reviews",
                _ => "Critical: Immediate action needed to resolve service problems"
            };
        }
    }
}