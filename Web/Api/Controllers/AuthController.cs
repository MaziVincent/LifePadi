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
using AutoMapper;

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
        private readonly IMapper _mapper;
        private readonly IUser _userService;
        public AuthController(DBContext context,
        IConfiguration config,
        IOtherService oService,
        IEmailVerification emailVerify,
        IMapper mapper,
        IUser userService)
        {
            _context = context;
            _config = config;
            _oService = oService;
            _emailVerify = emailVerify;
            _mapper = mapper;
            _userService = userService;
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

                //put refreshToken in a cookie
                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddDays(7),
                    Secure = true,
                    Path = "/",

                };
                Response.Cookies.Append("refreshToken", user.RefreshToken!, cookieOptions);

                var token = new
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    ContactAddress = user.ContactAddress,
                    Role = user.Role,
                    refreshToken = user.RefreshToken,
                    accessToken = user.AccessToken,
                    Wallet = user.Wallet
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
                    return BadRequest(ex.Message);
                }
                return StatusCode(500, ex.Message);
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
                var genTokenDTO = new GenTokenDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    Role = Type
                };
                var accessToken = new GenerateToken(_config).generateAccessToken(genTokenDTO);
                var refreshToken = new GenerateToken(_config).generateRefreshToken(genTokenDTO);
                user!.RefreshToken = refreshToken;
                await _context.SaveChangesAsync();
                var wallet = await _context.Wallets.FirstOrDefaultAsync(x => x.CustomerId == user.Id);
                var walletDto = _mapper.Map<WalletDtoLite>(wallet);
                return new LoggedInUserDto
                {
                    Id = user.Id,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    PhoneNumber = user.PhoneNumber,
                    ContactAddress = user.ContactAddress,
                    RefreshToken = refreshToken,
                    AccessToken = accessToken,
                    Role = Type,
                    Wallet = walletDto
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
                return await _context.Users.Where(x => x.Email!.ToLower() == loginDTO.Email.ToLower()).FirstOrDefaultAsync();
            }

            // Return null if neither is provided
            return null;
        }

        [HttpGet("refreshToken")]
        public async Task<IActionResult> RefreshToken([FromQuery] string refreshToken)
        {
            try
            {
                // var refreshToken = Request.Cookies["refreshToken"];
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
                    PhoneNumber = user.PhoneNumber,
                    Role = genTokenDTO!.Role,
                    refreshToken = user.RefreshToken,
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
                Path = "/"

            });
            return Ok("Logout Successfully");
        }

        [HttpPut("password-reset")]
        public async Task<IActionResult> PasswordReset([FromForm] ForgotPasswordDTO forgotPassword)
        {
            try
            {
                var response = await _userService.resetPassword(forgotPassword);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string email)
        {
            try
            {
                var response = await _emailVerify.SendVerificationEmail(email);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}