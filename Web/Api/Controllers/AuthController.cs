using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.DTO;
using Api.Helpers;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Interfaces;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly DBContext _context;
        private readonly IConfiguration _config;
        private readonly IOtherService _oService;
        private readonly IEmailVerification _emailVerify;
        public AuthController(DBContext context, IConfiguration config, IOtherService oService, IEmailVerification emailVerify)
        {
            _context = context;
            _config = config;
            _oService = oService;
            _emailVerify = emailVerify;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDTO)
        {
            try
            {
                var user = await authenticateUser(loginDTO);
                if (user == null)
                {
                    return NotFound("Invalid email or password");
                }
                var genTokenDTO = new GenTokenDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Role = user.Role
                };
                var accessToken = new GenerateToken(_config).generateAccessToken(genTokenDTO);
                var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Id == user.Id);
                var refreshToken = new GenerateToken(_config).generateRefreshToken(genTokenDTO);
                dbUser!.RefreshToken = refreshToken;
                await _context.SaveChangesAsync();
                //put refreshToken in a cookie
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddDays(7),
                    Secure = true,
                    Domain = "https://lifepadi.com/"
                };
                Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);

                var token = new
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    ContactAddress = user.ContactAddress,
                    Role = user.Role,
                    accessToken = accessToken
                };
                return Ok(token);
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("User not found"))
                {
                    return NotFound(ex.Message);
                }
                if (ex.Message.Contains("Invalid email or password"))
                {
                    return Unauthorized(ex.Message);
                }
                return BadRequest(ex.Message);
            }
        }

        private async Task<LoggedInUserDto> authenticateUser(LoginDto loginDTO)
        {
            try
            {
                var user = await GetUserByLoginDtoAsync(loginDTO);
                if (user == null)
                {
                    throw new Exceptions.ServiceException("User not found");
                }

                if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, user!.PasswordHash))
                {
                    throw new Exceptions.ServiceException("Invalid email or password");
                }
                var Type = _oService.Strip(user.GetType().ToString());
                return new LoggedInUserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    ContactAddress = user.ContactAddress,
                    Role = Type
                };
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }


        private async Task<User?> GetUserByLoginDtoAsync(LoginDto loginDTO)
        {
            // Check if phone number or email is provided and retrieve user
            if (!string.IsNullOrWhiteSpace(loginDTO.PhoneNumber))
            {
                return await _context.Users.FirstOrDefaultAsync(x => x.PhoneNumber == loginDTO.PhoneNumber);
            }

            if (!string.IsNullOrWhiteSpace(loginDTO.Email))
            {
                return await _context.Users.FirstOrDefaultAsync(x => x.Email == loginDTO.Email);
            }

            // Return null if neither is provided
            return null;
        }

        [HttpGet("refreshToken")]
        public async Task<IActionResult> RefreshToken()
        {
            try
            {
                var refreshToken = Request.Cookies["refreshToken"];
                if (string.IsNullOrEmpty(refreshToken))
                {
                    return Unauthorized("Invalid refresh token");
                }
                var genTokenDTO = new GenerateToken(_config).validateRefreshToken(refreshToken);
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == genTokenDTO!.Id);
                if (user == null)
                {
                    return NoContent();
                }
                var accessToken = new GenerateToken(_config).generateAccessToken(genTokenDTO!);
                var token = new
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    ContactAddress = user.ContactAddress,
                    Role = genTokenDTO!.Role,
                    accessToken = accessToken
                };
                return Ok(token);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("logOut")]
        public async Task<IActionResult> LogOut()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return BadRequest("Invalid refresh token");
            }
            var user = await _context.Users.FirstOrDefaultAsync(x => x.RefreshToken == refreshToken);
            if (user != null)
            {
                user!.RefreshToken = null;
                _context.Users.Attach(user);
                await _context.SaveChangesAsync();
            }
            Response.Cookies.Delete("refreshToken", new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(7),
                Secure = true,
                Domain = "https://lifepadi.com/"

            });
            return Ok("Logout Successfully");
        }

        [HttpPost("password-reset/{UserId}")]
        public async Task<IActionResult> PasswordReset(int UserId, [FromForm] string NewPassword)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == UserId);
                if (user == null)
                {
                    return NotFound("User not found");
                }
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(NewPassword);
                await _context.SaveChangesAsync();
                return Ok("Password reset successful");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}