using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Api.Authorization;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductReviewController : ControllerBase
    {
        private readonly IReview<ProductReviewDto> _reviewService;
        private readonly ProductReviewService _productReviewService;

        public ProductReviewController(IReview<ProductReviewDto> reviewService, ProductReviewService productReviewService)
        {
            _reviewService = reviewService;
            _productReviewService = productReviewService;
        }

        [HttpGet("all")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> allAsync()
        {
            try
            {
                var productReviews = await _reviewService.allAsync();
                return Ok(productReviews);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("all/paginated")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> GetAllPaginated([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                if (pageNumber < 1) pageNumber = 1;
                if (pageSize < 1 || pageSize > 100) pageSize = 10; // Limit page size to prevent abuse

                var pagedReviews = await ((BaseReviewService<Models.ProductReview, ProductReviewDto>)_reviewService)
                    .GetAllPaginatedAsync(pageNumber, pageSize);

                return Ok(pagedReviews);
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
                var productReviews = await _reviewService.allByObjectAsync(productId);
                return Ok(productReviews);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("allByProduct/{productId}/paginated")]
        public async Task<IActionResult> GetByProductPaginated(int productId, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                if (pageNumber < 1) pageNumber = 1;
                if (pageSize < 1 || pageSize > 100) pageSize = 10;

                var pagedReviews = await ((BaseReviewService<Models.ProductReview, ProductReviewDto>)_reviewService)
                    .GetByObjectPaginatedAsync(productId, pageNumber, pageSize);

                return Ok(pagedReviews);
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
                return Ok(new { averageRating });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
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

        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> createAsync([FromBody] ProductReviewDto productReviewDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var productReview = await _reviewService.createAsync(productReviewDto);
                return CreatedAtAction(nameof(findAsync), new { id = productReview.Id }, productReview);
            }
            catch (Exception e)
            {
                if (e.Message.Contains("already reviewed"))
                    return Conflict(e.Message);
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public async Task<IActionResult> deleteAsync(int id)
        {
            try
            {
                var result = await _reviewService.deleteAsync(id);
                return Ok(new { message = result });
            }
            catch (Exception e)
            {
                if (e.Message.Contains("not found"))
                    return NotFound(e.Message);
                return BadRequest(e.Message);
            }
        }

        [HttpPut("update/{id}")]
        [Authorize]
        public async Task<IActionResult> updateAsync(int id, [FromBody] ProductReviewDto productReviewDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var productReview = await _reviewService.updateAsync(id, productReviewDto);
                return Ok(productReview);
            }
            catch (Exception e)
            {
                if (e.Message.Contains("not found"))
                    return NotFound(e.Message);
                return BadRequest(e.Message);
            }
        }

        [HttpGet("stats/{productId}")]
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

        [HttpGet("ratingBreakdown/{productId}")]
        public async Task<IActionResult> GetProductRatingBreakdown(int productId)
        {
            try
            {
                var breakdown = await _productReviewService.GetProductRatingBreakdown(productId);
                return Ok(breakdown);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("customer/{customerId}")]
        [Authorize]
        [ResourceOwnerOrAdmin("customerId")]
        public async Task<IActionResult> GetReviewsByCustomer(int customerId)
        {
            try
            {
                var reviews = await _productReviewService.GetReviewsByCustomer(customerId);
                return Ok(reviews);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}