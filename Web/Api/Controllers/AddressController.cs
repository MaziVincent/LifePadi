using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController : ControllerBase
    {
        private readonly IAddress _iaddress;
        public AddressController(IAddress address) 
        { 
            _iaddress = address;
        }

        [HttpGet("all")]
        public async Task<IActionResult> getAll()
        {
            try
            {
                var addresses = await _iaddress.allAsync();
                return Ok(addresses);
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
                var address = await _iaddress.getAsync(id);
                if (address == null) return NotFound();
                return Ok(address);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> create( [FromForm] AddressDto address)
        {
            try
            {
                var newAddress = await _iaddress.createAsync(address);
                
                return Ok(newAddress);
            }catch (Exception ex)
            {
                if(ex.Message.Contains("Address already exist")){
                    return Conflict(ex.Message);
                }
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> update([FromForm] AddressDto address, int id)
        {
            try
            {
                var updatedAddress = await _iaddress.updateAsync(address, id);
                if (updatedAddress == null) return NotFound();
                return Ok(updatedAddress);
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
                var response = await _iaddress.deleteAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("customer-addresses/{customerId}")]
        public async Task<IActionResult> getCustomersAddresses([FromRoute] int customerId)
        {
            try
            {
                var addresses = await _iaddress.getCustomersAddresses(customerId);
                if (addresses == null) return NotFound();
                return Ok(addresses);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user-addresses/{userId}")]
        public async Task<IActionResult> getUsersAddress([FromRoute] int userId)
        {
            try
            {
                var addresses = await _iaddress.getUsersAddress(userId);
                return Ok(addresses);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
