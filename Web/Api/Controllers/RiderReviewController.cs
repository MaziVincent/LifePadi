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
    public class RiderReviewController : ControllerBase
    {
        private readonly IReview<RiderReviewDto> _reviewService;
        public RiderReviewController( IReview<RiderReviewDto> reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> allAsync()
        {
            try
            {
                var riderReview = await _reviewService.allAsync();
                return Ok(riderReview);
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
                var riderReview = await _reviewService.allByObjectAsync(riderId);
                return Ok(riderReview);
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
                return Ok(averageRating);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> createAsync(RiderReviewDto review)
        {
            try
            {
                var riderReview = await _reviewService.createAsync(review);
                return Ok(riderReview);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> updateAsync(int id, [FromBody] RiderReviewDto review)
        {
            try
            {
                var riderReview = await _reviewService.updateAsync(id, review);
                return Ok(riderReview);
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
                var riderReview = await _reviewService.deleteAsync(id);
                return Ok(riderReview);
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
                var riderReview = await _reviewService.findAsync(id);
                return Ok(riderReview);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("reviewStats/{riderId}")]
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
    }
}