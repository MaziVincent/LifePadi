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

<<<<<<< HEAD
<<<<<<< HEAD
        [HttpGet("get/{id}")]
=======
        [HttpGet("{id}/get")]
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        [HttpGet("get/{id}")]
>>>>>>> eda1965 (User Dashboard and Landing Page)
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
<<<<<<< HEAD
        public async Task<IActionResult> create( [FromForm] AddressDto address)
=======
        public async Task<IActionResult> create( [FromForm] AddressDTO address)
>>>>>>> ee48634 (done with service, category and product controllers.)
        {
            try
            {
                var newAddress = await _iaddress.createAsync(address);
<<<<<<< HEAD
                
                return Ok(newAddress);
            }catch (Exception ex)
            {
                if(ex.Message.Contains("Address already exist")){
                    return Conflict(ex.Message);
                }
=======
                return Ok(newAddress);
            }catch (Exception ex)
            {
>>>>>>> ee48634 (done with service, category and product controllers.)
                return BadRequest(ex.Message);
            }
        }

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> eda1965 (User Dashboard and Landing Page)
        [HttpPut("update/{id}")]
        public async Task<IActionResult> update([FromForm] AddressDto address, int id)
=======
        [HttpPut("{id}/update")]
        public async Task<IActionResult> update([FromForm] AddressDTO address, int id)
>>>>>>> ee48634 (done with service, category and product controllers.)
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

<<<<<<< HEAD
<<<<<<< HEAD
        [HttpDelete("delete/{id}")]
=======
        [HttpDelete("{id}/delete")]
>>>>>>> ee48634 (done with service, category and product controllers.)
=======
        [HttpDelete("delete/{id}")]
>>>>>>> eda1965 (User Dashboard and Landing Page)
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

<<<<<<< HEAD
        [HttpPut("setasdefault")]
        public async Task<IActionResult> setAsDefault([FromBody] DefaultAddressDto add )
        {
            try
            {
                var response = await _iaddress.setAsDefault(add.AddressId, add.CustomerId);
                if (response == null) return NotFound();
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpGet("customer-addresses/{customerId}")]
=======
        [HttpGet("{customerId}/customer-addresses")]
>>>>>>> ee48634 (done with service, category and product controllers.)
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
<<<<<<< HEAD
        

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
=======
>>>>>>> ee48634 (done with service, category and product controllers.)
    }
}
