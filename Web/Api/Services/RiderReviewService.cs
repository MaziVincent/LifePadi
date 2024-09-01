using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Api.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Services
{
    public class RiderReviewService : IReview<RiderReviewDto>
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        public RiderReviewService(DBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<RiderReviewDto>> allAsync()
        {
            try
            {
                var riderReview = await _context.RiderReviews.OrderByDescending(rr => rr.CreatedAt)
                .Include(rr => rr.Rider)
                .Include(rr => rr.Customer)
                .ToListAsync();
                return _mapper.Map<List<RiderReviewDto>>(riderReview);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<List<RiderReviewDto>> allByObjectAsync(int objectId)
        {
            try
            {
                var riderReview = await _context.RiderReviews.OrderByDescending(rr => rr.CreatedAt)
                .Include(rr => rr.Rider)
                .Include(rr => rr.Customer)
                .Where(rr => rr.RiderId == objectId)
                .ToListAsync();
                return _mapper.Map<List<RiderReviewDto>>(riderReview);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<double> averageRating(int objectId)
        {
            try
            {
                var riderReview = await _context.RiderReviews
                .Where(rr => rr.RiderId == objectId)
                .AverageAsync(rr => rr.Rating);
                return riderReview;
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<RiderReviewDto> createAsync(RiderReviewDto reviewDto)
        {
            try
            {
                var riderReview = _mapper.Map<RiderReview>(reviewDto);
                await _context.RiderReviews.AddAsync(riderReview);
                await _context.SaveChangesAsync();
                return _mapper.Map<RiderReviewDto>(riderReview);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<string> deleteAsync(int id)
        {
            try
            {
                var riderReview = await _context.RiderReviews.FirstOrDefaultAsync(rr => rr.Id == id);
                if (riderReview == null)
                {
                    return "Rider Review not found";
                }
                _context.RiderReviews.Remove(riderReview);
                await _context.SaveChangesAsync();
                return "Rider Review deleted successfully";
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<RiderReviewDto> findAsync(int id)
        {
            try
            {
                var riderReview = await _context.RiderReviews
                .Include(rr => rr.Rider)
                .Include(rr => rr.Customer)
                .FirstOrDefaultAsync(rr => rr.Id == id);
                return _mapper.Map<RiderReviewDto>(riderReview);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<object> reviewStats(int objectId)
        {
            try
            {
                var reviewStats = new
                {
                    averageRating = await averageRating(objectId),
                    totalReviews = await _context.RiderReviews.Where(rr => rr.RiderId == objectId).CountAsync()
                };
                return reviewStats;
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<RiderReviewDto> updateAsync(int id, RiderReviewDto reviewDto)
        {
            try
            {
                var riderReview = await _context.RiderReviews.FirstOrDefaultAsync(rr => rr.Id == id);
                if (riderReview == null)
                {
                    throw new Exceptions.ServiceException("Rider Review not found");
                }
                _context.Entry(riderReview).CurrentValues.SetValues(reviewDto);
                riderReview.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
                return _mapper.Map<RiderReviewDto>(riderReview);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            
            }
        }
    }
}