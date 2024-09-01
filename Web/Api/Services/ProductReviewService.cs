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
    public class ProductReviewService : IProductReview
    {
        private readonly DBContext _context;
        private readonly IMapper _mapper;
        public ProductReviewService(DBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<ProductReviewDto>> allAsync()
        {
            try
            {
                var productReview = await _context.ProductReviews.ToListAsync();
                var productReviewDto = _mapper.Map<List<ProductReviewDto>>(productReview);
                return productReviewDto;
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<List<ProductReviewDto>> allByProductAsync(int productId)
        {
            try
            {
                var productReview = await _context.ProductReviews.Where(x => x.ProductId == productId).OrderByDescending(pr => pr.CreatedAt
                ).ToListAsync();
                var productReviewDto = _mapper.Map<List<ProductReviewDto>>(productReview);
                return productReviewDto;
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<double> averageRating(int productId)
        {
            try
            {
                var productReview = await _context.ProductReviews.Where(x => x.ProductId == productId).ToListAsync();
                if (productReview.Count == 0)
                {
                    return 0.0;
                }
                var averageRating = productReview.Average(x => x.Rating);
                return Math.Round(averageRating, 1);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<ProductReviewDto> createAsync(ProductReviewDto productReviewDto)
        {
            try
            {
                var initialProductReview = await _context.ProductReviews.FirstOrDefaultAsync(pr => pr.CustomerId == productReviewDto.CustomerId && pr.ProductId == productReviewDto.ProductId);
                if (initialProductReview != null)
                {
                    throw new Exceptions.ServiceException("Product Review already exists");
                }
                var productReview = _mapper.Map<ProductReview>(productReviewDto);
                await _context.ProductReviews.AddAsync(productReview);
                await _context.SaveChangesAsync();
                return _mapper.Map<ProductReviewDto>(productReview);
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
                var productReview = await _context.ProductReviews.FirstOrDefaultAsync(p => p.Id == id);
                if (productReview == null)
                {
                    throw new Exceptions.ServiceException("Product Review not found");
                }
                _context.ProductReviews.Remove(productReview);
                await _context.SaveChangesAsync();
                return "Product Review deleted successfully";
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<ProductReviewDto> findAsync(int id)
        {
            try
            {
                var productReview = await _context.ProductReviews.FirstOrDefaultAsync(p => p.Id == id);
                if (productReview == null)
                {
                    throw new Exceptions.ServiceException("Product Review not found");
                }
                var productReviewDto = _mapper.Map<ProductReviewDto>(productReview);
                return productReviewDto;
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }

        public async Task<ProductReviewDto> updateAsync(int id, ProductReviewDto productReviewDto)
        {
            try
            {
                var productReview = await _context.ProductReviews.FirstOrDefaultAsync(p => p.Id == id);
                if (productReview == null)
                {
                    throw new Exceptions.ServiceException("Product Review not found");
                }
                _mapper.Map(productReviewDto, productReview);
                _context.ProductReviews.Update(productReview);
                await _context.SaveChangesAsync();
                return _mapper.Map<ProductReviewDto>(productReview);
            }
            catch (Exception e)
            {
                throw new Exceptions.ServiceException(e.Message);
            }
        }
    }
}