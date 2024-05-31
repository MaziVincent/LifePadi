using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController : ControllerBase
    {
        private readonly IService _iservice;
        public ServiceController(IService iservice) 
        { 
            _iservice = iservice;
        }

        [HttpGet("all")]
        public async Task<IActionResult> getAll()
        {
            try
            {
                var services = await _iservice.allAsync();
                return Ok(services);
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
                var service = await _iservice.getAsync(id);
                if (service == null) return NotFound();
                return Ok(service);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("noneActives")]
        public async Task<IActionResult> getNonActive()
        {
            try
            {
                var services = await _iservice.nonActiveService();
                return Ok(services);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/getProducts")]
        public async Task<IActionResult> getProducts(int id)
        {
            try
            {
                var products = await _iservice.getServiceProducts(id);
                return Ok(products);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("allLite")]
        public async Task<IActionResult> allLite()
        {
            try
            {
                var services = await _iservice.servicesLite();
                return Ok(services);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/uploadImg")]
        public async Task<IActionResult> uploadImg(int id, [FromForm] ImageDTO serviceIcon)
        {
            try
            {
                var service = await _iservice.uploadImgUrl(id, serviceIcon.Image!);
                if (service == null) return NotFound();
                return Ok(service);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> create([FromForm] ServiceDTO service)
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest("Invalid input");
                if (service.Name == null || service.Description == null) return BadRequest("Name and Description are required");
                var isNameTaken = await _iservice.nameExists(service.Name!);
                if (!isNameTaken)
                {
                    var newService = await _iservice.createAsync(service);
                    return Ok(newService);
                }
                return BadRequest("Name already taken");
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> update([FromForm] ServiceDTO service, int id)
        {
            try
            {
                var updateService = await _iservice.updateAsync(service, id);
                if (service == null) return NotFound();
                return Ok(updateService);
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
                var response = await _iservice.deleteAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}/getVendors")]
        public async Task<IActionResult> getVendors(int id)
        {
            try
            {
                var vendors = await _iservice.getVendorsForService(id);
                return Ok(vendors);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
