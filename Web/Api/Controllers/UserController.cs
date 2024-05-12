using Api.DTO;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUser? _user;
        public UserController(IUser user)
        {
            _user = user;
        }

        [HttpGet("{id}/get")]
        public async Task<IActionResult> get(int id)
        {
            try
            {
                var user = await _user!.getAsync(id);
                if (user == null) return NotFound();
                return Ok(user);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("all")]
        public async Task<IActionResult> getAll([FromRoute] int pageNumber = 1, [FromRoute] int pageSize = 10)
        {
            try
            {
                var users = await _user!.getAllAsync(pageNumber, pageSize);
                return Ok(users);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}/delete")]
        public async Task<IActionResult> delete(int id)
        {
            try
            {
                var response = await _user!.deleteAsync(id);
                if (response == null) return NotFound();
                return Ok(response);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> create([FromForm] UserDTO user)
        {
            try
            {
                if (!ModelState.IsValid) return BadRequest("Some form values are not correct");
                var authUser = await _user!.createAsync(user);
                return Ok(authUser);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}/update")]
        public async Task<IActionResult> update(int id, [FromForm] UserDTOLite user)
        {
            try
            {
                var updatedUser = await _user!.updateAsync(user, id);
                if (updatedUser == null) return NotFound();
                return Ok(updatedUser);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
