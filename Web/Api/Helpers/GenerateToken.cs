using Api.DTO;
using Api.Models;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Api.Helpers
{
    public class GenerateToken
    {
        private readonly IConfiguration? _config;
        public GenerateToken(IConfiguration config)
        {
            _config = config;
        }        public string generateAccessToken(GenTokenDto genTokenDTO)
        {
            try
            {
                // Use the same key source as JWT validation in Program.cs with fallback
                var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY") ?? _config!.GetSection("Jwt:Key").Value!;
                
                // Debug logging for troubleshooting
                Console.WriteLine($"[generateAccessToken] JWT_KEY from environment: {(string.IsNullOrEmpty(Environment.GetEnvironmentVariable("JWT_KEY")) ? "NOT SET" : "SET")}");
                Console.WriteLine($"[generateAccessToken] JWT_KEY from config: {(string.IsNullOrEmpty(_config!.GetSection("Jwt:Key").Value) ? "NOT SET" : "SET")}");
                Console.WriteLine($"[generateAccessToken] Final JWT key length: {jwtKey?.Length ?? 0}");
                
                // Validate key length for HS256 (minimum 128 bits = 16 characters)
                if (string.IsNullOrEmpty(jwtKey) || jwtKey.Length < 16)
                {
                    throw new ArgumentException($"JWT key must be at least 16 characters long for HS256 algorithm. Current key length: {jwtKey?.Length ?? 0}");
                }
                
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var Claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, genTokenDTO!.Id!.ToString()!),
                    new Claim(ClaimTypes.Role, genTokenDTO!.Role!),
                    new Claim(ClaimTypes.Email, genTokenDTO!.Email!),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Unique token ID
                    new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                    new Claim("user_type", genTokenDTO!.Role!) // Custom claim for user type
                };
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(Claims),
                    Expires = DateTime.UtcNow.AddMinutes(30), // Short-lived access tokens (15 minutes)
                    NotBefore = DateTime.UtcNow,
                    IssuedAt = DateTime.UtcNow,
                    Issuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "LifePadi-API",
                    Audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "LifePadi-Client",
                    SigningCredentials = credentials,
                };
                var tokenHandler = new JwtSecurityTokenHandler();

                var accessToken = tokenHandler.CreateToken(tokenDescriptor);

                return tokenHandler.WriteToken(accessToken);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string generateRefreshToken(GenTokenDto genTokenDTO)
        {
            try
            {
                // Use the same key source as JWT validation in Program.cs with fallback
                var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY") ?? _config!.GetSection("Jwt:Key").Value!;
                
                // Debug logging for troubleshooting
                Console.WriteLine($"[generateRefreshToken] JWT_KEY from environment: {(string.IsNullOrEmpty(Environment.GetEnvironmentVariable("JWT_KEY")) ? "NOT SET" : "SET")}");
                Console.WriteLine($"[generateRefreshToken] JWT_KEY from config: {(string.IsNullOrEmpty(_config!.GetSection("Jwt:Key").Value) ? "NOT SET" : "SET")}");
                Console.WriteLine($"[generateRefreshToken] Final JWT key length: {jwtKey?.Length ?? 0}");
                
                // Validate key length for HS256 (minimum 128 bits = 16 characters)
                if (string.IsNullOrEmpty(jwtKey) || jwtKey.Length < 16)
                {
                    throw new ArgumentException($"JWT key must be at least 16 characters long for HS256 algorithm. Current key length: {jwtKey?.Length ?? 0}");
                }
                
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var Claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, genTokenDTO!.Id!.ToString()!),
                    new Claim(ClaimTypes.Role, genTokenDTO!.Role!),
                    new Claim(ClaimTypes.Email, genTokenDTO!.Email!),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // Unique token ID for refresh token
                    new Claim("token_type", "refresh"), // Mark as refresh token
                    new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
                };
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(Claims),
                    Expires = DateTime.UtcNow.AddDays(7), // Refresh tokens last 7 days
                    NotBefore = DateTime.UtcNow,
                    IssuedAt = DateTime.UtcNow,
                    Issuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "LifePadi-API",
                    Audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "LifePadi-Client",
                    SigningCredentials = credentials,
                };
                var tokenHandler = new JwtSecurityTokenHandler();

                var refreshToken = tokenHandler.CreateToken(tokenDescriptor);

                return tokenHandler.WriteToken(refreshToken);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public GenTokenDto? validateRefreshToken(string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                
                // Use the same key source as JWT validation in Program.cs with fallback
                var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY") ?? _config!.GetSection("Jwt:Key").Value!;
                
                // Validate key length for HS256 (minimum 128 bits = 16 characters)
                if (string.IsNullOrEmpty(jwtKey) || jwtKey.Length < 16)
                {
                    throw new ArgumentException($"JWT key must be at least 16 characters long for HS256 algorithm. Current key length: {jwtKey?.Length ?? 0}");
                }
                
                var key = Encoding.UTF8.GetBytes(jwtKey);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "LifePadi-API",
                    ValidateAudience = true,
                    ValidAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "LifePadi-Client",
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero,
                    RequireExpirationTime = true
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var genTokenDTO = new GenTokenDto
                {
                    Id = int.Parse(jwtToken.Claims.First(x => x.Type == "nameid").Value),
                    Email = jwtToken.Claims.First(x => x.Type == "email").Value,
                    Role = jwtToken.Claims.First(x => x.Type == "role").Value,
                };

                return genTokenDTO;
            }
            catch (Exception ex)
            {
                throw new Exceptions.ServiceException(ex.Message);
            }
        }
    }
}
