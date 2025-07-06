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
    public class VendorReviewController : ControllerBase
    {
        private readonly IReview<VendorReviewDto> _reviewService;
        private readonly VendorReviewService _vendorReviewService;

        public VendorReviewController(IReview<VendorReviewDto> reviewService, VendorReviewService vendorReviewService)
        {
            _reviewService = reviewService;
            _vendorReviewService = vendorReviewService;
        }

        [HttpGet("all")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> allAsync()
        {
            try
            {
                var vendorReviews = await _reviewService.allAsync();
                return Ok(vendorReviews);
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
                if (pageSize < 1 || pageSize > 100) pageSize = 10;

                var pagedReviews = await ((BaseReviewService<Models.VendorReview, VendorReviewDto>)_reviewService)
                    .GetAllPaginatedAsync(pageNumber, pageSize);

                return Ok(pagedReviews);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("allByVendor/{vendorId}")]
        public async Task<IActionResult> allByVendorAsync(int vendorId)
        {
            try
            {
                var vendorReviews = await _reviewService.allByObjectAsync(vendorId);
                return Ok(vendorReviews);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("allByVendor/{vendorId}/paginated")]
        public async Task<IActionResult> GetByVendorPaginated(int vendorId, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                if (pageNumber < 1) pageNumber = 1;
                if (pageSize < 1 || pageSize > 100) pageSize = 10;

                var pagedReviews = await ((BaseReviewService<Models.VendorReview, VendorReviewDto>)_reviewService)
                    .GetByObjectPaginatedAsync(vendorId, pageNumber, pageSize);

                return Ok(pagedReviews);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("averageRating/{vendorId}")]
        public async Task<IActionResult> averageRating(int vendorId)
        {
            try
            {
                var averageRating = await _reviewService.averageRating(vendorId);
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
                var vendorReview = await _reviewService.findAsync(id);
                return Ok(vendorReview);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> createAsync([FromBody] VendorReviewDto vendorReviewDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var vendorReview = await _reviewService.createAsync(vendorReviewDto);
                return Ok(vendorReview);
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
        public async Task<IActionResult> updateAsync(int id, [FromBody] VendorReviewDto vendorReviewDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var vendorReview = await _reviewService.updateAsync(id, vendorReviewDto);
                return Ok(vendorReview);
            }
            catch (Exception e)
            {
                if (e.Message.Contains("not found"))
                    return NotFound(e.Message);
                return BadRequest(e.Message);
            }
        }

        [HttpGet("stats/{vendorId}")]
        public async Task<IActionResult> reviewStats(int vendorId)
        {
            try
            {
                var reviewStats = await _reviewService.reviewStats(vendorId);
                return Ok(reviewStats);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("businessInsights/{vendorId}")]
        public async Task<IActionResult> GetVendorBusinessInsights(int vendorId)
        {
            try
            {
                var insights = await _vendorReviewService.GetVendorBusinessInsights(vendorId);
                return Ok(insights);
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
                var reviews = await _vendorReviewService.GetReviewsByCustomer(customerId);
                return Ok(reviews);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}