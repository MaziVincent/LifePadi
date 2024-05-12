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

        [HttpGet("{id}/get")]
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
        public async Task<IActionResult> create( [FromForm] AddressDTO address)
        {
            try
            {
                var newAddress = await _iaddress.createAsync(address);
                return Ok(newAddress);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> update([FromForm] AddressDTO address, int id)
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

        [HttpDelete("{id}/delete")]
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

        [HttpGet("{customerId}/customer-addresses")]
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
    }
}
