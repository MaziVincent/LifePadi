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
                    return BadRequest("Invalid email or password");
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
                    Secure = true
                };
                Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);

                var token = new
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    ContactAddress = user.ContactAddress,
                    Role = user.Role,
                    accessToken = accessToken
                };
                return Ok(token);
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
                    ContactAddress = user.ContactAddress,
                    Role = Type
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
                    return Unauthorized("Invalid refresh token");
                }
                var genTokenDTO = new GenerateToken(_config).validateRefreshToken(refreshToken);
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == genTokenDTO!.Id);
                if (user == null)
                {
                    return NoContent();
                }
                var loggedInUser = new LoggedInUserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    ContactAddress = user.ContactAddress,
                    Role = genTokenDTO!.Role
                };
                var accessToken = new GenerateToken(_config).generateAccessToken(genTokenDTO!);
                var token = new
                {
                    user = loggedInUser,
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
                Secure = true

            });
            return Ok("Logout Successfully");
        }
    }
}