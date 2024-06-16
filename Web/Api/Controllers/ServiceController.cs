using Api.DTO;
using Api.Interfaces;
using API.DTO;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceController : ControllerBase
    {
        private readonly IService _iservice;
        private readonly IMapper _mapper;
        public ServiceController(IService iservice, IMapper mapper) 
        { 
            _iservice = iservice;
            _mapper = mapper;
        }

        [HttpGet("all")]
        public async Task<IActionResult> getAll([FromQuery] SearchPaging props)
        {
            try
            {
                var services = await _iservice.allAsync(props);

                var result = _mapper.Map<List<ServiceDto>>(services);
                var dataList = new {
                    services.TotalCount,
                    services.TotalPages,
                    services.PageSize,
                    services.CurrentPage

                };
                
                return Ok(new {result, dataList});
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

        [HttpPut("uploadImg/{id}")]
        public async Task<IActionResult> uploadImg(int id, [FromForm] ImageDto serviceIcon)
        {
            if(serviceIcon is null){
                return BadRequest("No Image provided");
            }
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
        public async Task<IActionResult> create( [FromForm] ServiceDto service)
        {
            try
            {
                if(!ModelState.IsValid) return BadRequest("Invalid input");
                if (service.Name is null || service.Description is null) return BadRequest("Name and Description are required");
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

        [HttpPut("update/{id}")]
        public async Task<IActionResult> update([FromForm] ServiceDto service, int id)
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

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> delete(int id)
        {
            try
            {
                var response = await _iservice.deleteAsync(id);
                if (response == null) return NotFound();
                
                return Ok(new {success = response });
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
