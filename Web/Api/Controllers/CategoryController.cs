using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
<<<<<<< HEAD
using AutoMapper;
=======
>>>>>>> ee48634 (done with service, category and product controllers.)

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategory _icategory;
<<<<<<< HEAD
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
                var result = _mapper.Map<List<CategoryDto>>(categories);
                var dataList = new {
                    categories.PageSize,
                    categories.TotalPages,
                    categories.TotalCount,
                    categories.CurrentPage
                };
                return Ok(new {result, dataList});
=======
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
>>>>>>> ee48634 (done with service, category and product controllers.)
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

<<<<<<< HEAD
        [HttpGet("products/{id}")]
=======
        [HttpGet("{id}/products")]
>>>>>>> ee48634 (done with service, category and product controllers.)
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
<<<<<<< HEAD
<<<<<<< HEAD
        public async Task<IActionResult> create([FromForm] CreateCategoryDto category)
=======
        public async Task<IActionResult> create([FromForm] CategoryDTOLite category)
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        public async Task<IActionResult> create([FromForm] CategoryDtoLite category)
>>>>>>> 836ec36 (changed all DTO to Dto)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Invalid input data");
                var newCategory = await _icategory.createAsync(category);
                return Ok(newCategory);
            }catch (Exception ex)
            {
<<<<<<< HEAD
                if (ex.Message.Contains("Cann't upload the category icon")) return StatusCode(500, ex.Message);
=======
>>>>>>> ee48634 (done with service, category and product controllers.)
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpDelete("delete/{id}")]
=======
        [HttpDelete("{id}/delete")]
>>>>>>> ee48634 (done with service, category and product controllers.)
        public async Task<IActionResult> delete(int id)
        {
            try
            {
                var response = await _icategory.deleteAsync(id);
                if (response == null) return NotFound();
<<<<<<< HEAD
                return Ok(new {success = response});
=======
                return Ok(response);
>>>>>>> ee48634 (done with service, category and product controllers.)
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
        [HttpGet("get/{id}")]
=======
        [HttpGet("{id}/get")]
>>>>>>> ee48634 (done with service, category and product controllers.)
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

<<<<<<< HEAD
        [HttpPut("update/{id}")]
<<<<<<< HEAD
        public async Task<IActionResult> update([FromForm] CategoryDto category ,int id)
=======
        [HttpPut("{id}/update")]
=======
<<<<<<< HEAD
>>>>>>> 7fb3cf8 (resolved merge conflicts)
        public async Task<IActionResult> update([FromForm] CategoryDTO category ,int id)
<<<<<<< HEAD
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
=======
        [HttpPut("{id}/update")]
        public async Task<IActionResult> update([FromForm] CategoryDto category ,int id)
>>>>>>> b8c66da (changed all DTO to Dto)
<<<<<<< HEAD
>>>>>>> 836ec36 (changed all DTO to Dto)
=======
=======
        public async Task<IActionResult> update([FromForm] CategoryDto category ,int id)
>>>>>>> ce86924 (resolved merge conflicts)
>>>>>>> 7fb3cf8 (resolved merge conflicts)
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
<<<<<<< HEAD

        [HttpGet("vendorProductCategories/{vendorId}")]
        public async Task<IActionResult> vendorCategories(int vendorId)
        {
            try
            {
                var categories = await _icategory.vendorCategories(vendorId);
                return Ok(categories);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/products")]
        public async Task<IActionResult> getCategoryProducts(int id, [FromQuery] SearchPaging props)
        {
            try
            {
                var products = await _icategory.getCategoryProducts(id, props);
                var result = _mapper.Map<List<ProductDto>>(products);
                var dataList = new {
                    products.PageSize,
                    products.TotalPages,
                    products.TotalCount,
                    products.CurrentPage
                };
                return Ok(new {result, dataList});
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/uploadIcon")]
        public async Task<IActionResult> uploadIcon(int id, [FromForm] IFormFile Icon)
        {
            try
            {
                var response = await _icategory.uploadIconAsync(id, Icon);
                if (response == null) return NotFound();
                return Ok(response);
            }catch (Exception ex)
            {
                if (ex.Message.Contains("Cann't upload the category icon")) return StatusCode(500, ex.Message);
                return BadRequest(ex.Message);
            }
        }
=======
>>>>>>> ee48634 (done with service, category and product controllers.)
    }
}
