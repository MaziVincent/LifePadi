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
        }

        public string generateAccessToken(GenTokenDto genTokenDTO)
        {
            try
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config!.GetSection("Jwt:Key").Value!));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var Claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, genTokenDTO!.Id!.ToString()!),
                    new Claim(ClaimTypes.Role, genTokenDTO!.Type!),
                    new Claim(ClaimTypes.Email, genTokenDTO!.Email!),
                };
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(Claims),
                    Expires = DateTime.Now.AddDays(1),
                    SigningCredentials = credentials,
                };
                var tokenHandler = new JwtSecurityTokenHandler();

                var accessToken = tokenHandler.CreateToken(tokenDescriptor);

                return tokenHandler.WriteToken(accessToken);
            }catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public string generateRefreshToken(GenTokenDto genTokenDTO)
        {
            try
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config!.GetSection("Jwt:Key").Value!));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var Claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, genTokenDTO!.Id!.ToString()!),
                    new Claim(ClaimTypes.Role, genTokenDTO!.Type!),
                    new Claim(ClaimTypes.Email, genTokenDTO!.Email!),
                };
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(Claims),
                    Expires = DateTime.Now.AddDays(1),
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
    }
}
