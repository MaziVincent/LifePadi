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
        private readonly IProductReview _productReviewService;
        public ProductReviewController(IProductReview productReviewService)
        {
            _productReviewService = productReviewService;
        }

        [HttpGet("all")]
        public async Task<IActionResult> allAsync()
        {
            try
            {
                var productReview = await _productReviewService.allAsync();
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
                var productReview = await _productReviewService.allByProductAsync(productId);
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
                var averageRating = await _productReviewService.averageRating(productId);
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
                var productReview = await _productReviewService.createAsync(productReviewDto);
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
                var productReview = await _productReviewService.deleteAsync(id);
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
                var productReview = await _productReviewService.findAsync(id);
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
                var productReview = await _productReviewService.updateAsync(id, productReviewDto);
                return Ok(productReview);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}