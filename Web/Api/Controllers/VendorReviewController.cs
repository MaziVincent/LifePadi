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
    public class VendorReviewController : ControllerBase
    {
        private readonly IReview<VendorReviewDto> _reviewService;
        public VendorReviewController( IReview<VendorReviewDto> reviewService)
        {
            _reviewService = reviewService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> allAsync()
        {
            try
            {
                var vendorReview = await _reviewService.allAsync();
                return Ok(vendorReview);
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
                var vendorReview = await _reviewService.allByObjectAsync(vendorId);
                return Ok(vendorReview);
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
                return Ok(averageRating);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> createAsync(VendorReviewDto review)
        {
            try
            {
                var newReview = await _reviewService.createAsync(review);
                return Ok(newReview);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> updateAsync(int id, [FromBody] VendorReviewDto review)
        {
            try
            {
                var updatedReview = await _reviewService.updateAsync(id, review);
                return Ok(updatedReview);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> deleteAsync(int id)
        {
            try
            {
                var deletedReview = await _reviewService.deleteAsync(id);
                return Ok(deletedReview);
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
                var review = await _reviewService.findAsync(id);
                return Ok(review);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("reviewStats/{vendorId}")]
        public async Task<IActionResult> reviewStats(int vendorId)
        {
            try
            {
                var stats = await _reviewService.reviewStats(vendorId);
                return Ok(stats);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        
    }
}