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
                    Type = user.Type
                };
                var accessToken = new GenerateToken(_config).generateAccessToken(genTokenDTO);
                var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == user.Id);
                var refreshToken = new GenerateToken(_config).generateRefreshToken(genTokenDTO);
                dbUser!.RefreshToken = refreshToken;
                await _context.SaveChangesAsync();
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
                var Type = new StripType().Strip(user.GetType().ToString());
                return new LoggedInUserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    ContactAddress = user.ContactAddress,
                    Type = Type
                };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }

        [HttpGet("refreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            try
            {
                var refreshToken = Request.Cookies["refreshToken"];
                if (string.IsNullOrEmpty(refreshToken))
                {
                    return BadRequest("Invalid refresh token");
                }
                var genTokenDTO = new GenerateToken(_config).validateRefreshToken(refreshToken);
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == genTokenDTO!.Id);
                if (user == null)
                {
                    return BadRequest("User not found");
                }
                var loggedInUser = new LoggedInUserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    ContactAddress = user.ContactAddress,
                    Type = genTokenDTO!.Type
                };
                var accessToken = new GenerateToken(_config).generateAccessToken(genTokenDTO!);
                loggedInUser.AccessToken = accessToken;
                return Ok(loggedInUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("LogOut")]
        public IActionResult LogOut()
        {
            Response.Cookies.Delete("refreshToken", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Domain = "localhost"

            });
            return Ok("Logout Successfully");
        }
    }
}