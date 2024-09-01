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
    public class VendorReviewService : IReview<VendorReviewDto>
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        public VendorReviewService(DBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<VendorReviewDto>> allAsync()
        {
            try
            {
                var vendorReview = await _context.VendorReviews.OrderByDescending(vr => vr.CreatedAt)
                .Include(vr => vr.Vendor)
                .Include(vr => vr.Customer)
                .ToListAsync();
                return _mapper.Map<List<VendorReviewDto>>(vendorReview);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<List<VendorReviewDto>> allByObjectAsync(int objectId)
        {
            try
            {
                var vendorReview = await _context.VendorReviews.OrderByDescending(vr => vr.CreatedAt)
                .Include(vr => vr.Vendor)
                .Include(vr => vr.Customer)
                .Where(vr => vr.VendorId == objectId)
                .ToListAsync();
                return _mapper.Map<List<VendorReviewDto>>(vendorReview);
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
                var vendorReview = await _context.VendorReviews
                .Where(vr => vr.VendorId == objectId)
                .AverageAsync(vr => vr.Rating);
                return vendorReview;
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<VendorReviewDto> createAsync(VendorReviewDto reviewDto)
        {
            try{
                var vendorReview = _mapper.Map<VendorReview>(reviewDto);
                await _context.VendorReviews.AddAsync(vendorReview);
                await _context.SaveChangesAsync();
                return _mapper.Map<VendorReviewDto>(vendorReview);
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
                var vendorReview = await _context.VendorReviews.FirstOrDefaultAsync(vr => vr.Id == id);
                if (vendorReview == null)
                {
                    throw new Exceptions.ServiceException("Vendor Review not found");
                }
                _context.VendorReviews.Remove(vendorReview);
                await _context.SaveChangesAsync();
                return "Vendor Review deleted successfully";
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<VendorReviewDto> findAsync(int id)
        {
            try
            {
                var vendorReview = await _context.VendorReviews
                .Include(vr => vr.Vendor)
                .Include(vr => vr.Customer)
                .FirstOrDefaultAsync(vr => vr.Id == id);
                return _mapper.Map<VendorReviewDto>(vendorReview);
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
                var reviewStats = new {
                    averageRating = await averageRating(objectId),
                    totalReviews = await _context.VendorReviews.Where(vr => vr.VendorId == objectId).CountAsync()
                };
                return reviewStats;
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            
            }
        }

        public async Task<VendorReviewDto> updateAsync(int id, VendorReviewDto reviewDto)
        {
            try
            {
                var initialVendorReview = await _context.VendorReviews.FirstOrDefaultAsync(vr => vr.Id == reviewDto.Id);
                if (initialVendorReview == null)
                {
                    throw new Exceptions.ServiceException("Vendor Review not found");
                }
                var vendorReview = _mapper.Map<VendorReview>(reviewDto);
                _context.Entry(initialVendorReview).CurrentValues.SetValues(vendorReview);
                initialVendorReview.UpdatedAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();
                return _mapper.Map<VendorReviewDto>(vendorReview);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }
    }
}