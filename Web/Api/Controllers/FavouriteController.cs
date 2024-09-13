using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class FavouriteController : ControllerBase
    {
        private readonly IFavourite _favourite;
        public FavouriteController(IFavourite favourite)
        {
            _favourite = favourite;
        }

        [HttpGet("all")]
        public async Task<IActionResult> allAsync()
        {
            try
            {
                var favourites = await _favourite.allAsync();
                return Ok(favourites);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("create")]
        public async Task<IActionResult> createAsync(FavouriteDto favourite)
        {
            try
            {
                var newFavourite = await _favourite.createAsync(favourite);
                return Ok(newFavourite);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("customerFavourites/{customerId}")]
        public async Task<IActionResult> customerFavourites(int customerId)
        {
            try
            {
                var favourites = await _favourite.customerFavourites(customerId);
                return Ok(favourites);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        

        [HttpGet("productFavourites/{productId}")]
        public async Task<IActionResult> productFavourites(int productId)
        {
            try
            {
                var favourites = await _favourite.productFavourites(productId);
                return Ok(favourites);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> deleteAsync(int id)
        {
            try
            {
                var response = await _favourite.deleteAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> updateAsync(int id, FavouriteDto favourite)
        {
            try
            {
                var updatedFavourite = await _favourite.updateAsync(id, favourite);
                if (updatedFavourite == null) return NotFound();
                return Ok(updatedFavourite);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}