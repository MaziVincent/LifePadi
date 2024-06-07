using Api.DTO;
using Api.Interfaces;
using API.DTO;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategory _icategory;
        private readonly IMapper _mapper;
        public CategoryController(ICategory icategory, IMapper mapper) 
        { 
            _icategory = icategory;
            _mapper = mapper;
        }

        [HttpGet("all")]
        public async Task<IActionResult> getAll([FromQuery] SearchPaging props)
        {
            try
            {
                var categories = await _icategory.allAsync(props);
                var result = _mapper.Map<List<CategoryDTO>>(categories);
                var dataList = new {
                    categories.PageSize,
                    categories.TotalPages,
                    categories.TotalCount,
                    categories.CurrentPage
                };
                return Ok(new {result, dataList});
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

        [HttpGet("products/{id}")]
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

        [HttpDelete("delete/{id}")]
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

        [HttpGet("get/{id}")]
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

        [HttpPut("update/{id}")]
        public async Task<IActionResult> update([FromForm] CategoryDTO category ,int id)
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
