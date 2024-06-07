namespace Api.DTO
{
<<<<<<< HEAD
<<<<<<< HEAD
    public class TokenDto
=======
    public class TokenDTO
>>>>>>> 9a80707 (created the interfaces and the DTOs)
=======
    public class TokenDto
>>>>>>> 836ec36 (changed all DTO to Dto)
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }

<<<<<<< HEAD
<<<<<<< HEAD
    public class GenTokenDto
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
=======
    public class GenTokenDTO
=======
    public class GenTokenDto
>>>>>>> 836ec36 (changed all DTO to Dto)
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Type { get; set; }
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    }
}
