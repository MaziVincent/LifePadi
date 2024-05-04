namespace Api.DTO
{
<<<<<<< HEAD
    public class TokenDto
=======
    public class TokenDTO
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    {
        public string? AccessToken { get; set; }
        public string? RefreshToken { get; set; }
    }

<<<<<<< HEAD
    public class GenTokenDto
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Role { get; set; }
=======
    public class GenTokenDTO
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? Type { get; set; }
>>>>>>> 9a80707 (created the interfaces and the DTOs)
    }
}
