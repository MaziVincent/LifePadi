using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategory _icategory;
        public CategoryController(ICategory icategory) 
        { 
            _icategory = icategory;
        }

        [HttpGet("all")]
        public async Task<IActionResult> getAll(int pageNumber = 1, int pageSize = 10, string searchString = "")
        {
            try
            {
                var categories = await _icategory.allAsync(pageNumber, pageSize, searchString);
                return Ok(categories);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("allLite")]
        public async Task<IActionResult> allCategoryLite()
        {
            try
            {
                var categories = await _icategory.allCategoryLiteAsync();
                return Ok(categories);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/products")]
        public async Task<IActionResult> getCategoryProducts(int id)
        {
            try
            {
                var products = await _icategory.categoryProducts(id);
                return Ok(products);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> create([FromForm] CategoryDtoLite category)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Invalid input data");
                var newCategory = await _icategory.createAsync(category);
                return Ok(newCategory);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> delete(int id)
        {
            try
            {
                var response = await _icategory.deleteAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/get")]
        public async Task<IActionResult> get(int id)
        {
            try
            {
                var category = await _icategory.getAsync(id);
                if (category == null) return NotFound();
                return Ok(category);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getByName")]
        public async Task<IActionResult> getByName([FromRoute] string name)
        {
            try
            {
                var category = await _icategory.getByNameAsync(name);
                if (category == null) return NotFound();
                return Ok(category);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> update([FromForm] CategoryDto category ,int id)
        {
            try
            {
                var updatedCategory = await _icategory.updateAsync(category, id);
                if (updatedCategory == null) return NotFound();
                return Ok(updatedCategory);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
