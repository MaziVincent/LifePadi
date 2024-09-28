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
                    new Claim(ClaimTypes.Role, genTokenDTO!.Role!),
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
                    new Claim(ClaimTypes.Role, genTokenDTO!.Role!),
                    new Claim(ClaimTypes.Email, genTokenDTO!.Email!),
                };
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(Claims),
                    Expires = DateTime.Now.AddDays(5),
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
                var key = Encoding.ASCII.GetBytes(_config!.GetSection("Jwt:Key").Value!);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
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
