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
    public class RiderReviewController : ControllerBase
    {
        private readonly IReview<RiderReviewDto> _reviewService;
        private readonly RiderReviewService _riderReviewService;

        public RiderReviewController(IReview<RiderReviewDto> reviewService, RiderReviewService riderReviewService)
        {
            _reviewService = reviewService;
            _riderReviewService = riderReviewService;
        }

        [HttpGet("all")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> allAsync()
        {
            try
            {
                var riderReviews = await _reviewService.allAsync();
                return Ok(riderReviews);
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

                var pagedReviews = await ((BaseReviewService<Models.RiderReview, RiderReviewDto>)_reviewService)
                    .GetAllPaginatedAsync(pageNumber, pageSize);

                return Ok(pagedReviews);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("allByRider/{riderId}")]
        public async Task<IActionResult> allByRiderAsync(int riderId)
        {
            try
            {
                var riderReviews = await _reviewService.allByObjectAsync(riderId);
                return Ok(riderReviews);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("allByRider/{riderId}/paginated")]
        public async Task<IActionResult> GetByRiderPaginated(int riderId, [FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                if (pageNumber < 1) pageNumber = 1;
                if (pageSize < 1 || pageSize > 100) pageSize = 10;

                var pagedReviews = await ((BaseReviewService<Models.RiderReview, RiderReviewDto>)_reviewService)
                    .GetByObjectPaginatedAsync(riderId, pageNumber, pageSize);

                return Ok(pagedReviews);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("averageRating/{riderId}")]
        public async Task<IActionResult> averageRating(int riderId)
        {
            try
            {
                var averageRating = await _reviewService.averageRating(riderId);
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
                var riderReview = await _reviewService.findAsync(id);
                return Ok(riderReview);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> createAsync([FromBody] RiderReviewDto riderReviewDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var riderReview = await _reviewService.createAsync(riderReviewDto);
                return CreatedAtAction(nameof(findAsync), new { id = riderReview.Id }, riderReview);
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
        public async Task<IActionResult> updateAsync(int id, [FromBody] RiderReviewDto riderReviewDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var riderReview = await _reviewService.updateAsync(id, riderReviewDto);
                return Ok(riderReview);
            }
            catch (Exception e)
            {
                if (e.Message.Contains("not found"))
                    return NotFound(e.Message);
                return BadRequest(e.Message);
            }
        }

        [HttpGet("stats/{riderId}")]
        public async Task<IActionResult> reviewStats(int riderId)
        {
            try
            {
                var reviewStats = await _reviewService.reviewStats(riderId);
                return Ok(reviewStats);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("performanceStats/{riderId}")]
        public async Task<IActionResult> GetRiderPerformanceStats(int riderId)
        {
            try
            {
                var stats = await _riderReviewService.GetRiderPerformanceStats(riderId);
                return Ok(stats);
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
                var reviews = await _riderReviewService.GetReviewsByCustomer(customerId);
                return Ok(reviews);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}