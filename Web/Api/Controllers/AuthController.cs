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
using Api.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Swashbuckle.AspNetCore.Annotations;

namespace Api.Controllers
{
    /// <summary>
    /// Authentication controller responsible for user login, registration, and password management
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    [SwaggerTag("Authentication and authorization endpoints")]
    public class AuthController : ControllerBase
    {
        private readonly DBContext _context;
        private readonly IConfiguration _config;
        private readonly IOtherService _oService;
        private readonly IEmailVerification _emailVerify;
        private readonly IMapper _mapper;
        private readonly IUser _userService;
        private readonly ILogger<AuthController> _logger;
        public AuthController(DBContext context,
        IConfiguration config,
        IOtherService oService,
        IEmailVerification emailVerify,
        IMapper mapper,
        IUser userService,
        ILogger<AuthController> logger)
        {
            _context = context;
            _config = config;
            _oService = oService;
            _emailVerify = emailVerify;
            _mapper = mapper;
            _userService = userService;
            _logger = logger;
        }

        /// <summary>
        /// Logs in a user using email/phone and password
        /// </summary>
        /// <param name="loginDTO">Login data transfer object containing email or phone number and password</param>
        /// <returns>Returns user information and tokens upon successful login</returns>
        /// <response code="200">Login successful</response>
        /// <response code="400">Invalid login data</response>
        /// <response code="401">Unauthorized - invalid credentials</response>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDTO)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(Login),
                ["Email"] = loginDTO?.Email ?? "N/A",
                ["PhoneNumber"] = loginDTO?.PhoneNumber ?? "N/A"
            });

            _logger.LogInformation("Processing login request");

            if (loginDTO == null)
            {
                _logger.LogWarning("Login request with null data");
                throw new ValidationException("Login data is required");
            }

            var user = await authenticateUser(loginDTO);
            if (user == null)
            {
                _logger.LogWarning("Authentication failed - user not found or invalid credentials");
                throw new Api.Exceptions.UnauthorizedAccessException("Invalid email or password");
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
                ReferralCode = user.ReferralCode,
                refreshToken = user.RefreshToken,
                accessToken = user.AccessToken,
                Wallet = user.Wallet
            };

            _logger.LogInformation("User login successful for UserId: {UserId}", user.Id);
            return Ok(ApiResponse<object>.CreateSuccess(token, "Login successful"));
        }

        private async Task<LoggedInUserDto> authenticateUser(LoginDto loginDTO)
        {
            _logger.LogDebug("Authenticating user with email: {Email} or phone: {PhoneNumber}",
                loginDTO.Email ?? "N/A", loginDTO.PhoneNumber ?? "N/A");

            var user = await GetUserByLoginDtoAsync(loginDTO);
            if (user == null)
            {
                _logger.LogWarning("User not found during authentication");
                throw new ResourceNotFoundException("User not found");
            }

            if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, user!.PasswordHash))
            {
                _logger.LogWarning("Invalid password for user: {UserId}", user.Id);
                throw new Api.Exceptions.UnauthorizedAccessException("Invalid email or password");
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

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to save refresh token for user: {UserId}", user.Id);
                throw new DatabaseException("Failed to update user session");
            }

            var wallet = await _context.Wallets.FirstOrDefaultAsync(x => x.CustomerId == user.Id);
            var walletDto = _mapper.Map<WalletDtoLite>(wallet);

            _logger.LogDebug("User authentication successful for UserId: {UserId}", user.Id);

            // Only include referral code if user is a Customer
            string? referralCode = null;
            if (Type == "Customer" && user is Customer customer)
            {
                referralCode = customer.ReferralCode ?? string.Empty;
                _logger.LogDebug("Including referral code for Customer user: {UserId}", user.Id);
            }
           
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
                Wallet = walletDto,
                ReferralCode = referralCode
            };
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

        /// <summary>
        /// Refreshes the access token using a valid refresh token
        /// </summary>
        /// <param name="refreshToken">The refresh token</param>
        /// <returns>Returns new access token and user information</returns>
        /// <response code="200">Token refreshed successfully</response>
        /// <response code="401">Unauthorized - invalid refresh token</response>
        [HttpGet("refreshToken")]
        public async Task<IActionResult> RefreshToken([FromQuery] string refreshToken)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(RefreshToken)
            });

            _logger.LogInformation("Processing refresh token request");

            if (string.IsNullOrEmpty(refreshToken))
            {
                _logger.LogWarning("Refresh token request with empty token");
                throw new Api.Exceptions.UnauthorizedAccessException("Invalid refresh token");
            }

            var genTokenDTO = new GenerateToken(_config).validateRefreshToken(refreshToken);
            if (genTokenDTO == null)
            {
                _logger.LogWarning("Invalid refresh token provided");
                throw new Api.Exceptions.UnauthorizedAccessException("Invalid refresh token");
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == genTokenDTO!.Id);
            if (user == null)
            {
                _logger.LogWarning("User not found for token refresh: {UserId}", genTokenDTO.Id);
                throw new ResourceNotFoundException("User not found");
            }

            var accessToken = new GenerateToken(_config).generateAccessToken(genTokenDTO!);
            string? referralCode = null;
            if (genTokenDTO.Role == "Customer" && user is Customer customer)
            {
                referralCode = customer.ReferralCode ?? string.Empty;
                _logger.LogDebug("Including referral code for Customer user: {UserId}", user.Id);
            }
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
                ReferralCode = referralCode,
                accessToken = accessToken
            };

            _logger.LogInformation("Token refresh successful for UserId: {UserId}", user.Id);
            return Ok(ApiResponse<object>.CreateSuccess(token, "Token refreshed successfully"));
        }

        /// <summary>
        /// Logs out the user by invalidating the refresh token
        /// </summary>
        /// <returns>Returns success message</returns>
        /// <response code="200">Logout successful</response>
        /// <response code="400">Invalid refresh token</response>
        [HttpGet("logOut")]
        public async Task<IActionResult> LogOut()
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(LogOut)
            });

            _logger.LogInformation("Processing logout request");

            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                _logger.LogWarning("Logout request with invalid refresh token");
                throw new ValidationException("Invalid refresh token");
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.RefreshToken == refreshToken);
            if (user != null)
            {
                user!.RefreshToken = null;
                _context.Users.Attach(user);

                try
                {
                    await _context.SaveChangesAsync();
                    _logger.LogDebug("User session cleared for UserId: {UserId}", user.Id);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to clear user session for UserId: {UserId}", user.Id);
                    throw new DatabaseException("Failed to clear user session");
                }
            }

            Response.Cookies.Delete("refreshToken", new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(7),
                Secure = true,
                Path = "/"
            });

            _logger.LogInformation("User logout successful");
            return Ok(ApiResponse.CreateSuccess("Logout Successfully"));
        }

        /// <summary>
        /// Resets the password for a user
        /// </summary>
        /// <param name="forgotPassword">Forgot password data transfer object containing email</param>
        /// <returns>Returns success message</returns>
        /// <response code="200">Password reset successful</response>
        /// <response code="400">Invalid password reset data</response>
        [HttpPut("password-reset")]
        public async Task<IActionResult> PasswordReset([FromForm] ForgotPasswordDTO forgotPassword)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(PasswordReset),
                ["Email"] = forgotPassword?.Email ?? "N/A"
            });

            _logger.LogInformation("Processing password reset request");

            if (forgotPassword == null)
            {
                _logger.LogWarning("Password reset request with null data");
                throw new ValidationException("Password reset data is required");
            }

            var response = await _userService.resetPassword(forgotPassword);

            _logger.LogInformation("Password reset completed for email: {Email}", forgotPassword.Email);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Password reset successful"));
        }

        /// <summary>
        /// Verifies the user's email by sending a verification email
        /// </summary>
        /// <param name="email">The email address to verify</param>
        /// <returns>Returns success message</returns>
        /// <response code="200">Verification email sent successfully</response>
        /// <response code="400">Invalid email</response>
        [HttpPost("verify-email")]
        public async Task<IActionResult> VerifyEmail([FromQuery] string email)
        {
            using var scope = _logger.BeginScope(new Dictionary<string, object>
            {
                ["Action"] = nameof(VerifyEmail),
                ["Email"] = email ?? "N/A"
            });

            _logger.LogInformation("Processing email verification request");

            if (string.IsNullOrEmpty(email))
            {
                _logger.LogWarning("Email verification request with empty email");
                throw new ValidationException("Email is required");
            }

            var response = await _emailVerify.SendVerificationEmail(email);

            _logger.LogInformation("Email verification sent to: {Email}", email);
            return Ok(ApiResponse<object>.CreateSuccess(response, "Verification email sent successfully"));
        }
    }
}