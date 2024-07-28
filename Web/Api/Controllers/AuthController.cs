using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Helpers;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DBContext _context;
        private readonly IConfiguration _config;
        public AuthController(DBContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDTO)
        {
            try
            {
                var user = await authenticateUser(loginDTO);
                if (user == null)
                {
                    return BadRequest("Invalid email or password");
                }
                var genTokenDTO = new GenTokenDto
                {
                    Id = user.Id,
                    Email = user.Email,
                };
                var accessToken = new GenerateToken(_config).generateAccessToken(genTokenDTO);
                var refreshToken = new GenerateToken(_config).generateRefreshToken(genTokenDTO);
                //put refreshToken in a cookie
                Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.Strict,
                    Secure = true
                });
                user.AccessToken = accessToken;
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private async Task<LoggedInUserDto> authenticateUser(LoginDto loginDTO)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Email!.ToLower() == loginDTO.Email!.ToLower());
                if(user == null)
                {
                    throw new Exceptions.ServiceException("User not found");
                }

                if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, user!.PasswordHash))
                {
                    throw new Exceptions.ServiceException("Invalid email or password");
                }
                
                return new LoggedInUserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    ContactAddress = user.ContactAddress,
                };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
    }
}