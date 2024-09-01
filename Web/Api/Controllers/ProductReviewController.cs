using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductReviewController : ControllerBase
    {
        private readonly IReview<ProductReviewDto> _reviewService;
        public ProductReviewController( IReview<ProductReviewDto> reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> allAsync()
        {
            try
            {
                var productReview = await _reviewService.allAsync();
                return Ok(productReview);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("allByProduct/{productId}")]
        public async Task<IActionResult> allByProductAsync(int productId)
        {
            try
            {
                var productReview = await _reviewService.allByObjectAsync(productId);
                return Ok(productReview);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("averageRating/{productId}")]
        public async Task<IActionResult> averageRating(int productId)
        {
            try
            {
                var averageRating = await _reviewService.averageRating(productId);
                return Ok(averageRating);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> createAsync([FromBody] ProductReviewDto productReviewDto)
        {
            try
            {
                var productReview = await _reviewService.createAsync(productReviewDto);
                return Ok(productReview);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("delete/{id}")]
        public async Task<IActionResult> deleteAsync(int id)
        {
            try
            {
                var productReview = await _reviewService.deleteAsync(id);
                return Ok(productReview);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> findAsync(int id)
        {
            try
            {
                var productReview = await _reviewService.findAsync(id);
                return Ok(productReview);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("update/{id}")]
        public async Task<IActionResult> updateAsync(int id, [FromBody] ProductReviewDto productReviewDto)
        {
            try
            {
                var productReview = await _reviewService.updateAsync(id, productReviewDto);
                return Ok(productReview);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("productReviewStats/{productId}")]
        public async Task<IActionResult> productReviewStats(int productId)
        {
            try
            {
                var productReviewStats = await _reviewService.reviewStats(productId);
                return Ok(productReviewStats);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}